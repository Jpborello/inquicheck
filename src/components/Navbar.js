import Link from 'next/link';

export default function Navbar() {
    return (
        <nav style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '1rem 0' }}>
            <div className="container flex justify-between items-center">
                <Link href="/" className="logo">
                    {/* Simple Icon placeholder */}
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    InquiCheck
                </Link>

                <div className="flex items-center gap-md">
                    <div className="flex gap-md" style={{ fontSize: '0.9rem' }}>
                        <Link href="#como-funciona">Cómo Funciona</Link>
                        <Link href="#planes">Planes</Link>
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
