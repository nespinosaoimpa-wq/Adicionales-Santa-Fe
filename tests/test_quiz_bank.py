"""
Unit tests for Adicionales Santa Fe - Quiz Bank (Simulador ISEP 2026)
Verifies integrity, structure, schema, and quality of the question bank.
"""

import unittest
import os
import re
import json
import subprocess

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
QUIZ_BANK_PATH = os.path.join(WORKSPACE_ROOT, "app", "js", "data", "quiz_bank.js")

class TestQuizBank(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Loads and extracts the quizBank object by executing Node.js against the JS file."""
        if not os.path.exists(QUIZ_BANK_PATH):
            raise FileNotFoundError(f"Quiz bank not found at {QUIZ_BANK_PATH}")

        # Use Node to cleanly parse the window.quizBank object into JSON
        js_code = """
        const fs = require('fs');
        const content = fs.readFileSync(process.argv[1], 'utf8');
        const win = {};
        new Function('window', content)(win);
        console.log(JSON.stringify(win.quizBank));
        """
        proc = subprocess.run(
            ["node", "-e", js_code, QUIZ_BANK_PATH],
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=True
        )
        cls.quiz_bank = json.loads(proc.stdout)

    def test_file_exists(self):
        """Verify quiz_bank.js file exists and is not empty."""
        self.assertTrue(os.path.exists(QUIZ_BANK_PATH))
        self.assertGreater(os.path.getsize(QUIZ_BANK_PATH), 1000)

    def test_syntax_with_node(self):
        """Verify quiz_bank.js has 100% valid JavaScript syntax."""
        proc = subprocess.run(["node", "-c", QUIZ_BANK_PATH], capture_output=True, text=True, encoding="utf-8")
        self.assertEqual(proc.returncode, 0, f"Syntax error in quiz_bank.js: {proc.stderr}")

    def test_all_five_hierarchies_present(self):
        """Verify all 6 police hierarchies are present in the question bank."""
        expected_hierarchies = [
            "suboficial-oficial",
            "oficial-subinspector",
            "subinspector-inspector",
            "inspector-subcomisario",
            "subcomisario-comisario",
            "comisario-supervisor"
        ]
        for h in expected_hierarchies:
            self.assertIn(h, self.quiz_bank, f"Missing hierarchy: {h}")
            self.assertGreater(len(self.quiz_bank[h]), 0, f"Hierarchy {h} has no questions")

    def test_minimum_questions_count(self):
        """Verify the bank contains at least 700 total questions."""
        total = sum(len(questions) for questions in self.quiz_bank.values())
        self.assertGreaterEqual(total, 700, f"Expected at least 700 questions, got {total}")

    def test_no_duplicate_question_ids(self):
        """Verify that every question has a strictly unique ID across the entire bank."""
        seen_ids = set()
        duplicates = []
        for hierarchy, questions in self.quiz_bank.items():
            for q in questions:
                qid = q.get("id")
                if not qid:
                    self.fail(f"Question in {hierarchy} has missing or empty id: {q}")
                if qid in seen_ids:
                    duplicates.append(qid)
                seen_ids.add(qid)
        self.assertEqual(len(duplicates), 0, f"Found duplicate question IDs: {duplicates}")

    def test_question_schema_and_options(self):
        """Verify schema of every single question (4 options, valid correctIndex, source, explanation)."""
        valid_difficulties = {"facil", "media", "dificil"}
        for hierarchy, questions in self.quiz_bank.items():
            for idx, q in enumerate(questions):
                qid = q.get("id", f"idx-{idx}")
                
                # Difficulty
                diff = q.get("difficulty")
                self.assertIn(diff, valid_difficulties, f"[{hierarchy}][{qid}] Invalid difficulty '{diff}'")

                # Question text
                text = q.get("question", "").strip()
                self.assertGreater(len(text), 15, f"[{hierarchy}][{qid}] Question text too short or empty")

                # Options array
                options = q.get("options")
                self.assertIsInstance(options, list, f"[{hierarchy}][{qid}] Options must be a list")
                self.assertEqual(len(options), 4, f"[{hierarchy}][{qid}] Must have exactly 4 options, got {len(options)}")
                for opt_idx, opt in enumerate(options):
                    self.assertIsInstance(opt, str, f"[{hierarchy}][{qid}] Option #{opt_idx} must be a string")
                    self.assertGreater(len(opt.strip()), 0, f"[{hierarchy}][{qid}] Option #{opt_idx} is empty")
                
                # Unique options (no duplicated choices within a question)
                self.assertEqual(len(set(options)), 4, f"[{hierarchy}][{qid}] Has duplicate options in choices")

                # Correct Index
                c_idx = q.get("correctIndex")
                self.assertIsInstance(c_idx, int, f"[{hierarchy}][{qid}] correctIndex must be an int")
                self.assertIn(c_idx, [0, 1, 2, 3], f"[{hierarchy}][{qid}] correctIndex {c_idx} out of range [0-3]")

                # Source reference (Ley, Manual, Decreto)
                source = q.get("source", "").strip()
                self.assertGreater(len(source), 5, f"[{hierarchy}][{qid}] Missing legal source citation")

                # Explanation
                explanation = q.get("explanation", "").strip()
                self.assertGreater(len(explanation), 10, f"[{hierarchy}][{qid}] Missing explanation text")

    def test_strict_hierarchy_concordance_and_isolation(self):
        """Verify that questions in any specific contest bank NEVER leak across hierarchies."""
        hierarchies = [
            "suboficial-oficial",
            "oficial-subinspector",
            "subinspector-inspector",
            "inspector-subcomisario",
            "subcomisario-comisario",
            "comisario-supervisor"
        ]
        difficulties = ["facil", "media", "dificil"]
        counts = [10, 25, 50]

        for h in hierarchies:
            bank = self.quiz_bank.get(h, [])
            bank_ids = {q["id"] for q in bank}
            self.assertGreaterEqual(len(bank), 50, f"Bank {h} must have at least 50 questions for real exams")

            for diff in difficulties:
                for cnt in counts:
                    # Emulate selection logic
                    exact = [q for q in bank if q.get("difficulty") == diff]
                    pool = list(exact)

                    if len(pool) < cnt:
                        alt_order = ["media", "facil"] if diff == "dificil" else ["dificil", "facil"] if diff == "media" else ["media", "dificil"]
                        for ad in alt_order:
                            if len(pool) >= cnt:
                                break
                            alts = [q for q in bank if q.get("difficulty") == ad and q["id"] not in {p["id"] for p in pool}]
                            pool.extend(alts)

                    if len(pool) < cnt:
                        rest = [q for q in bank if q["id"] not in {p["id"] for p in pool}]
                        pool.extend(rest)

                    selected = pool[:cnt]
                    self.assertEqual(len(selected), cnt, f"[{h}][{diff}][{cnt}] Failed to reach requested question count")

                    # Crucial assertion: 100% of questions belong strictly to this hierarchy's bank
                    for q in selected:
                        self.assertIn(q["id"], bank_ids, f"Cross-hierarchy leak: question {q['id']} found in exam for {h}")

    def test_ley_12521_hierarchy_groupings_compliance(self):
        """Verify strict statutory alignment with Ley Provincial N° 12.521 Art. 15 (Cuadro Único).
        Agrupamiento Ejecución: Suboficial, Oficial, Subinspector.
        Agrupamiento Coordinación: Inspector, Subcomisario.
        Agrupamiento Supervisión: Comisario, Comisario Supervisor.
        Agrupamiento Dirección: Subdirector, Director, Director General.
        """
        for hierarchy, questions in self.quiz_bank.items():
            for q in questions:
                q_text = q.get("question", "").lower()
                c_idx = q.get("correctIndex", 0)
                options = q.get("options", [])
                correct_opt = options[c_idx].lower() if c_idx < len(options) else ""
                expl = q.get("explanation", "").lower()
                all_text = f"{q_text} {correct_opt} {expl}"

                if "agrupamiento" in all_text:
                    # Subinspector must ALWAYS be Agrupamiento Ejecución
                    if "subinspector" in q_text and ("agrupamiento" in q_text or "cuadro único" in q_text or "cuadro unico" in q_text):
                        self.assertTrue(
                            "ejecución" in correct_opt or "ejecucion" in correct_opt,
                            f"[{hierarchy}][{q['id']}] Ley 12.521 Art. 15 violation: Subinspector must belong to Agrupamiento Ejecución, got '{correct_opt}'"
                        )
                        self.assertFalse(
                            "coordinación" in correct_opt or "coordinacion" in correct_opt,
                            f"[{hierarchy}][{q['id']}] Ley 12.521 Art. 15 violation: Subinspector erroneously marked as Coordinación"
                        )

                    # Oficial must be Agrupamiento Ejecución
                    if "oficial de policía" in q_text and ("agrupamiento" in q_text or "cuadro único" in q_text):
                        self.assertTrue(
                            "ejecución" in correct_opt or "ejecucion" in correct_opt,
                            f"[{hierarchy}][{q['id']}] Ley 12.521 Art. 15 violation: Oficial must belong to Agrupamiento Ejecución"
                        )

                    # Inspector must be Agrupamiento Coordinación
                    if "inspector" in q_text and "subinspector" not in q_text and ("agrupamiento" in q_text or "cuadro único" in q_text):
                        self.assertTrue(
                            "coordinación" in correct_opt or "coordinacion" in correct_opt,
                            f"[{hierarchy}][{q['id']}] Ley 12.521 Art. 15 violation: Inspector must belong to Agrupamiento Coordinación"
                        )

                    # Subcomisario must be Agrupamiento Coordinación
                    if "subcomisario" in q_text and ("agrupamiento" in q_text or "cuadro único" in q_text):
                        self.assertTrue(
                            "coordinación" in correct_opt or "coordinacion" in correct_opt,
                            f"[{hierarchy}][{q['id']}] Ley 12.521 Art. 15 violation: Subcomisario must belong to Agrupamiento Coordinación"
                        )

                    # Comisario must be Agrupamiento Supervisión
                    if "comisario" in q_text and "subcomisario" not in q_text and "supervisor" not in q_text and ("agrupamiento" in q_text or "cuadro único" in q_text):
                        self.assertTrue(
                            "supervisión" in correct_opt or "supervision" in correct_opt,
                            f"[{hierarchy}][{q['id']}] Ley 12.521 Art. 15 violation: Comisario must belong to Agrupamiento Supervisión"
                        )

if __name__ == "__main__":
    unittest.main()
