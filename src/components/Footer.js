'use client';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#000000', color: 'white', padding: '3rem 0', marginTop: 'auto' }}>
            <div className="container">
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                    <img
                        src="/logo-nuevo.jpg"
                        alt="InquiScore Logo"
                        style={{
                            height: '120px',
                            width: 'auto',
                            marginTop: '-30px',
                            marginBottom: '-15px'
                        }}
                    />
                        <p style={{ opacity: 0.8, maxWidth: '400px' }}>
                            Plataforma de verificación de inquilinos segura, confiable y conectada con fuentes oficiales.
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 'bold' }}>Fuentes Oficiales</p>
                        <div className="flex" style={{ justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                            <span>AFIP</span>
                            <span>|</span>
                            <span>Poder Judicial</span>
                            <span>|</span>
                            <span>BCRA</span>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', opacity: 0.8, flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} InquiScore. Todos los derechos reservados.</p>
                    <div className="flex gap-md" style={{ gap: '1.5rem' }}>
                        <Link href="/terms" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s' }}
                            onMouseEnter={(e) => e.target.style.opacity = '1'}
                            onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                        >
                            Términos y Condiciones
                        </Link>
                        <Link href="/privacy" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s' }}
                            onMouseEnter={(e) => e.target.style.opacity = '1'}
                            onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                        >
                            Política de Privacidad
                        </Link>
                        <Link href="/" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s' }}
                            onMouseEnter={(e) => e.target.style.opacity = '1'}
                            onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                        >
                            Soporte
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
