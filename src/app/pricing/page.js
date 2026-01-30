'use client';
import Link from 'next/link';

export default function PricingPage() {
    const plans = [
        {
            name: 'Informe Básico',
            price: 4000,
            priceLabel: 'ARS 4.000',
            description: 'Información esencial para consultas rápidas',
            icon: '📋',
            gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            features: [
                'Identidad verificada del inquilino (DNI / CUIT)',
                'Score general de riesgo (escala 1 a 5)',
                'Cantidad de registros históricos disponibles',
                'Estado de garantes (aprobado / rechazado / desconocido)',
                'Acceso a información compartida por entidades habilitadas',
                'Consulta individual por inquilino'
            ]
        },
        {
            name: 'Informe Plus',
            price: 8000,
            priceLabel: 'ARS 8.000',
            description: 'Análisis detallado para decisiones críticas',
            icon: '⭐',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            popular: true,
            features: [
                'Todo lo del Informe Básico',
                'Sub-scores detallados:',
                '  • Cumplimiento de pagos',
                '  • Comportamiento y convivencia',
                '  • Entrega y estado del inmueble',
                'Historial de alquileres resumido y ordenado cronológicamente',
                'Indicador de datos con consentimiento firmado',
                'Mayor nivel de detalle para decisiones críticas',
                'Consulta individual por inquilino'
            ]
        },
        {
            name: 'Plan Inmobiliarias',
            price: 40000,
            priceLabel: 'ARS 40.000/mes',
            description: 'Solución completa para inmobiliarias',
            icon: '🏢',
            gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            features: [
                'Consultas ilimitadas (uso razonable)',
                'Carga y gestión de inquilinos',
                'Carga de historial de alquileres con puntajes estandarizados',
                'Acceso a score completo y sub-scores detallados',
                'Acceso a inquilinos con consentimiento firmado',
                'Perfil de agencia editable',
                'Identidad de agencia visible en los registros cargados',
                'Acceso a base de datos compartida entre entidades habilitadas',
                'Badge "Entidad Verificada"'
            ]
        }
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
            {/* Header/Navbar */}
            <header style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1.5rem 0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <div className="container" style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Link href="/" style={{ display: 'inline-block' }}>
                        <img
                            src="/logo-transparent.png"
                            alt="InquiCheck Logo"
                            style={{
                                height: '45px',
                                width: 'auto'
                            }}
                        />
                    </Link>
                    <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <Link href="/" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Inicio</Link>
                        <Link href="/pricing" style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>Planes</Link>
                        <Link href="/login" style={{
                            background: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            padding: '0.65rem 1.5rem',
                            borderRadius: 'var(--radius-md)',
                            color: 'white',
                            textDecoration: 'none',
                            fontWeight: 600,
                            transition: 'all 0.2s'
                        }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                        >
                            Ingresar
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '5rem 2rem',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-100px',
                    right: '-100px',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    filter: 'blur(60px)'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-80px',
                    left: '-80px',
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    filter: 'blur(50px)'
                }} />

                <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        lineHeight: 1.2
                    }}>
                        Elige el Plan Perfecto para Ti
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        opacity: 0.95,
                        lineHeight: 1.6,
                        marginBottom: '0'
                    }}>
                        Accede a información verificada de inquilinos y toma decisiones informadas.<br />
                        Sin costos ocultos, todo transparente desde el inicio.
                    </p>
                </div>
            </div>

            {/* Pricing Cards */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '4rem 2rem',
                marginTop: '-3rem'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            style={{
                                background: 'white',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                boxShadow: plan.popular ? '0 12px 40px rgba(102, 126, 234, 0.25)' : '0 8px 24px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s',
                                position: 'relative',
                                border: plan.popular ? '3px solid #667eea' : '2px solid transparent',
                                transform: plan.popular ? 'scale(1.05)' : 'scale(1)'
                            }}
                            onMouseEnter={(e) => {
                                if (!plan.popular) {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.15)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!plan.popular) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                                }
                            }}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '-35px',
                                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                    color: 'white',
                                    padding: '0.5rem 3rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    transform: 'rotate(45deg)',
                                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
                                    zIndex: 10
                                }}>
                                    Más Popular
                                </div>
                            )}

                            {/* Card Header */}
                            <div style={{
                                background: plan.gradient,
                                padding: '2.5rem 2rem',
                                textAlign: 'center',
                                color: 'white',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    right: '-40px',
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.15)',
                                    filter: 'blur(30px)'
                                }} />
                                <div style={{ fontSize: '4rem', marginBottom: '1rem', position: 'relative' }}>
                                    {plan.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.75rem',
                                    fontWeight: 700,
                                    marginBottom: '0.75rem',
                                    position: 'relative'
                                }}>
                                    {plan.name}
                                </h3>
                                <p style={{
                                    fontSize: '0.95rem',
                                    opacity: 0.95,
                                    marginBottom: '1.5rem',
                                    position: 'relative'
                                }}>
                                    {plan.description}
                                </p>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        fontSize: '3rem',
                                        fontWeight: 800,
                                        lineHeight: 1
                                    }}>
                                        {plan.priceLabel.split('/')[0]}
                                    </div>
                                    {plan.priceLabel.includes('/') && (
                                        <div style={{
                                            fontSize: '1rem',
                                            opacity: 0.9,
                                            marginTop: '0.5rem'
                                        }}>
                                            por {plan.priceLabel.split('/')[1]}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div style={{ padding: '2rem' }}>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    marginBottom: '2rem'
                                }}>
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} style={{
                                            padding: '0.75rem 0',
                                            borderBottom: idx < plan.features.length - 1 ? '1px solid #f0f0f0' : 'none',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0.75rem',
                                            fontSize: '0.95rem',
                                            color: '#444',
                                            lineHeight: 1.5
                                        }}>
                                            <span style={{
                                                color: '#10b981',
                                                fontSize: '1.25rem',
                                                flexShrink: 0
                                            }}>
                                                {feature.startsWith(' ') ? '   •' : '✓'}
                                            </span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Buttons Section */}
                <div style={{
                    background: 'white',
                    padding: '3rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        color: '#1a1a1a'
                    }}>
                        ¿Listo para comenzar?
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        marginBottom: '2.5rem',
                        maxWidth: '600px',
                        margin: '0 auto 2.5rem'
                    }}>
                        Solicita acceso a nuestro sistema, habla con nuestro equipo o prueba la plataforma sin compromiso.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <a
                            href="#contacto"
                            style={{
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: 'white',
                                padding: '1rem 2.5rem',
                                borderRadius: 'var(--radius-lg)',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                textDecoration: 'none',
                                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
                                transition: 'all 0.2s',
                                display: 'inline-block'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 16px rgba(245, 158, 11, 0.4)';
                            }}
                        >
                            📝 Solicitar Acceso
                        </a>

                        <a
                            href="https://wa.me/5491234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: 'white',
                                padding: '1rem 2.5rem',
                                borderRadius: 'var(--radius-lg)',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                textDecoration: 'none',
                                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
                                transition: 'all 0.2s',
                                display: 'inline-block'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 16px rgba(245, 158, 11, 0.4)';
                            }}
                        >
                            💬 Hablar con Nosotros
                        </a>

                        <Link
                            href="/login"
                            style={{
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: 'white',
                                padding: '1rem 2.5rem',
                                borderRadius: 'var(--radius-lg)',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                textDecoration: 'none',
                                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
                                transition: 'all 0.2s',
                                display: 'inline-block'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 16px rgba(245, 158, 11, 0.4)';
                            }}
                        >
                            🚀 Quiero Probar el Sistema
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={{
                background: '#1a1a1a',
                color: 'white',
                padding: '3rem 2rem',
                marginTop: '4rem'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <img
                        src="/logo.png"
                        alt="InquiCheck Logo"
                        style={{
                            height: '55px',
                            width: 'auto',
                            marginBottom: '1rem',
                            filter: 'brightness(0) invert(1)'
                        }}
                    />
                    <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>
                        Información verificada de inquilinos para decisiones inteligentes
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '2rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        fontSize: '0.9rem',
                        opacity: 0.7
                    }}>
                        <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
                        <Link href="/pricing" style={{ color: 'white', textDecoration: 'none' }}>Planes</Link>
                        <Link href="/login" style={{ color: 'white', textDecoration: 'none' }}>Ingresar</Link>
                    </div>
                    <div style={{
                        marginTop: '2rem',
                        paddingTop: '2rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        fontSize: '0.85rem',
                        opacity: 0.6
                    }}>
                        © 2026 InquiCheck. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
}
