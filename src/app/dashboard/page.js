'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
    const [tenants, setTenants] = useState([]);
    const [filteredTenants, setFilteredTenants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, withHistory: 0, avgScore: 0 });

    useEffect(() => {
        async function fetchTenants() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                // Fetch tenants with rental history to calculate actual scores
                const { data: tenantsData, error } = await supabase
                    .from('tenants')
                    .select(`
                        *,
                        rental_history (
                            payment_score,
                            care_score
                        )
                    `)
                    .order('created_at', { ascending: false });

                if (error) throw error;

                // Calculate scores for each tenant
                const transformed = tenantsData.map(t => {
                    const history = t.rental_history || [];
                    let score = 0;

                    if (history.length > 0) {
                        const avgPayment = history.reduce((sum, r) => sum + (r.payment_score || 0), 0) / history.length;
                        const avgCare = history.reduce((sum, r) => sum + (r.care_score || 0), 0) / history.length;
                        const avgBehavior = (avgPayment + avgCare) / 2;
                        score = parseFloat(((avgPayment + avgCare + avgBehavior) / 3).toFixed(1));
                    }

                    return {
                        id: t.id,
                        firstName: t.first_name,
                        lastName: t.last_name,
                        name: `${t.first_name} ${t.last_name}`,
                        dni: t.dni,
                        email: t.email,
                        phone: t.phone,
                        score: score,
                        historyCount: history.length,
                        // Nueva terminología técnica de riesgo
                        status: history.length === 0 ? 'Sin Historial' : score >= 4 ? 'Riesgo Nulo' : score >= 3 ? 'Riesgo Bajo' : 'Riesgo Alto'
                    };
                });

                setTenants(transformed);
                setFilteredTenants(transformed);

                // Calculate stats
                const withHistory = transformed.filter(t => t.historyCount > 0);
                const avgScore = withHistory.length > 0
                    ? withHistory.reduce((sum, t) => sum + t.score, 0) / withHistory.length
                    : 0;

                setStats({
                    total: transformed.length,
                    withHistory: withHistory.length,
                    avgScore: parseFloat(avgScore.toFixed(1))
                });

            } catch (err) {
                console.error('Error loading tenants:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchTenants();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredTenants(tenants);
        } else {
            const filtered = tenants.filter(t =>
                t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.dni.includes(searchTerm)
            );
            setFilteredTenants(filtered);
        }
    }, [searchTerm, tenants]);

    // Colores profesionales desaturados (solo para badges/score)
    const getRiskColor = (score) => {
        if (score >= 4) return '#16A34A'; // Verde suave
        if (score >= 3) return '#F59E0B'; // Ámbar
        if (score > 0) return '#DC2626'; // Rojo desaturado
        return '#6B7280'; // Gris
    };

    const getRiskBadgeStyle = (status) => {
        const styles = {
            'Riesgo Nulo': { bg: '#F0FDF4', color: '#16A34A', border: '#16A34A' },
            'Riesgo Bajo': { bg: '#FFFBEB', color: '#F59E0B', border: '#F59E0B' },
            'Riesgo Alto': { bg: '#FEF2F2', color: '#DC2626', border: '#DC2626' },
            'Sin Historial': { bg: '#F3F4F6', color: '#6B7280', border: '#6B7280' }
        };
        return styles[status] || styles['Sin Historial'];
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                fontSize: '1.1rem',
                color: '#6B7280'
            }}>
                <div>⏳ Cargando inquilinos...</div>
            </div>
        );
    }

    return (
        <div style={{ background: '#F7F8FA', minHeight: '100vh', padding: '2rem 0' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
                {/* Statistics Cards - Diseño Profesional */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2.5rem'
                }}>
                    {/* Total Inquilinos */}
                    <div style={{
                        background: '#FFFFFF',
                        padding: '2rem',
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        transition: 'all 0.2s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '1rem'
                        }}>
                            <div>
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: '#6B7280',
                                    fontWeight: 500,
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Inquilinos Registrados
                                </div>
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 700,
                                    color: '#1F2937',
                                    lineHeight: 1
                                }}>
                                    {stats.total}
                                </div>
                            </div>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '10px',
                                background: '#EFF6FF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                👥
                            </div>
                        </div>
                    </div>

                    {/* Con Historial Verificado */}
                    <div style={{
                        background: '#FFFFFF',
                        padding: '2rem',
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        transition: 'all 0.2s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '1rem'
                        }}>
                            <div>
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: '#6B7280',
                                    fontWeight: 500,
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Historial Verificado
                                </div>
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 700,
                                    color: '#1F2937',
                                    lineHeight: 1
                                }}>
                                    {stats.withHistory}
                                </div>
                            </div>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '10px',
                                background: '#F0FDF4',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                ✓
                            </div>
                        </div>
                    </div>

                    {/* Score Promedio de Riesgo */}
                    <div style={{
                        background: '#FFFFFF',
                        padding: '2rem',
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        transition: 'all 0.2s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '1rem'
                        }}>
                            <div>
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: '#6B7280',
                                    fontWeight: 500,
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Score Promedio de Riesgo
                                </div>
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 700,
                                    color: stats.avgScore ? getRiskColor(stats.avgScore) : '#1F2937',
                                    lineHeight: 1
                                }}>
                                    {stats.avgScore || '-'}
                                </div>
                            </div>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '10px',
                                background: '#FFFBEB',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                📊
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar & Add Button - Profesional */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Buscar por DNI o nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                borderRadius: '10px',
                                border: '1px solid #D1D5DB',
                                fontSize: '0.95rem',
                                background: 'white',
                                color: '#1F2937',
                                transition: 'all 0.2s'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#2563EB';
                                e.target.style.outline = '2px solid rgba(37, 99, 235, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#D1D5DB';
                                e.target.style.outline = 'none';
                            }}
                        />
                    </div>
                    <Link
                        href="/dashboard/new-tenant"
                        style={{
                            background: '#2563EB',
                            color: 'white',
                            padding: '0.875rem 1.75rem',
                            borderRadius: '10px',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            border: 'none',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                            textDecoration: 'none',
                            display: 'inline-block'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#1D4ED8'}
                        onMouseLeave={(e) => e.target.style.background = '#2563EB'}
                    >
                        + Nuevo Inquilino
                    </Link>
                </div>

                {/* Tenants Grid - Professional Cards */}
                {filteredTenants.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        background: 'white',
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB',
                        color: '#6B7280'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>
                            {searchTerm ? '🔍' : '👥'}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1F2937' }}>
                            {searchTerm ? 'No se encontraron inquilinos' : 'No hay inquilinos registrados'}
                        </h3>
                        <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
                            {searchTerm ? 'Intenta con otro término de búsqueda' : 'Agrega tu primer inquilino para comenzar'}
                        </p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {filteredTenants.map((tenant) => (
                            <div
                                key={tenant.id}
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '1px solid #E5E7EB',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                                    e.currentTarget.style.borderColor = '#D1D5DB';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = '#E5E7EB';
                                }}
                            >
                                {/* Card Body - Todo en blanco */}
                                <div style={{ padding: '1.75rem' }}>
                                    {/* Header Info */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginBottom: '0.75rem'
                                        }}>
                                            <div>
                                                <h3 style={{
                                                    margin: 0,
                                                    fontSize: '1.25rem',
                                                    fontWeight: 700,
                                                    color: '#1F2937',
                                                    marginBottom: '0.25rem'
                                                }}>
                                                    {tenant.name}
                                                </h3>
                                                <div style={{
                                                    fontSize: '0.875rem',
                                                    color: '#6B7280',
                                                    fontWeight: 500
                                                }}>
                                                    DNI: {tenant.dni}
                                                </div>
                                            </div>

                                            {/* Score Badge */}
                                            {tenant.score > 0 && (
                                                <div style={{
                                                    background: getRiskBadgeStyle(tenant.status).bg,
                                                    color: getRiskColor(tenant.score),
                                                    padding: '0.5rem 0.875rem',
                                                    borderRadius: '8px',
                                                    fontWeight: 700,
                                                    fontSize: '1.125rem',
                                                    border: `1px solid ${getRiskColor(tenant.score)}20`
                                                }}>
                                                    {tenant.score}
                                                </div>
                                            )}
                                        </div>

                                        {/* Risk Status Badge */}
                                        <div style={{ marginBottom: '1rem' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.4rem 0.875rem',
                                                borderRadius: '6px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                background: getRiskBadgeStyle(tenant.status).bg,
                                                color: getRiskBadgeStyle(tenant.status).color,
                                                border: `1px solid ${getRiskBadgeStyle(tenant.status).border}30`
                                            }}>
                                                {tenant.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Contact Info - Sin emojis */}
                                    <div style={{
                                        display: 'grid',
                                        gap: '0.625rem',
                                        marginBottom: '1.25rem',
                                        paddingBottom: '1.25rem',
                                        borderBottom: '1px solid #F3F4F6'
                                    }}>
                                        {tenant.email && (
                                            <div style={{
                                                fontSize: '0.875rem',
                                                color: '#6B7280',
                                                display: 'flex',
                                                gap: '0.5rem'
                                            }}>
                                                <span style={{ color: '#9CA3AF', fontWeight: 500 }}>Email:</span>
                                                <span style={{ wordBreak: 'break-word' }}>{tenant.email}</span>
                                            </div>
                                        )}
                                        {tenant.phone && (
                                            <div style={{
                                                fontSize: '0.875rem',
                                                color: '#6B7280',
                                                display: 'flex',
                                                gap: '0.5rem'
                                            }}>
                                                <span style={{ color: '#9CA3AF', fontWeight: 500 }}>Teléfono:</span>
                                                <span>{tenant.phone}</span>
                                            </div>
                                        )}
                                        <div style={{
                                            fontSize: '0.875rem',
                                            color: '#6B7280',
                                            display: 'flex',
                                            gap: '0.5rem'
                                        }}>
                                            <span style={{ color: '#9CA3AF', fontWeight: 500 }}>Registros:</span>
                                            <span>{tenant.historyCount} {tenant.historyCount === 1 ? 'registro' : 'registros'}</span>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <Link
                                        href={`/dashboard/tenant/${tenant.id}`}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            textAlign: 'center',
                                            background: '#2563EB',
                                            color: 'white',
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            textDecoration: 'none',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.target.style.background = '#1D4ED8'}
                                        onMouseLeave={(e) => e.target.style.background = '#2563EB'}
                                    >
                                        Ver Informe
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
