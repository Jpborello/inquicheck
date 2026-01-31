const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Faltan variables de entorno');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
    console.log('Verificando columnas en rental_history...\n');

    try {
        // Intentar seleccionar datos incluyendo comments
        const { data, error } = await supabase
            .from('rental_history')
            .select('*')
            .limit(1);

        if (error) {
            console.log('Error al consultar:', error.message);
            return;
        }

        if (data && data.length > 0) {
            console.log('Columnas actuales:');
            Object.keys(data[0]).forEach(col => console.log(`  - ${col}`));

            if (Object.keys(data[0]).includes('comments')) {
                console.log('\n✅ La columna "comments" YA EXISTE!');
            } else {
                console.log('\n❌ La columna "comments" NO EXISTE');
            }
        } else {
            console.log('La tabla está vacía, probando con un INSERT...');

            // Probar si podemos insertar con comments
            const testInsert = {
                tenant_id: '00000000-0000-0000-0000-000000000000',
                agency_id: '00000000-0000-0000-0000-000000000000',
                comments: 'test'
            };

            const { error: insertError } = await supabase
                .from('rental_history')
                .insert([testInsert]);

            if (insertError && insertError.message.includes('comments')) {
                console.log('❌ La columna "comments" NO EXISTE en la base de datos');
                console.log('\nEjecuta este SQL en Supabase SQL Editor:');
                console.log('ALTER TABLE public.rental_history ADD COLUMN comments TEXT;');
            }
        }

    } catch (err) {
        console.error('Error:', err.message);
    }
}

checkColumns();
