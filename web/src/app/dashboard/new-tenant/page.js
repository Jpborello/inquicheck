'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewTenantPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        dni: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            // Get current user (Agency)
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error('No hay sesión activa. Por favor inicie sesión.');
            }

            // Insert into Tenants table
            const { error } = await supabase
                .from('tenants')
                .insert([{
                    ...formData,
                    created_by: user.id
                }]);

            if (error) throw error;

            setMessage({ type: 'success', text: 'Inquilino creado exitosamente.' });

            // Redirect after short delay
            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);

        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: error.message || 'Error al crear inquilino.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Registrar Nuevo Inquilino</h2>

            {message && (
                <div style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '1.5rem',
                    background: message.type === 'success' ? '#d3f9d8' : '#ffe3e3',
                    color: message.type === 'success' ? '#2b8a3e' : '#c92a2a'
                }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>DNI / Identificación</label>
                    <input
                        name="dni"
                        type="text"
                        required
                        value={formData.dni}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nombre</label>
                    <input
                        name="first_name"
                        type="text"
                        required
                        value={formData.first_name}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Apellido</label>
                    <input
                        name="last_name"
                        type="text"
                        required
                        value={formData.last_name}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email (Opcional)</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Teléfono (Opcional)</label>
                    <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                    >
                        {loading ? 'Guardando...' : 'Guardar Inquilino'}
                    </button>
                </div>
            </form>
        </div>
    );
}
