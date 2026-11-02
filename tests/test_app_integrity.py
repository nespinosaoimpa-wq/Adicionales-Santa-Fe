"""
Unit tests for Adicionales Santa Fe - Application Integrity & Build Health
Verifies syntax of all JS views, PWA assets, version consistency, and service worker.
"""

import unittest
import os
import glob
import json
import subprocess
import re

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
APP_DIR = os.path.join(WORKSPACE_ROOT, "app")

class TestAppIntegrity(unittest.TestCase):

    def test_all_app_js_files_pass_syntax_check(self):
        """Verify that every JavaScript file in app/ compiles without syntax errors."""
        js_files = []
        for root, dirs, files in os.walk(APP_DIR):
            for file in files:
                if file.endswith(".js"):
                    js_files.append(os.path.join(root, file))

        self.assertGreater(len(js_files), 10, "Expected at least 10 JS files in app/")

        failures = []
        for fpath in js_files:
            rel = os.path.relpath(fpath, WORKSPACE_ROOT)
            proc = subprocess.run(["node", "-c", fpath], capture_output=True, text=True, encoding="utf-8")
            if proc.returncode != 0:
                failures.append(f"{rel}: {proc.stderr.strip()}")

        self.assertEqual(len(failures), 0, f"Syntax errors detected in {len(failures)} files:\n" + "\n".join(failures))

    def test_critical_app_files_exist(self):
        """Verify that all core files of the application exist."""
        critical_files = [
            os.path.join(APP_DIR, "index.html"),
            os.path.join(APP_DIR, "styles.css"),
            os.path.join(APP_DIR, "manifest.json"),
            os.path.join(APP_DIR, "version.json"),
            os.path.join(APP_DIR, "db-v211.js"),
            os.path.join(APP_DIR, "firebase-config.js"),
            os.path.join(APP_DIR, "js", "store.js"),
            os.path.join(APP_DIR, "js", "utils.js"),
            os.path.join(APP_DIR, "js", "components.js"),
            os.path.join(APP_DIR, "js", "views", "agenda.js"),
            os.path.join(APP_DIR, "js", "views", "academia.js"),
            os.path.join(APP_DIR, "js", "views", "actas.js"),
            os.path.join(APP_DIR, "js", "views", "admin.js"),
            os.path.join(APP_DIR, "js", "views", "asistente.js")
        ]
        for fpath in critical_files:
            rel = os.path.relpath(fpath, WORKSPACE_ROOT)
            self.assertTrue(os.path.exists(fpath), f"Critical file missing: {rel}")

    def test_version_json_matches_index_html(self):
        """Verify that version in app/version.json aligns with app/index.html."""
        version_json_path = os.path.join(APP_DIR, "version.json")
        with open(version_json_path, "r", encoding="utf-8") as f:
            v_data = json.load(f)
        current_version = v_data.get("version", "").strip()
        self.assertTrue(current_version.startswith("v"), f"Version must start with 'v', got: {current_version}")

        index_html_path = os.path.join(APP_DIR, "index.html")
        with open(index_html_path, "r", encoding="utf-8") as f:
            index_content = f.read()

        # The version digits should appear in index.html (e.g. v535.10.70 or 535.10.70)
        clean_v = current_version.lstrip("v")
        self.assertIn(clean_v, index_content, f"Version {current_version} not found in app/index.html")

    def test_manifest_json_valid(self):
        """Verify that manifest.json is valid JSON and contains essential PWA fields."""
        manifest_path = os.path.join(APP_DIR, "manifest.json")
        with open(manifest_path, "r", encoding="utf-8") as f:
            manifest = json.load(f)

        self.assertIn("name", manifest)
        self.assertIn("short_name", manifest)
        self.assertIn("start_url", manifest)
        self.assertIn("display", manifest)
        self.assertIn("icons", manifest)
        self.assertGreater(len(manifest["icons"]), 0, "Manifest must declare at least one icon")

    def test_service_worker_file_exists(self):
        """Verify that the service worker registered in sw.js or index.html exists."""
        index_html_path = os.path.join(APP_DIR, "index.html")
        with open(index_html_path, "r", encoding="utf-8") as f:
            html = f.read()

        # Find service worker file references like sw-v535-10-XX.js or sw.js
        sw_matches = re.findall(r"['\"](\/?sw-v[\d\-]+\.js)['\"]", html)
        for sw_ref in sw_matches:
            sw_name = sw_ref.lstrip("/")
            sw_path = os.path.join(APP_DIR, sw_name)
            self.assertTrue(os.path.exists(sw_path), f"Service worker referenced in index.html missing: {sw_name}")

if __name__ == "__main__":
    unittest.main()

