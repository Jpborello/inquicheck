'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { generateConsentPDF } from '@/lib/generateConsentPDF';

export default function NewTenantPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        dni: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });
    const [agencyData, setAgencyData] = useState(null);
    const [consentConfirmed, setConsentConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generatingPDF, setGeneratingPDF] = useState(false);
    const [message, setMessage] = useState(null);

    // Cargar datos de la agencia actual
    useEffect(() => {
        loadAgencyData();
    }, []);

    const loadAgencyData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: agency, error } = await supabase
                .from('agencies')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error cargando datos de agencia:', error);
                return;
            }

            setAgencyData(agency);
        } catch (error) {
            console.error('Error en loadAgencyData:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDownloadConsent = async () => {
        setGeneratingPDF(true);
        try {
            const result = await generateConsentPDF(agencyData || {}, formData);

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: `✅ Documento descargado: ${result.fileName}`
                });
                // Limpiar mensaje después de 5 segundos
                setTimeout(() => setMessage(null), 5000);
            } else {
                setMessage({
                    type: 'error',
                    text: `❌ Error al generar PDF: ${result.error}`
                });
            }
        } catch (error) {
            console.error('Error descargando PDF:', error);
            setMessage({
                type: 'error',
                text: '❌ Error al generar el documento. Intente nuevamente.'
            });
        } finally {
            setGeneratingPDF(false);
        }
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

            setMessage({ type: 'success', text: '✅ Inquilino creado exitosamente.' });

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
        <div style={{ maxWidth: '700px', background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Registrar Nuevo Inquilino</h2>

            {/* Info Box sobre Consentimiento */}
            <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.5rem',
                background: '#e7f5ff',
                border: '1px solid #339af0',
                color: '#1864ab'
            }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>ℹ️</span>
                    <div>
                        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                            Documento de Consentimiento Requerido
                        </p>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                            Antes de registrar un inquilino, es <strong>obligatorio legalmente</strong> obtener
                            su consentimiento firmado para el registro y verificación de datos. Descargue el
                            documento, complételo con el inquilino y consérvelo en sus archivos.
                        </p>
                    </div>
                </div>
            </div>

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

                {/* Botón Descargar Documento */}
                <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                    <button
                        type="button"
                        onClick={handleDownloadConsent}
                        disabled={generatingPDF}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            borderRadius: 'var(--radius-md)',
                            border: 'none',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: generatingPDF ? 'not-allowed' : 'pointer',
                            opacity: generatingPDF ? 0.7 : 1,
                            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span style={{ fontSize: '1.25rem' }}>📄</span>
                        {generatingPDF ? 'Generando PDF...' : 'Descargar Documento de Consentimiento'}
                    </button>
                    <p style={{
                        fontSize: '0.75rem',
                        color: '#666',
                        marginTop: '0.5rem',
                        textAlign: 'center'
                    }}>
                        Puede descargar el documento en cualquier momento, incluso antes de completar el formulario
                    </p>
                </div>

                {/* Checkbox de Confirmación */}
                <div style={{
                    gridColumn: 'span 2',
                    marginTop: '1rem',
                    padding: '1rem',
                    background: '#f8f9fa',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #dee2e6'
                }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}>
                        <input
                            type="checkbox"
                            checked={consentConfirmed}
                            onChange={(e) => setConsentConfirmed(e.target.checked)}
                            style={{
                                width: '18px',
                                height: '18px',
                                cursor: 'pointer'
                            }}
                        />
                        <span style={{ fontSize: '0.925rem', lineHeight: 1.5 }}>
                            Confirmo que el inquilino ha firmado el documento de consentimiento
                            <span style={{ fontWeight: 600, color: '#1864ab' }}> (Recomendado)</span>
                        </span>
                    </label>
                </div>

                {/* Botón Guardar */}
                <div style={{ gridColumn: 'span 2', marginTop: '0.5rem' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Guardando...' : 'Guardar Inquilino'}
                    </button>
                </div>
            </form>
        </div>
    );
}
