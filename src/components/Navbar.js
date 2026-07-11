import Link from 'next/link';

export default function Navbar() {
    return (
        <nav style={{
            background: '#000000',
            color: 'white',
            padding: '1rem 0',
            position: 'relative',
            zIndex: 10
        }}>
            <div className="container flex justify-between items-center">
                <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                        src="/logo-nuevo.jpg"
                        alt="InquiScore Logo"
                        style={{
                            height: '160px',
                            width: 'auto',
                            marginTop: '-40px',
                            marginBottom: '-40px'
                        }}
                    />
                </Link>

                <div className="flex items-center gap-md">
                    <div className="flex gap-md" style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                        <Link href="#como-funciona" style={{ color: 'white' }}>Cómo Funciona</Link>
                        <Link href="/pricing" style={{ color: 'white' }}>Planes</Link>
                        <Link href="#faq" style={{ color: 'white' }}>Preguntas Frecuentes</Link>
                    </div>

                    <Link href="/login" className="btn" style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        border: 'none'
                    }}>
                        Ingresar
                    </Link>
                </div>
            </div>
        </nav>
    );
}
