// Using Supabase client library to verify connection via REST API
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://euhbrdakllawvslrzkcl.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1aGJyZGFrbGxhd3ZzbHJ6a2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MjYxMDEsImV4cCI6MjA4NTMwMjEwMX0.qABlpoOmETuI0-pYp0Rh5ykbfj43Iou_SM3HIEeqG3s';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifySupabaseConnection() {
    try {
        console.log('🔍 Testing Supabase connection via REST API...\n');

        // Try to query the agencies table
        const { data: agencies, error: agenciesError } = await supabase
            .from('agencies')
            .select('*')
            .limit(5);

        if (agenciesError) {
            if (agenciesError.code === '42P01') {
                console.log('⚠️  Table "agencies" does not exist yet.');
                console.log('   Schema needs to be applied.\n');
            } else {
                console.log('❌ Error querying agencies:', agenciesError.message);
            }
        } else {
            console.log(`✓ Successfully connected to Supabase!`);
            console.log(`✓ Agencies table exists with ${agencies.length} record(s)\n`);
            if (agencies.length > 0) {
                console.log('Sample agencies:');
                agencies.forEach(agency => {
                    console.log(`   - ${agency.name || agency.id} (ID: ${agency.id.substring(0, 8)}...)`);
                });
            }
            console.log('');
        }

        // Try to query the tenants table
        const { data: tenants, error: tenantsError } = await supabase
            .from('tenants')
            .select('*')
            .limit(5);

        if (tenantsError) {
            if (tenantsError.code === '42P01') {
                console.log('⚠️  Table "tenants" does not exist yet.');
            } else {
                console.log('❌ Error querying tenants:', tenantsError.message);
            }
        } else {
            console.log(`✓ Tenants table exists with ${tenants.length} record(s)`);
        }

    } catch (err) {
        console.error('❌ Unexpected error:', err.message);
    }
}

verifySupabaseConnection();
