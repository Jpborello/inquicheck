'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const navItems = [
        { name: 'Mis Inquilinos', href: '/dashboard', icon: '👥' },
        { name: 'Nuevo Inquilino', href: '/dashboard/new-tenant', icon: '➕' },
        { name: 'Perfil Agencia', href: '/dashboard/profile', icon: '🏢' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                background: 'var(--color-primary)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem 1rem'
            }}>
                <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>InquiCheck</h2>
                    <p style={{ opacity: 0.7, fontSize: '0.875rem' }}>Panel Inmobiliaria</p>
                </div>

                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href} style={{ marginBottom: '0.5rem' }}>
                                    <Link href={item.href} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '0.75rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                                        color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                                        fontWeight: isActive ? 600 : 400
                                    }}>
                                        <span>{item.icon}</span>
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: 'auto',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        width: '100%'
                    }}
                >
                    🚪 Cerrar Sesión
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem' }}>
                <header style={{
                    marginBottom: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #dee2e6',
                    paddingBottom: '1rem'
                }}>
                    <h1 style={{ fontSize: '1.5rem', color: 'var(--color-text-main)' }}>
                        {navItems.find(i => i.href === pathname)?.name || 'Dashboard'}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{
                            background: 'var(--color-secondary)',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            fontSize: '0.875rem'
                        }}>
                            Inmobiliaria Demo
                        </span>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}
