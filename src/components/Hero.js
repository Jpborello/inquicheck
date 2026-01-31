import Link from 'next/link';

export default function Hero() {
    return (
        <section style={{
            position: 'relative',
            minHeight: '480px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            color: 'white',
            marginTop: '-2rem'
        }}>

            {/* Background Image with Blur/Fade */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}>
                {/* The Image */}
                <img
                    src="/hero_real_estate.png"
                    alt="Fondo Inmobiliaria"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 35%', // Muestra más la parte superior (caras)
                        filter: 'blur(2px)' // Slight blur as requested "difumine"
                    }}
                />

                {/* Gradient Overlay for Text Readability & "Fade" effect */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 10%, rgba(29, 53, 87, 0.7) 30%, rgba(29, 53, 87, 0.95) 60%, rgba(29, 53, 87, 0.95) 100%)'
                }}></div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '600px' }}>
                    <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.5rem', fontWeight: '800' }}>
                        Verificá inquilinos <br />
                        <span style={{ color: 'var(--color-accent)' }}>antes de alquilar.</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.9 }}>
                        Informes completos con consentimiento, historial financiero y validación de identidad en reportes oficiales.
                    </p>

                    <div className="flex gap-md">
                        <Link href="/login" className="btn" style={{
                            padding: '1rem 2rem',
                            fontSize: '1.1rem',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 600,
                            boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
                            border: 'none',
                            transition: 'all 0.2s'
                        }}>
                            Solicitar Informe
                        </Link>
                        <Link href="#como-funciona" className="btn btn-outline">
                            Cómo funciona
                        </Link>
                    </div>
                </div>
            </div>

            {/* Trust Badges Bar */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(29, 53, 87, 0.9)',
                padding: '1rem 0',
                borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div className="container flex justify-between" style={{ opacity: 0.9, fontSize: '0.9rem', fontWeight: '600' }}>
                    <span className="flex items-center gap-xs">🛡️ Identidad Validada</span>
                    <span className="flex items-center gap-xs">⚖️ Antecedentes Judiciales</span>
                    <span className="flex items-center gap-xs">💼 Situación Laboral</span>
                </div>
            </div>
        </section>
    );
}
