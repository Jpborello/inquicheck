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
                        status: history.length === 0 ? 'Nuevo' : score >= 4 ? 'Excelente' : score >= 3 ? 'Bueno' : 'Regular'
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

    const getScoreColor = (score) => {
        if (score >= 4) return '#10b981';
        if (score >= 3) return '#f59e0b';
        if (score > 0) return '#ef4444';
        return '#94a3b8';
    };

    const getScoreGradient = (score) => {
        if (score >= 4) return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        if (score >= 3) return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        if (score > 0) return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        return 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)';
    };

    const getStatusBadgeStyle = (status) => {
        const styles = {
            'Excelente': { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' },
            'Bueno': { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' },
            'Regular': { bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white' },
            'Nuevo': { bg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white' }
        };
        return styles[status] || styles['Nuevo'];
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
                <div>⏳ Cargando inquilinos...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Statistics Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '1.75rem',
                    borderRadius: 'var(--radius-lg)',
                    color: 'white',
                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
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
                    <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem', position: 'relative' }}>
                        Total Inquilinos
                    </div>
                    <div style={{ fontSize: '3rem', fontWeight: 800, position: 'relative' }}>
                        {stats.total}
                    </div>
                </div>

                <div style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    padding: '1.75rem',
                    borderRadius: 'var(--radius-lg)',
                    color: 'white',
                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
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
                    <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem', position: 'relative' }}>
                        Con Historial
                    </div>
                    <div style={{ fontSize: '3rem', fontWeight: 800, position: 'relative' }}>
                        {stats.withHistory}
                    </div>
                </div>

                <div style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    padding: '1.75rem',
                    borderRadius: 'var(--radius-lg)',
                    color: 'white',
                    boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
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
                    <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem', position: 'relative' }}>
                        Score Promedio
                    </div>
                    <div style={{ fontSize: '3rem', fontWeight: 800, position: 'relative' }}>
                        {stats.avgScore || '-'}
                    </div>
                </div>
            </div>

            {/* Search Bar & Add Button */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
            }}>
                <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="🔍 Buscar por DNI o Nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem 1.25rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '2px solid #e0e0e0',
                            fontSize: '1rem',
                            background: 'white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            transition: 'all 0.2s'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#667eea';
                            e.target.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.2)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e0e0e0';
                            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                        }}
                    />
                </div>
                <Link
                    href="/dashboard/new-tenant"
                    className="btn btn-primary"
                    style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '1rem 2rem',
                        borderRadius: 'var(--radius-lg)',
                        fontWeight: 600,
                        fontSize: '1rem',
                        boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                        border: 'none',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                    + Nuevo Inquilino
                </Link>
            </div>

            {/* Tenants Grid - Card Layout */}
            {filteredTenants.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '5rem 2rem',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    borderRadius: 'var(--radius-lg)',
                    color: '#666'
                }}>
                    <div style={{ fontSize: '5rem', marginBottom: '1rem', opacity: 0.5 }}>
                        {searchTerm ? '🔍' : '👥'}
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        {searchTerm ? 'No se encontraron inquilinos' : 'No hay inquilinos registrados'}
                    </h3>
                    <p style={{ fontSize: '1rem', opacity: 0.8 }}>
                        {searchTerm ? 'Intenta con otro término de búsqueda' : 'Agrega tu primer inquilino para comenzar'}
                    </p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {filteredTenants.map((tenant) => (
                        <div
                            key={tenant.id}
                            style={{
                                background: 'white',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                transition: 'all 0.2s',
                                border: '2px solid transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
                                e.currentTarget.style.borderColor = '#667eea';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            {/* Card Header with Gradient */}
                            <div style={{
                                background: getScoreGradient(tenant.score),
                                padding: '1.5rem',
                                color: 'white',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-30px',
                                    right: '-30px',
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.15)',
                                    filter: 'blur(25px)'
                                }} />
                                <div style={{ position: 'relative' }}>
                                    <h3 style={{
                                        margin: 0,
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        marginBottom: '0.5rem'
                                    }}>
                                        {tenant.name}
                                    </h3>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{
                                            fontSize: '0.9rem',
                                            opacity: 0.95,
                                            fontWeight: 500
                                        }}>
                                            DNI: {tenant.dni}
                                        </span>
                                        <div style={{
                                            background: 'rgba(255,255,255,0.25)',
                                            backdropFilter: 'blur(10px)',
                                            padding: '0.5rem 1rem',
                                            borderRadius: 'var(--radius-md)',
                                            fontWeight: 700,
                                            fontSize: '1.25rem'
                                        }}>
                                            {tenant.score > 0 ? tenant.score : '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{
                                    display: 'grid',
                                    gap: '0.75rem',
                                    marginBottom: '1.25rem'
                                }}>
                                    {tenant.email && (
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.9rem',
                                            color: '#666'
                                        }}>
                                            <span>📧</span>
                                            <span style={{ wordBreak: 'break-word' }}>{tenant.email}</span>
                                        </div>
                                    )}
                                    {tenant.phone && (
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.9rem',
                                            color: '#666'
                                        }}>
                                            <span>📱</span>
                                            <span>{tenant.phone}</span>
                                        </div>
                                    )}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.9rem',
                                        color: '#666'
                                    }}>
                                        <span>📋</span>
                                        <span>{tenant.historyCount} {tenant.historyCount === 1 ? 'registro' : 'registros'}</span>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    paddingTop: '1rem',
                                    borderTop: '2px solid #f0f0f0'
                                }}>
                                    <span style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        background: getStatusBadgeStyle(tenant.status).bg,
                                        color: getStatusBadgeStyle(tenant.status).color,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {tenant.status}
                                    </span>

                                    <Link
                                        href={`/dashboard/tenant/${tenant.id}`}
                                        style={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                            padding: '0.65rem 1.25rem',
                                            borderRadius: 'var(--radius-md)',
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            textDecoration: 'none',
                                            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                                            transition: 'all 0.2s',
                                            whiteSpace: 'nowrap',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.transform = 'translateX(2px)';
                                            e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.transform = 'translateX(0)';
                                            e.target.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
                                        }}
                                    >
                                        Ver Informe →
                                    </Link>
                                </div>

                                {/* Score Stars Display */}
                                {tenant.score > 0 && (
                                    <div style={{
                                        marginTop: '1rem',
                                        textAlign: 'center',
                                        fontSize: '1.25rem',
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                                    }}>
                                        {'⭐'.repeat(Math.round(tenant.score))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
