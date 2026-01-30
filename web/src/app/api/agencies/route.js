import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase with Service Role Key for admin privileges
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'MISSING_KEY' // Ensure this env var is set
);

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password, name, company_name, cuit, role = 'agency' } = body;

        // 1. Create the user in Supabase Auth
        const { data: userData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { name: company_name || name, role }
        });

        if (authError) throw authError;

        // 2. Insert into 'agencies' Record (public table)
        // Note: The Trigger we defined in SQL might handle this, but explicit insert is safer here
        // checking if we already have a profile from trigger? 
        // Let's assume we do an UPSERT or explicit insert to ensure all fields are set.

        const { error: dbError } = await supabaseAdmin
            .from('agencies')
            .upsert({
                id: userData.user.id,
                name: company_name || name, // This maps to the 'name' column in our schema
                cuit,
                status: 'active',
                query_count: 0
                // We'll need to update the schema to strictly support first/last name if we split them
            });

        if (dbError) {
            // If DB insert fails, we might want to clean up the auth user, but for now just error
            console.error('DB Error:', dbError);
            return NextResponse.json({ error: dbError.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Agencia creada exitosamente', user: userData.user });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
