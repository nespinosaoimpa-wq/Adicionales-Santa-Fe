const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://xovhbuzhhktxpkdwwjad.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CE1SkpjkAg96lRL-NPerOg_pdZdzD5-";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function inspect() {
    console.log("=== SUPABASE SERVICES TABLE INSPETION ===");
    const { data: services, error } = await supabase.from('services').select('*');
    if (error) {
        console.error("Error fetching services:", error);
    } else {
        console.log(`Total services in Supabase: ${services ? services.length : 0}`);
        if (services && services.length > 0) {
            const emailCounts = {};
            services.forEach(s => {
                const em = s.user_email || s.userEmail || 'unknown';
                emailCounts[em] = (emailCounts[em] || 0) + 1;
            });
            console.log("Services per email:", emailCounts);
            console.log("Sample services:", services.slice(0, 5));
        }
    }

    console.log("\n=== SUPABASE USERS / PROFILES TABLE INSPECTION ===");
    const { data: users, error: err2 } = await supabase.from('users').select('*');
    if (err2) {
        console.log("Error fetching users:", err2.message);
    } else {
        console.log(`Total users in Supabase: ${users ? users.length : 0}`);
        if (users) {
            console.log("User emails:", users.map(u => u.email));
        }
    }
}

inspect();
