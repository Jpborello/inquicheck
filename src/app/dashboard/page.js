'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTenants() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return; // Or redirect

                // Join with rental history later for score, for now just list tenants
                const { data, error } = await supabase
                    .from('tenants')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                // Transform data to match UI needs (mock score for now as we don't have history yet)
                const transformed = data.map(t => ({
                    id: t.id,
                    name: `${t.first_name} ${t.last_name}`,
                    dni: t.dni,
                    score: 0, // Default pending calculation
                    status: 'Nuevo'
                }));

                setTenants(transformed);
            } catch (err) {
                console.error('Error loading tenants:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchTenants();
    }, []);

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1.5rem'
            }}>
                <input
                    type="text"
                    placeholder="Buscar por DNI o Nombre..."
                    style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid #ccc',
                        width: '300px'
                    }}
                />
                <Link href="/dashboard/new-tenant" className="btn btn-primary">
                    + Nuevo Inquilino
                </Link>
            </div>

            <div style={{ background: 'white', borderRadius: 'var(--radius-md)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f1f3f5' }}>
                        <tr>
                            <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Inquilino</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>DNI</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Estado</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Score</th>
                            <th style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</td></tr>
                        ) : tenants.map((tenant) => (
                            <tr key={tenant.id} style={{ borderBottom: '1px solid #f1f3f5' }}>
                                <td style={{ padding: '1rem' }}>{tenant.name}</td>
                                <td style={{ padding: '1rem' }}>{tenant.dni}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        background: tenant.status === 'Activo' ? '#d3f9d8' : tenant.status === 'Deudor' ? '#ffe3e3' : '#e7f5ff',
                                        color: tenant.status === 'Activo' ? '#2b8a3e' : tenant.status === 'Deudor' ? '#c92a2a' : '#1971c2'
                                    }}>
                                        {tenant.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {/* Star Rating based on score */}
                                    {'⭐'.repeat(tenant.score)}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <button className="btn btn-outline" style={{ color: 'var(--color-primary)', border: '1px solid var(--color-primary)', fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}>
                                        Ver Informe
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
