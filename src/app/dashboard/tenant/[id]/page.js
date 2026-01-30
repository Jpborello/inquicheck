'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function TenantDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [tenant, setTenant] = useState(null);
    const [rentalHistory, setRentalHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTenantData() {
            try {
                // Fetch tenant basic info
                const { data: tenantData, error: tenantError } = await supabase
                    .from('tenants')
                    .select('*')
                    .eq('id', params.id)
                    .single();

                if (tenantError) throw tenantError;

                // Fetch rental history with agency info
                const { data: historyData, error: historyError } = await supabase
                    .from('rental_history')
                    .select(`
                        *,
                        agencies:agency_id (
                            name,
                            cuit
                        )
                    `)
                    .eq('tenant_id', params.id)
                    .order('start_date', { ascending: false });

                if (historyError) throw historyError;

                setTenant(tenantData);
                setRentalHistory(historyData || []);
            } catch (err) {
                console.error('Error fetching tenant:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (params.id) {
            fetchTenantData();
        }
    }, [params.id]);

    // Calculate scores
    const calculateScores = () => {
        if (!rentalHistory.length) {
            return { total: 0, payment: 0, care: 0, behavior: 0 };
        }

        const totals = rentalHistory.reduce(
            (acc, record) => {
                acc.payment += record.payment_score || 0;
                acc.care += record.care_score || 0;
                return acc;
            },
            { payment: 0, care: 0 }
        );

        const avgPayment = rentalHistory.reduce((sum, r) => sum + (r.payment_score || 0), 0) / rentalHistory.length;
        const avgCare = rentalHistory.reduce((sum, r) => sum + (r.care_score || 0), 0) / rentalHistory.length;
        const avgBehavior = (avgPayment + avgCare) / 2;
        const total = (avgPayment + avgCare + avgBehavior) / 3;

        return {
            total: parseFloat(total.toFixed(1)),
            payment: parseFloat(avgPayment.toFixed(1)),
            care: parseFloat(avgCare.toFixed(1)),
            behavior: parseFloat(avgBehavior.toFixed(1))
        };
    };

    const getScoreColor = (score) => {
        if (score >= 4) return '#10b981';
        if (score >= 3) return '#f59e0b';
        return '#ef4444';
    };

    const getScoreGradient = (score) => {
        if (score >= 4) return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        if (score >= 3) return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Presente';
        return new Date(dateStr).toLocaleDateString('es-AR', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                fontSize: '1.1rem',
                color: '#666'
            }}>
                <div>⏳ Cargando información...</div>
            </div>
        );
    }

    if (!tenant) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
                <h2 style={{ color: '#666' }}>Inquilino no encontrado</h2>
                <Link href="/dashboard" style={{ color: 'var(--color-primary)', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
                    ← Volver al dashboard
                </Link>
            </div>
        );
    }

    const scores = calculateScores();

    return (
        <div>
            {/* Enhanced Breadcrumb */}
            <Link
                href="/dashboard"
                style={{
                    color: 'var(--color-primary)',
                    textDecoration: 'none',
                    marginBottom: '2rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.gap = '0.75rem'}
                onMouseLeave={(e) => e.target.style.gap = '0.5rem'}
            >
                <span>←</span> Volver a Mis Inquilinos
            </Link>

            {/* Hero Section - Tenant Info & Total Score */}
            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '3rem 2.5rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                marginBottom: '2.5rem',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative circles */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    filter: 'blur(40px)'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '-30px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    filter: 'blur(30px)'
                }} />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '3rem',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <div>
                        <div style={{
                            fontSize: '0.875rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            opacity: 0.9,
                            marginBottom: '0.75rem',
                            fontWeight: 600
                        }}>
                            Perfil del Inquilino
                        </div>
                        <h1 style={{
                            margin: 0,
                            marginBottom: '1.5rem',
                            fontSize: '2.75rem',
                            fontWeight: 700,
                            lineHeight: 1.2
                        }}>
                            {tenant.first_name} {tenant.last_name}
                        </h1>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem',
                            fontSize: '0.95rem',
                            opacity: 0.95
                        }}>
                            <div style={{
                                background: 'rgba(255,255,255,0.15)',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '0.25rem' }}>DNI</div>
                                <div style={{ fontWeight: 600 }}>{tenant.dni}</div>
                            </div>
                            {tenant.email && (
                                <div style={{
                                    background: 'rgba(255,255,255,0.15)',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '0.25rem' }}>Email</div>
                                    <div style={{ fontWeight: 600, wordBreak: 'break-word' }}>{tenant.email}</div>
                                </div>
                            )}
                            {tenant.phone && (
                                <div style={{
                                    background: 'rgba(255,255,255,0.15)',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '0.25rem' }}>Teléfono</div>
                                    <div style={{ fontWeight: 600 }}>{tenant.phone}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Premium Score Badge */}
                    <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(20px)',
                        padding: '2.5rem',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center',
                        minWidth: '200px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            opacity: 0.9,
                            marginBottom: '1rem',
                            fontWeight: 600
                        }}>
                            Score Total
                        </div>
                        <div style={{
                            fontSize: '5rem',
                            fontWeight: 800,
                            lineHeight: 1,
                            marginBottom: '0.75rem',
                            textShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}>
                            {scores.total}
                        </div>
                        <div style={{
                            fontSize: '1.5rem',
                            marginBottom: '0.5rem',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                        }}>
                            {'⭐'.repeat(Math.round(scores.total))}
                        </div>
                        <div style={{
                            fontSize: '0.8rem',
                            opacity: 0.9,
                            fontWeight: 500
                        }}>
                            {scores.total >= 4 ? 'Excelente' : scores.total >= 3 ? 'Bueno' : 'Regular'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Score Breakdown - Modern Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem'
            }}>
                {[
                    { icon: '💰', label: 'Pagos', score: scores.payment, desc: 'Puntualidad en pagos' },
                    { icon: '🏠', label: 'Cuidado', score: scores.care, desc: 'Mantenimiento del inmueble' },
                    { icon: '👤', label: 'Comportamiento', score: scores.behavior, desc: 'Conducta general' }
                ].map((item, idx) => (
                    <div key={idx} style={{
                        background: getScoreGradient(item.score),
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                        textAlign: 'center',
                        color: 'white',
                        transition: 'transform 0.2s',
                        cursor: 'default',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.1)',
                            filter: 'blur(30px)'
                        }} />
                        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                        <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', opacity: 0.95, fontWeight: 500 }}>
                            {item.label}
                        </div>
                        <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                            {item.score}
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                            {item.desc}
                        </div>
                    </div>
                ))}
            </div>

            {/* Rental History - Enhanced Timeline */}
            <div style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    paddingBottom: '1.5rem',
                    borderBottom: '2px solid #f0f0f0'
                }}>
                    <div>
                        <h2 style={{
                            margin: 0,
                            color: '#1a1a1a',
                            fontSize: '1.75rem',
                            fontWeight: 700
                        }}>
                            Historial de Alquileres
                        </h2>
                        <p style={{
                            margin: '0.5rem 0 0 0',
                            color: '#666',
                            fontSize: '0.9rem'
                        }}>
                            {rentalHistory.length} {rentalHistory.length === 1 ? 'registro' : 'registros'} encontrados
                        </p>
                    </div>
                    <Link
                        href={`/dashboard/add-history?tenant_id=${tenant.id}`}
                        className="btn btn-primary"
                        style={{
                            fontSize: '0.9rem',
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        + Agregar Registro
                    </Link>
                </div>

                {rentalHistory.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        borderRadius: 'var(--radius-lg)',
                        color: '#666'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>📋</div>
                        <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            No hay registros de alquileres
                        </p>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                            Agrega un registro para empezar a construir el historial de este inquilino
                        </p>
                    </div>
                ) : (
                    <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
                        {/* Enhanced Timeline line */}
                        <div style={{
                            position: 'absolute',
                            left: '12px',
                            top: '30px',
                            bottom: '30px',
                            width: '3px',
                            background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '10px'
                        }} />

                        {rentalHistory.map((record, index) => (
                            <div key={record.id} style={{
                                position: 'relative',
                                marginBottom: index < rentalHistory.length - 1 ? '2rem' : 0
                            }}>
                                {/* Enhanced Timeline dot */}
                                <div style={{
                                    position: 'absolute',
                                    left: '-1.8rem',
                                    top: '28px',
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: getScoreGradient((record.payment_score + record.care_score) / 2),
                                    border: '4px solid white',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    zIndex: 2
                                }} />

                                <div style={{
                                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                                    padding: '1.75rem',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid #e0e0e0',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                    transition: 'all 0.2s'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
                                        e.currentTarget.style.transform = 'translateX(4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '1.25rem',
                                        gap: '1rem'
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                fontSize: '1.1rem',
                                                fontWeight: 700,
                                                color: '#1a1a1a',
                                                marginBottom: '0.5rem'
                                            }}>
                                                📅 {formatDate(record.start_date)} → {formatDate(record.end_date)}
                                            </div>
                                            {record.agency?.name && (
                                                <div style={{
                                                    fontSize: '0.9rem',
                                                    color: '#666',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}>
                                                    <span style={{
                                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        fontWeight: 600
                                                    }}>
                                                        🏢 {record.agency.name}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <span style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            whiteSpace: 'nowrap',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            background: record.contract_status === 'Active' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                                                record.contract_status === 'Finished' ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' :
                                                    'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                            color: 'white',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                        }}>
                                            {record.contract_status === 'Active' ? '✓ Activo' :
                                                record.contract_status === 'Finished' ? '✓ Finalizado' : '✗ Terminado'}
                                        </span>
                                    </div>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                        gap: '1rem',
                                        marginBottom: '1rem'
                                    }}>
                                        <div style={{
                                            background: 'white',
                                            padding: '1rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '2px solid #f0f0f0'
                                        }}>
                                            <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.25rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                Score Pagos
                                            </div>
                                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: getScoreColor(record.payment_score) }}>
                                                {record.payment_score}<span style={{ fontSize: '1rem', opacity: 0.6 }}>/5</span>
                                            </div>
                                        </div>
                                        <div style={{
                                            background: 'white',
                                            padding: '1rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '2px solid #f0f0f0'
                                        }}>
                                            <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.25rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                Score Cuidado
                                            </div>
                                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: getScoreColor(record.care_score) }}>
                                                {record.care_score}<span style={{ fontSize: '1rem', opacity: 0.6 }}>/5</span>
                                            </div>
                                        </div>
                                    </div>

                                    {record.comments && (
                                        <div style={{
                                            marginTop: '1.25rem',
                                            paddingTop: '1.25rem',
                                            borderTop: '2px dashed #e0e0e0',
                                            fontSize: '0.95rem',
                                            lineHeight: 1.6,
                                            color: '#444',
                                            background: 'white',
                                            padding: '1rem',
                                            borderRadius: 'var(--radius-md)',
                                            fontStyle: 'italic',
                                            position: 'relative'
                                        }}>
                                            <span style={{ fontSize: '2rem', position: 'absolute', top: '-5px', left: '5px', opacity: 0.2 }}>❝</span>
                                            {record.comments}
                                            <span style={{ fontSize: '2rem', position: 'absolute', bottom: '-15px', right: '5px', opacity: 0.2 }}>❞</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
