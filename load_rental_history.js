// Script para cargar SOLO rental history (los tenants ya existen)
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
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

async function loadRentalHistory() {
    console.log('📋 Cargando historial de alquileres...\n');

    try {
        // Get agency
        const { data: agencies } = await supabase.from('agencies').select('id').limit(1);
        const agencyId = agencies[0].id;

        // Get existing tenants
        const { data: tenants } = await supabase.from('tenants').select('*');
        const maria = tenants.find(t => t.first_name === 'María');
        const carlos = tenants.find(t => t.first_name === 'Carlos');
        const laura = tenants.find(t => t.first_name === 'Laura');

        console.log(`✅ Encontrados ${tenants.length} inquilinos existentes`);
        console.log(`   María ID: ${maria.id}`);
        console.log(`   Carlos ID: ${carlos.id}`);
        console.log(`   Laura ID: ${laura.id}\n`);

        // Create rental history
        const records = [
            // María - Score 4.7
            { tenant_id: maria.id, agency_id: agencyId, start_date: '2023-01-01', end_date: '2024-01-01', contract_status: 'Finished', payment_score: 5, care_score: 5, comments: 'Excelente inquilina. Siempre pagó a tiempo y mantuvo el departamento impecable. Altamente recomendable.' },
            { tenant_id: maria.id, agency_id: agencyId, start_date: '2021-07-01', end_date: '2022-12-31', contract_status: 'Finished', payment_score: 5, care_score: 4, comments: 'Muy buena inquilina. Pagos puntuales, solo pequeños detalles de mantenimiento al finalizar.' },
            { tenant_id: maria.id, agency_id: agencyId, start_date: '2020-02-01', end_date: '2021-06-30', contract_status: 'Finished', payment_score: 4, care_score: 5, comments: 'Buen cuidado del inmueble. Un par de pagos con atraso menor.' },

            // Carlos - Score 3.5
            { tenant_id: carlos.id, agency_id: agencyId, start_date: '2022-03-01', end_date: '2023-08-31', contract_status: 'Finished', payment_score: 3, care_score: 4, comments: 'Pagos regulares con algunos atrasos. Cuidado aceptable del inmueble.' },
            { tenant_id: carlos.id, agency_id: agencyId, start_date: '2024-01-01', end_date: null, contract_status: 'Active', payment_score: 4, care_score: 3, comments: 'Contrato actual. Mejoró en pagos pero necesita más atención al cuidado.' },

            // Laura - Score 2.0
            { tenant_id: laura.id, agency_id: agencyId, start_date: '2023-06-01', end_date: '2023-11-30', contract_status: 'Terminated', payment_score: 2, care_score: 2, comments: 'Contrato terminado anticipadamente. Múltiples atrasos en pagos y daños al inmueble.' }
        ];

        console.log('💾 Insertando registros...');
        const { data, error } = await supabase
            .from('rental_history')
            .insert(records)
            .select();

        if (error) {
            console.error('❌ Error:', error);
            process.exit(1);
        }

        console.log(`✅ Cargados ${data.length} registros de historial\n`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 ¡Listo! Ahora los inquilinos tienen scores:');
        console.log('   ⭐ María: 4.7/5');
        console.log('   ⚠️  Carlos: 3.5/5');
        console.log('   ❌ Laura: 2.0/5');
        console.log('\n🚀 Refrescá el dashboard: http://localhost:3001/dashboard\n');

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

loadRentalHistory();
