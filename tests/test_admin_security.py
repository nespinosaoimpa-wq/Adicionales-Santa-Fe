"""
Unit tests for Adicionales Santa Fe - Admin Security & Access Control
Guarantees strictly that only 'nespinosa.oimpa@gmail.com' has admin privileges,
and that NO ordinary user ever sees admin triggers or accesses global data.
"""

import unittest
import os
import subprocess
import json

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
STORE_PATH = os.path.join(WORKSPACE_ROOT, "app", "js", "store.js")
PROFILE_PATH = os.path.join(WORKSPACE_ROOT, "app", "js", "views", "profile.js")

class TestAdminSecurity(unittest.TestCase):

    def test_no_super_admin_button_in_profile_view(self):
        """Verify that the 'Activar Modo Super Admin' button was completely eliminated."""
        with open(PROFILE_PATH, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertNotIn("Activar Modo Super Admin", content, 
            "CRITICAL SECURITY LEAK: 'Activar Modo Super Admin' button must not exist in profile.js")
        self.assertNotIn("enableSuperAdminMode", content,
            "CRITICAL: enableSuperAdminMode trigger must not exist in profile.js")

    def test_store_is_admin_is_strictly_restricted(self):
        """Verify store.isAdmin() returns true ONLY for nespinosa.oimpa@gmail.com."""
        js_code = """
        const fs = require('fs');
        const storeCode = fs.readFileSync(process.argv[1], 'utf8');
        const sandbox = {
            window: {},
            document: { addEventListener: () => {} },
            localStorage: { getItem: () => null, setItem: () => {} },
            showToast: () => {}
        };
        new Function('window', 'document', 'localStorage', 'showToast', storeCode)(sandbox.window, sandbox.document, sandbox.localStorage, sandbox.showToast);
        const store = sandbox.window.store;

        const results = {
            owner: store.isAdmin.call({ user: { email: 'nespinosa.oimpa@gmail.com' } }),
            owner_uppercase: store.isAdmin.call({ user: { email: 'NESPINOSA.OIMPA@GMAIL.COM ' } }),
            other_user: store.isAdmin.call({ user: { email: 'policia.santafe@gmail.com' } }),
            attacker_admin: store.isAdmin.call({ user: { email: 'admin@santafe.gov.ar' } }),
            no_user: store.isAdmin.call({ user: null }),
            empty_user: store.isAdmin.call({ user: {} })
        };
        console.log(JSON.stringify(results));
        """
        proc = subprocess.run(
            ["node", "-e", js_code, STORE_PATH],
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=True
        )
        res = json.loads(proc.stdout)
        self.assertTrue(res["owner"], "Owner must be recognized as admin")
        self.assertTrue(res["owner_uppercase"], "Owner with uppercase/spaces must be recognized")
        self.assertFalse(res["other_user"], "Random user must NEVER be admin")
        self.assertFalse(res["attacker_admin"], "Other admin-sounding email must NEVER be admin")
        self.assertFalse(res["no_user"], "Null user must NEVER be admin")
        self.assertFalse(res["empty_user"], "Empty user must NEVER be admin")

if __name__ == "__main__":
    unittest.main()
