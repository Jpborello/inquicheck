import Link from 'next/link';

export default function Navbar() {
    return (
        <nav style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '1rem 0' }}>
            <div className="container flex justify-between items-center">
                <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                        src="/logo-transparent.png"
                        alt="InquiCheck Logo"
                        style={{
                            height: '45px',
                            width: 'auto'
                        }}
                    />
                </Link>

                <div className="flex items-center gap-md">
                    <div className="flex gap-md" style={{ fontSize: '0.9rem' }}>
                        <Link href="#como-funciona">Cómo Funciona</Link>
                        <Link href="/pricing">Planes</Link>
                        <Link href="#faq">Preguntas Frecuentes</Link>
                    </div>

                    <Link href="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                        Ingresar
                    </Link>
                </div>
            </div>
        </nav>
    );
}
