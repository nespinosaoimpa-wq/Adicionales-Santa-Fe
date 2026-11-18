"""
Unit tests for Adicionales Santa Fe - Academy Courses Module
Verifies courses dataset, PRO paywall link resolution, and standalone Cursos view ($10.000).
"""

import unittest
import os
import json
import subprocess

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
COURSES_PATH = os.path.join(WORKSPACE_ROOT, "app", "js", "data", "courses_data.js")
INDEX_PATH = os.path.join(WORKSPACE_ROOT, "app", "index.html")
SW_PATH = os.path.join(WORKSPACE_ROOT, "app", "sw-v535-10-99.js")
CURSOS_VIEW_PATH = os.path.join(WORKSPACE_ROOT, "app", "js", "views", "cursos.js")
ROUTER_PATH = os.path.join(WORKSPACE_ROOT, "app", "js", "router.js")
AGENDA_PATH = os.path.join(WORKSPACE_ROOT, "app", "js", "views", "agenda.js")

class TestAcademyCourses(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        js_code = """
        const fs = require('fs');
        const content = fs.readFileSync(process.argv[1], 'utf8');
        const win = {};
        new Function('window', content)(win);
        console.log(JSON.stringify(win.academyCourses));
        """
        proc = subprocess.run(
            ["node", "-e", js_code, COURSES_PATH],
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=True
        )
        cls.courses = json.loads(proc.stdout)

    def test_courses_file_exists_and_syntax_ok(self):
        """Verify courses_data.js exists and has no JavaScript syntax errors."""
        self.assertTrue(os.path.exists(COURSES_PATH), "courses_data.js does not exist")
        proc = subprocess.run(["node", "-c", COURSES_PATH], capture_output=True, text=True, encoding="utf-8")
        self.assertEqual(proc.returncode, 0, f"Syntax error: {proc.stderr}")

    def test_featured_forensic_course(self):
        """Verify the user requested Forensic Analysis (Accenture/Capacitar) course exists and is featured."""
        forensic = next((c for c in self.courses if c.get("id") == "capacitar-forense-accenture"), None)
        self.assertIsNotNone(forensic, "Featured forensic course not found in academyCourses")
        self.assertEqual(forensic.get("title"), "Análisis forense")
        self.assertIn("Accenture", forensic.get("partner", ""))
        self.assertEqual(forensic.get("duration"), "3 hs y 18 min")
        self.assertIn("C48040", forensic.get("registrationUrl", ""))
        self.assertTrue(forensic.get("featured"))

    def test_all_courses_have_required_fields(self):
        """Ensure all courses have id, title, topic, category, duration, syllabus, and url."""
        self.assertGreaterEqual(len(self.courses), 4)
        for c in self.courses:
            self.assertTrue(c.get("id"), "Course missing id")
            self.assertTrue(c.get("title"), f"Course {c.get('id')} missing title")
            self.assertTrue(c.get("category"), f"Course {c.get('id')} missing category")
            self.assertTrue(c.get("duration"), f"Course {c.get('id')} missing duration")
            self.assertTrue(len(c.get("syllabus", [])) > 0, f"Course {c.get('id')} missing syllabus")
            self.assertTrue(c.get("registrationUrl", "").startswith("http"), f"Course {c.get('id')} invalid URL")

    def test_pro_gating_logic(self):
        """Verify _resolveCourseOfficialLink returns URL only for PRO users."""
        js_test = """
        const fs = require('fs');
        const content = fs.readFileSync(process.argv[1], 'utf8');
        const win = {};
        
        // Simular usuario Free
        win._isIsepPro = () => false;
        new Function('window', content)(win);
        const freeLink = win._resolveCourseOfficialLink('capacitar-forense-accenture');
        
        // Simular usuario PRO
        win._isIsepPro = () => true;
        const proLink = win._resolveCourseOfficialLink('capacitar-forense-accenture');
        
        console.log(JSON.stringify({ freeLink, proLink }));
        """
        proc = subprocess.run(
            ["node", "-e", js_test, COURSES_PATH],
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=True
        )
        res = json.loads(proc.stdout)
        self.assertIsNone(res["freeLink"], "Free users must NOT get the link directly from resolver")
        self.assertIsNotNone(res["proLink"], "PRO users must get the link from resolver")
        self.assertIn("C48040", res["proLink"])

    def test_html_and_sw_integration(self):
        """Verify index.html and sw-v535-10-99.js include courses_data.js and cursos.js."""
        with open(INDEX_PATH, "r", encoding="utf-8") as f:
            html = f.read()
        self.assertIn("courses_data.js", html, "index.html missing script tag for courses_data.js")
        self.assertIn("cursos.js", html, "index.html missing script tag for cursos.js")

        with open(SW_PATH, "r", encoding="utf-8") as f:
            sw = f.read()
        self.assertIn("courses_data.js", sw, "sw-v535-10-99.js missing cache entry for courses_data.js")
        self.assertIn("cursos.js", sw, "sw-v535-10-99.js missing cache entry for cursos.js")

    def test_standalone_cursos_view(self):
        """Verify cursos.js exists, compiles, and defines required view functions."""
        self.assertTrue(os.path.exists(CURSOS_VIEW_PATH), "cursos.js does not exist")
        proc = subprocess.run(["node", "-c", CURSOS_VIEW_PATH], capture_output=True, text=True, encoding="utf-8")
        self.assertEqual(proc.returncode, 0, f"Syntax error in cursos.js: {proc.stderr}")

        with open(CURSOS_VIEW_PATH, "r", encoding="utf-8") as f:
            code = f.read()
        self.assertIn("window.renderCursos", code)
        self.assertIn("window._hasCursosAccess", code)
        self.assertIn("window._submitCursosPayment", code)
        self.assertIn("window._openCourseOfficial", code)
        self.assertIn("window._openCursosPaywallModal", code)
        self.assertIn("10000", code, "Cursos fee should be 10000")

    def test_capacitar_screenshot_courses_dataset(self):
        """Verify that all courses from Capacitar oferta-formativa screenshot are in the dataset."""
        codes = [c.get("code") for c in self.courses if c.get("code")]
        expected = [
            "C48040", "C48099", "C48100", "C48212", "C48215",
            "C48207", "C48214", "C48211", "C48209", "C48213",
            "RUTA-CIBER-62H", "RUTA-DEV-86H"
        ]
        for exp in expected:
            self.assertIn(exp, codes, f"Course code {exp} missing from academyCourses")

    def test_router_and_agenda_promotion(self):
        """Verify router routes #cursos and agenda displays top promo banner for $10.000."""
        with open(ROUTER_PATH, "r", encoding="utf-8") as f:
            router_code = f.read()
        self.assertIn("case '#cursos':", router_code)
        self.assertIn("renderCursos", router_code)

        with open(AGENDA_PATH, "r", encoding="utf-8") as f:
            agenda_code = f.read()
        self.assertIn("router.navigateTo('#cursos')", agenda_code)
        self.assertIn("10.000", agenda_code)

if __name__ == "__main__":
    unittest.main()
