// Script mejorado para verificar y mostrar TODO el contenido
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

envLines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length) {
            process.env[key.trim()] = valueParts.join('=').trim();
        }
    }
});

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkData() {
    console.log('🔍 Verificando TODOS los datos...\n');

    // Check tenants
    const { data: tenants } = await supabase.from('tenants').select('*');
    console.log(`📋 TENANTS (${tenants?.length || 0} registros):`);
    if (tenants && tenants.length > 0) {
        tenants.forEach(t => {
            console.log(`   - ${t.first_name} ${t.last_name} (DNI: ${t.dni}, ID: ${t.id})`);
        });
    } else {
        console.log('   (vacío)');
    }

    // Check rental_history
    const { data: history } = await supabase.from('rental_history').select('*');
    console.log(`\n📋 RENTAL_HISTORY (${history?.length || 0} registros):`);
    if (history && history.length > 0) {
        history.forEach(h => {
            console.log(`   - Tenant ID: ${h.tenant_id}, Scores: ${h.payment_score}/${h.care_score}`);
        });
    } else {
        console.log('   (vacío) ❌ POR ESO SCORE = 0');
    }

    console.log('\n');
}

checkData();
