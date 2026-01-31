import Link from 'next/link';

export default function Navbar() {
    return (
        <nav style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.98) 40%, rgba(255, 255, 255, 0.85) 70%, rgba(255, 255, 255, 0) 100%)',
            color: 'var(--color-primary)',
            padding: '1rem 0',
            paddingBottom: '2rem',
            position: 'relative',
            zIndex: 10
        }}>
            <div className="container flex justify-between items-center">
                <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                        src="/logo-nuevo.jpg"
                        alt="InquiCheck Logo"
                        style={{
                            height: '100px',
                            width: 'auto'
                        }}
                    />
                </Link>

                <div className="flex items-center gap-md">
                    <div className="flex gap-md" style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                        <Link href="#como-funciona" style={{ color: 'var(--color-primary)' }}>Cómo Funciona</Link>
                        <Link href="/pricing" style={{ color: 'var(--color-primary)' }}>Planes</Link>
                        <Link href="#faq" style={{ color: 'var(--color-primary)' }}>Preguntas Frecuentes</Link>
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
