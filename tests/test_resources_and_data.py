"""
Unit tests for Adicionales Santa Fe - Resources, Benefits and Retention Engine
Verifies TAP benefits data, departmental coverage, and notifications logic.
"""

import unittest
import os
import json
import subprocess

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
RESOURCES_PATH = os.path.join(WORKSPACE_ROOT, "app", "js", "data", "resources.js")
NOTIFICATIONS_PATH = os.path.join(WORKSPACE_ROOT, "app", "js", "utils", "retention_notifications.js")

class TestResourcesAndData(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        js_code = """
        const fs = require('fs');
        const content = fs.readFileSync(process.argv[1], 'utf8');
        const win = {};
        new Function('window', content)(win);
        console.log(JSON.stringify(win.policeResources));
        """
        proc = subprocess.run(
            ["node", "-e", js_code, RESOURCES_PATH],
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=True
        )
        cls.police_resources = json.loads(proc.stdout)

    def test_tap_benefit_amount(self):
        """Verify Tarjeta TAP has a valid positive amount (> $100,000 ARS)."""
        tap = self.police_resources.get("tap", {})
        monto = tap.get("monto", 0)
        self.assertIsInstance(monto, (int, float))
        self.assertGreater(monto, 100000, f"TAP amount seems too low or invalid: {monto}")

    def test_tap_departments_coverage(self):
        """Verify TAP data covers main police departments (La Capital, Rosario)."""
        departments = self.police_resources.get("tap", {}).get("departments", {})
        self.assertIn("La Capital", departments, "Missing 'La Capital' in TAP benefits")
        self.assertIn("Rosario", departments, "Missing 'Rosario' in TAP benefits")
        self.assertGreater(len(departments["La Capital"]), 0)
        self.assertGreater(len(departments["Rosario"]), 0)

    def test_retention_notifications_syntax(self):
        """Verify retention_notifications.js compiles without errors."""
        self.assertTrue(os.path.exists(NOTIFICATIONS_PATH), "retention_notifications.js not found")
        proc = subprocess.run(["node", "-c", NOTIFICATIONS_PATH], capture_output=True, text=True, encoding="utf-8")
        self.assertEqual(proc.returncode, 0, f"Syntax error in retention_notifications.js: {proc.stderr}")

if __name__ == "__main__":
    unittest.main()

