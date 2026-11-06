/**
 * Supabase Configuration
 * Project: Adicionales Santa Fe
 */

const SUPABASE_URL = "https://xovhbuzhhktxpkdwwjad.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CE1SkpjkAg96lRL-NPerOg_pdZdzD5-";

try {
    if (typeof supabase !== 'undefined' && supabase && typeof supabase.createClient === 'function') {
        window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("Supabase Client Initialized");
    } else {
        console.warn("Supabase SDK not available, using Firebase primary mode");
        window.supabaseClient = null;
    }
} catch (e) {
    console.warn("Supabase init error:", e);
    window.supabaseClient = null;
}
