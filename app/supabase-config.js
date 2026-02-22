/**
 * Supabase Configuration
 * Project: Adicionales Santa Fe
 */

// Replace these with your actual Supabase credentials
const SUPABASE_URL = "https://xovhbuzhhktxpkdwwjad.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CE1SkpjkAg96lRL-NPerOg_pdZdzD5-";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase Client Initialized");
