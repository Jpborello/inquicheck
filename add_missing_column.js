const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addCommentsColumn() {
    console.log('🔧 Agregando columna "comments" a la tabla rental_history...\n');

    try {
        // Ejecutar ALTER TABLE para agregar la columna
        const { data, error } = await supabase.rpc('exec_sql', {
            sql: `ALTER TABLE public.rental_history ADD COLUMN IF NOT EXISTS comments TEXT;`
        });

        if (error) {
            // Si falla con rpc, intentar con un INSERT dummy para verificar que la columna no existe
            console.log('⚠️  No se puede usar RPC directamente. Verificando columnas actuales...\n');

            // Intentar un SELECT para ver qué columnas existen
            const { data: testData, error: testError } = await supabase
                .from('rental_history')
                .select('*')
                .limit(1);

            if (testData && testData.length > 0) {
                const columns = Object.keys(testData[0]);
                console.log('📋 Columnas actuales en rental_history:');
                columns.forEach(col => console.log(`   - ${col}`));

                if (columns.includes('comments')) {
                    console.log('\n✅ La columna "comments" YA EXISTE en la tabla!');
                } else {
                    console.log('\n❌ La columna "comments" NO EXISTE.');
                    console.log('\n📝 Por favor ejecuta este SQL manualmente en Supabase SQL Editor:');
                    console.log('\nALTER TABLE public.rental_history ADD COLUMN comments TEXT;');
                }
            } else {
                console.log('⚠️  No hay datos en rental_history para verificar las columnas.');
                console.log('\n📝 Por favor ejecuta este SQL manualmente en Supabase SQL Editor:');
                console.log('\nALTER TABLE public.rental_history ADD COLUMN IF NOT EXISTS comments TEXT;');
            }
        } else {
            console.log('✅ Columna agregada exitosamente!\n');

            // Verificar las columnas finales
            const { data: finalData } = await supabase
                .from('rental_history')
                .select('*')
                .limit(1);

            if (finalData) {
                console.log('📋 Columnas finales en rental_history:');
                Object.keys(finalData[0] || {}).forEach(col => console.log(`   - ${col}`));
            }
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
        console.log('\n📝 Por favor ejecuta este SQL manualmente en Supabase SQL Editor:');
        console.log('\nALTER TABLE public.rental_history ADD COLUMN IF NOT EXISTS comments TEXT;');
    }
}

addCommentsColumn();
