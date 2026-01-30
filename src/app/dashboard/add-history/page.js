'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AddHistoryPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tenantIdFromUrl = searchParams.get('tenant_id');

    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        tenant_id: tenantIdFromUrl || '',
        start_date: '',
        end_date: '',
        contract_status: 'Active',
        payment_score: 5,
        care_score: 5,
        comments: ''
    });

    useEffect(() => {
        async function fetchTenants() {
            const { data } = await supabase
                .from('tenants')
                .select('id, first_name, last_name, dni')
                .order('last_name');
            setTenants(data || []);
        }
        fetchTenants();
    }, []);

    useEffect(() => {
        if (tenantIdFromUrl) {
            setFormData(prev => ({ ...prev, tenant_id: tenantIdFromUrl }));
        }
    }, [tenantIdFromUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('No hay sesión activa');

            const dataToInsert = {
                ...formData,
                agency_id: user.id,
                end_date: formData.end_date || null,
                payment_score: parseInt(formData.payment_score),
                care_score: parseInt(formData.care_score)
            };

            const { error } = await supabase
                .from('rental_history')
                .insert([dataToInsert]);

            if (error) throw error;

            setMessage({ type: 'success', text: 'Historial agregado exitosamente' });

            setTimeout(() => {
                router.push(`/dashboard/tenant/${formData.tenant_id}`);
            }, 1500);

        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: error.message || 'Error al agregar historial' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '700px' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
                Agregar Historial de Alquiler
            </h2>

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

            <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <form onSubmit={handleSubmit} className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {/* Tenant Selection */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Inquilino *
                        </label>
                        <select
                            name="tenant_id"
                            required
                            value={formData.tenant_id}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #ccc',
                                fontSize: '1rem'
                            }}
                        >
                            <option value="">Seleccionar inquilino...</option>
                            {tenants.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.first_name} {t.last_name} (DNI: {t.dni})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Dates */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Fecha Inicio *
                        </label>
                        <input
                            type="date"
                            name="start_date"
                            required
                            value={formData.start_date}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #ccc'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Fecha Fin (opcional)
                        </label>
                        <input
                            type="date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #ccc'
                            }}
                        />
                    </div>

                    {/* Contract Status */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Estado del Contrato *
                        </label>
                        <select
                            name="contract_status"
                            required
                            value={formData.contract_status}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #ccc',
                                fontSize: '1rem'
                            }}
                        >
                            <option value="Active">Activo</option>
                            <option value="Finished">Finalizado</option>
                            <option value="Terminated">Terminado Anticipadamente</option>
                        </select>
                    </div>

                    {/* Scores */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Score Pagos * (1-5)
                        </label>
                        <select
                            name="payment_score"
                            required
                            value={formData.payment_score}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #ccc',
                                fontSize: '1rem'
                            }}
                        >
                            <option value="5">5 - Excelente</option>
                            <option value="4">4 - Muy bueno</option>
                            <option value="3">3 - Bueno</option>
                            <option value="2">2 - Regular</option>
                            <option value="1">1 - Malo</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Score Cuidado * (1-5)
                        </label>
                        <select
                            name="care_score"
                            required
                            value={formData.care_score}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #ccc',
                                fontSize: '1rem'
                            }}
                        >
                            <option value="5">5 - Excelente</option>
                            <option value="4">4 - Muy bueno</option>
                            <option value="3">3 - Bueno</option>
                            <option value="2">2 - Regular</option>
                            <option value="1">1 - Malo</option>
                        </select>
                    </div>

                    {/* Comments */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Comentarios
                        </label>
                        <textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Agrega comentarios sobre este inquilino y su comportamiento durante el alquiler..."
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #ccc',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    {/* Submit */}
                    <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                        >
                            {loading ? 'Guardando...' : 'Guardar Historial'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
