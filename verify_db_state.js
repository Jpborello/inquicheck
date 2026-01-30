// Script para verificar qué hay en la base de datos
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

async function verifyDatabase() {
    console.log('🔍 Verificando estado de la base de datos...\n');

    try {
        // Check agencies
        console.log('📋 Verificando tabla AGENCIES:');
        const { data: agencies, error: agenciesError } = await supabase
            .from('agencies')
            .select('*')
            .limit(5);

        if (agenciesError) {
            console.log(`   ❌ Error: ${agenciesError.message}`);
            console.log(`   Code: ${agenciesError.code}`);
        } else {
            console.log(`   ✅ Tabla existe - ${agencies.length} registros encontrados`);
            if (agencies.length > 0) {
                agencies.forEach(a => console.log(`      - ${a.name} (ID: ${a.id})`));
            }
        }

        // Check tenants
        console.log('\n📋 Verificando tabla TENANTS:');
        const { data: tenants, error: tenantsError } = await supabase
            .from('tenants')
            .select('*')
            .limit(5);

        if (tenantsError) {
            console.log(`   ❌ Error: ${tenantsError.message}`);
            console.log(`   Code: ${tenantsError.code}`);
        } else {
            console.log(`   ✅ Tabla existe - ${tenants.length} registros encontrados`);
            if (tenants.length > 0) {
                tenants.forEach(t => console.log(`      - ${t.first_name} ${t.last_name} (DNI: ${t.dni})`));
            }
        }

        // Check rental_history
        console.log('\n📋 Verificando tabla RENTAL_HISTORY:');
        const { data: history, error: historyError } = await supabase
            .from('rental_history')
            .select('*')
            .limit(5);

        if (historyError) {
            console.log(`   ❌ Error: ${historyError.message}`);
            console.log(`   Code: ${historyError.code}`);
        } else {
            console.log(`   ✅ Tabla existe - ${history.length} registros encontrados`);
        }

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ Verificación completa\n');

    } catch (error) {
        console.error('❌ Error inesperado:', error);
    }
}

verifyDatabase();
