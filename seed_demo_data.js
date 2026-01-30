// Script para cargar datos de demo en InquiCheck
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

console.log('📝 Env loaded:');
console.log(`   URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
console.log(`   Service Key exists: ${!!process.env.SUPABASE_SERVICE_ROLE_KEY}\n`);

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seedDemoData() {
    console.log('🌱 Iniciando seed de datos de demo...\n');

    try {
        // 1. Obtener la primera agencia creada para usar como created_by
        console.log('🔍 Buscando agencias...');
        const { data: agencies, error: agencyError } = await supabase
            .from('agencies')
            .select('id, name')
            .limit(1);

        if (agencyError) {
            console.error('❌ Error al buscar agencias:', agencyError);
            process.exit(1);
        }

        if (!agencies || agencies.length === 0) {
            console.error('❌ No hay agencias en el sistema. Creá una primero desde /admin');
            console.log('   Visitá: http://localhost:3001/admin');
            process.exit(1);
        }

        const agencyId = agencies[0].id;
        console.log(`✅ Usando agencia: ${agencies[0].name} (${agencyId})\n`);

        // 2. Crear inquilinos de demo
        const tenantsToCreate = [
            {
                dni: '35678901',
                first_name: 'María',
                last_name: 'González',
                email: 'maria.gonzalez@email.com',
                phone: '+54 11 4567-8901',
                created_by: agencyId
            },
            {
                dni: '42123456',
                first_name: 'Carlos',
                last_name: 'Mendoza',
                email: 'carlos.mendoza@email.com',
                phone: '+54 11 2345-6789',
                created_by: agencyId
            },
            {
                dni: '38456789',
                first_name: 'Laura',
                last_name: 'Fernández',
                email: 'laura.fernandez@email.com',
                phone: '+54 11 9876-5432',
                created_by: agencyId
            }
        ];

        console.log('👥 Creando inquilinos...');
        const { data: tenants, error: tenantsError } = await supabase
            .from('tenants')
            .insert(tenantsToCreate)
            .select();

        if (tenantsError) {
            console.error('❌ Error al crear inquilinos:', tenantsError);
            process.exit(1);
        }

        console.log(`✅ Creados ${tenants.length} inquilinos:`);
        tenants.forEach(t => console.log(`   - ${t.first_name} ${t.last_name} (DNI: ${t.dni})`));
        console.log();

        // 3. Crear historial de alquileres
        const maria = tenants.find(t => t.first_name === 'María');
        const carlos = tenants.find(t => t.first_name === 'Carlos');
        const laura = tenants.find(t => t.first_name === 'Laura');

        const rentalHistoryRecords = [
            // María González - Excelente inquilina (Score: 4.7)
            {
                tenant_id: maria.id,
                agency_id: agencyId,
                start_date: '2023-01-01',
                end_date: '2024-01-01',
                contract_status: 'Finished',
                payment_score: 5,
                care_score: 5,
                comments: 'Excelente inquilina. Siempre pagó a tiempo y mantuvo el departamento impecable. Altamente recomendable.'
            },
            {
                tenant_id: maria.id,
                agency_id: agencyId,
                start_date: '2021-07-01',
                end_date: '2022-12-31',
                contract_status: 'Finished',
                payment_score: 5,
                care_score: 4,
                comments: 'Muy buena inquilina. Pagos puntuales, solo pequeños detalles de mantenimiento al finalizar.'
            },
            {
                tenant_id: maria.id,
                agency_id: agencyId,
                start_date: '2020-02-01',
                end_date: '2021-06-30',
                contract_status: 'Finished',
                payment_score: 4,
                care_score: 5,
                comments: 'Buen cuidado del inmueble. Un par de pagos con atraso menor.'
            },

            // Carlos Mendoza - Inquilino promedio (Score: 3.5)
            {
                tenant_id: carlos.id,
                agency_id: agencyId,
                start_date: '2022-03-01',
                end_date: '2023-08-31',
                contract_status: 'Finished',
                payment_score: 3,
                care_score: 4,
                comments: 'Pagos regulares con algunos atrasos. Cuidado aceptable del inmueble.'
            },
            {
                tenant_id: carlos.id,
                agency_id: agencyId,
                start_date: '2024-01-01',
                end_date: null,
                contract_status: 'Active',
                payment_score: 4,
                care_score: 3,
                comments: 'Contrato actual. Mejoró en pagos pero necesita más atención al cuidado.'
            },

            // Laura Fernández - Inquilina problemática (Score: 2.0)
            {
                tenant_id: laura.id,
                agency_id: agencyId,
                start_date: '2023-06-01',
                end_date: '2023-11-30',
                contract_status: 'Terminated',
                payment_score: 2,
                care_score: 2,
                comments: 'Contrato terminado anticipadamente. Múltiples atrasos en pagos y daños al inmueble.'
            }
        ];

        console.log('📋 Creando historial de alquileres...');
        const { data: history, error: historyError } = await supabase
            .from('rental_history')
            .insert(rentalHistoryRecords)
            .select();

        if (historyError) {
            console.error('❌ Error al crear historial:', historyError);
            process.exit(1);
        }

        console.log(`✅ Creados ${history.length} registros de historial\n`);

        // 4. Resumen
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 ¡Datos de demo cargados exitosamente!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('📊 Resumen:');
        console.log(`   - ${tenants.length} inquilinos creados`);
        console.log(`   - ${history.length} registros de historial\n`);
        console.log('👤 Inquilinos de demo:');
        console.log(`   ⭐ María González (DNI: ${maria.dni})`);
        console.log(`      → Score esperado: 4.7/5 (Excelente)`);
        console.log(`   ⚠️  Carlos Mendoza (DNI: ${carlos.dni})`);
        console.log(`      → Score esperado: 3.5/5 (Promedio)`);
        console.log(`   ❌ Laura Fernández (DNI: ${laura.dni})`);
        console.log(`      → Score esperado: 2.0/5 (Problemática)\n`);
        console.log('🚀 Próximos pasos:');
        console.log('   1. Andá a: http://localhost:3001/dashboard');
        console.log('   2. Hacé click en "Ver Informe" de María González');
        console.log('   3. ¡Disfrutá del tenant detail page con datos reales!\n');

    } catch (error) {
        console.error('❌ Error inesperado:', error);
        console.error('Stack:', error.stack);
        process.exit(1);
    }
}

seedDemoData();


