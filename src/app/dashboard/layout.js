'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import TermsModal from '@/components/TermsModal';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkTermsAcceptance();
    }, []);

    const checkTermsAcceptance = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }

            // Check if agency has accepted terms
            const { data: agency, error } = await supabase
                .from('agencies')
                .select('terms_accepted_at')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error checking terms:', error);
                setLoading(false);
                return;
            }

            // Show modal if terms not accepted
            if (!agency?.terms_accepted_at) {
                setShowTermsModal(true);
            }

            setLoading(false);
        } catch (err) {
            console.error('Error in checkTermsAcceptance:', err);
            setLoading(false);
        }
    };

    const handleAcceptTerms = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Update agency record with acceptance date and version
            const { error } = await supabase
                .from('agencies')
                .update({
                    terms_accepted_at: new Date().toISOString(),
                    terms_version: '1.0'
                })
                .eq('id', user.id);

            if (error) {
                console.error('Error saving terms acceptance:', error);
                alert('Hubo un error al guardar. Por favor intenta nuevamente.');
                return;
            }

            setShowTermsModal(false);
        } catch (err) {
            console.error('Error in handleAcceptTerms:', err);
            alert('Hubo un error al guardar. Por favor intenta nuevamente.');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const navItems = [
        { name: 'Mis Inquilinos', href: '/dashboard', icon: '👥' },
        { name: 'Nuevo Inquilino', href: '/dashboard/new-tenant', icon: '➕' },
        { name: 'Perfil Agencia', href: '/dashboard/profile', icon: '🏢' },
    ];

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: '#f8f9fa'
            }}>
                <div style={{ fontSize: '1.2rem', color: '#666' }}>
                    ⏳ Cargando...
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
            {/* Terms Modal */}
            {showTermsModal && <TermsModal onAccept={handleAcceptTerms} />}

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
                    <img
                        src="/logo.png"
                        alt="InquiCheck Logo"
                        style={{
                            height: '50px',
                            width: 'auto',
                            marginBottom: '0.5rem',
                            filter: 'brightness(0) invert(1)' // Make logo white
                        }}
                    />
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
