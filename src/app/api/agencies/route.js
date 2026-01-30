import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin Client (with service role key for user creation)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, company_name, cuit, email, password, address, phone } = body;

        // Validate required fields
        if (!company_name || !email || !password) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos: company_name, email, password' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Formato de email inválido' },
                { status: 400 }
            );
        }

        // Validate password length
        if (password.length < 6) {
            return NextResponse.json(
                { error: 'La contraseña debe tener al menos 6 caracteres' },
                { status: 400 }
            );
        }

        // Step 1: Create user in Supabase Auth using Admin API
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm email for admin-created accounts
            user_metadata: {
                name: company_name,
                contact_name: name || ''
            }
        });

        if (authError) {
            console.error('Auth error:', authError);
            return NextResponse.json(
                { error: `Error al crear usuario: ${authError.message}` },
                { status: 500 }
            );
        }

        const userId = authData.user.id;

        // Step 2: Insert into agencies table (matching actual schema)
        const { error: agencyError } = await supabaseAdmin
            .from('agencies')
            .insert([{
                id: userId,
                name: company_name,
                cuit: cuit || null,
                address: address || null,
                phone: phone || null
            }]);

        if (agencyError) {
            console.error('Agency insert error:', agencyError);

            // Rollback: delete the auth user if agency creation fails
            await supabaseAdmin.auth.admin.deleteUser(userId);

            return NextResponse.json(
                { error: `Error al crear agencia: ${agencyError.message}` },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Agencia creada exitosamente',
            data: {
                id: userId,
                email,
                company_name
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
