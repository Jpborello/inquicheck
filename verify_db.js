const { Client } = require('pg');

const connectionString = 'postgresql://postgres:Lili32918626%40@db.euhbrdakllawvslrzkcl.supabase.co:5432/postgres';

const client = new Client({
    connectionString,
});

async function verifyDatabase() {
    try {
        await client.connect();
        console.log('✓ Connected to database successfully!\n');

        // Check if tables exist
        const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;

        const result = await client.query(tablesQuery);

        console.log('📊 Tables in public schema:');
        if (result.rows.length === 0) {
            console.log('⚠️  No tables found in public schema!');
            console.log('   Schema might not have been applied yet.\n');
        } else {
            result.rows.forEach(row => {
                console.log(`   - ${row.table_name}`);
            });
            console.log('');
        }

        // Check agencies table structure if it exists
        const agenciesCheck = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'agencies' 
      ORDER BY ordinal_position;
    `);

        if (agenciesCheck.rows.length > 0) {
            console.log('📋 Agencies table columns:');
            agenciesCheck.rows.forEach(row => {
                console.log(`   - ${row.column_name} (${row.data_type})`);
            });
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
        console.error('   Full error:', err);
    } finally {
        await client.end();
    }
}

verifyDatabase();
