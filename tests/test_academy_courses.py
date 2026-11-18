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
        """Verify that all courses from screenshot oferta-formativa tables are in the dataset."""
        codes = [c.get("code") for c in self.courses if c.get("code")]
        # Accenture & Rutas
        expected_accenture = [
            "C48040", "C48099", "C48100", "C48212", "C48215",
            "C48207", "C48214", "C48211", "C48209", "C48213",
            "RUTA-CIBER-62H", "RUTA-DEV-86H"
        ]
        # Google
        expected_google = [
            "C46002", "C46008", "C46009", "C46004", "C46003",
            "C46005", "C46006", "C46010", "C46007", "C46011"
        ]
        # Santander
        expected_santander = [
            "C42000", "C42053", "C48204", "C42001", "C42044",
            "C42048", "C42002", "C42056", "C48205", "C42004"
        ]
        # Aionixs
        expected_aionixs = ["CAMP0015"]
        # Microsoft & LinkedIn
        expected_microsoft = [
            "C38002", "C38023", "C38000", "C38026", "RA38002",
            "C38028", "C38027", "C38020", "RA38016", "C38009",
            "C38001", "RA38003", "C38015", "RA38014", "RA38009",
            "RA38019", "C38008", "C38006", "RA38017"
        ]

        all_expected = expected_accenture + expected_google + expected_santander + expected_aionixs + expected_microsoft
        for exp in all_expected:
            self.assertIn(exp, codes, f"Course code {exp} missing from academyCourses")
        self.assertGreaterEqual(len(self.courses), 50)

    def test_router_and_agenda_promotion(self):
        """Verify router routes #cursos publicly and agenda displays top promo banner for $10.000."""
        with open(ROUTER_PATH, "r", encoding="utf-8") as f:
            router_code = f.read()
        self.assertIn("case '#cursos':", router_code)
        self.assertIn("renderCursos", router_code)
        self.assertIn("hash !== '#cursos'", router_code, "Public access to #cursos should not be blocked by auth check")

        with open(AGENDA_PATH, "r", encoding="utf-8") as f:
            agenda_code = f.read()
        self.assertIn("router.navigateTo('#cursos')", agenda_code)
        self.assertIn("10.000", agenda_code)

    def test_landing_page_cursos_promotion(self):
        """Verify landing page index.html contains Cursos section, nav link, and FAQ item."""
        landing_path = os.path.join(WORKSPACE_ROOT, "index.html")
        with open(landing_path, "r", encoding="utf-8") as f:
            html = f.read()
        self.assertIn('id="cursos"', html, "Landing page missing #cursos section")
        self.assertIn('Cursos para Ascenso', html, "Landing page missing nav link to cursos")
        self.assertIn('¿Cómo funciona el Repositorio de Cursos para el Concurso de Ascenso?', html, "Landing page missing FAQ item for cursos")
        self.assertIn('10.000', html, "Landing page should mention 10.000 fee")

if __name__ == "__main__":
    unittest.main()
