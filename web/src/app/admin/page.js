'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function AdminPage() {
    const [formData, setFormData] = useState({
        name: '',
        company_name: '',
        cuit: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch('/api/agencies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Error al crear agencia');

            setMessage({ type: 'success', text: 'Agencia creada exitosamente. Ya pueden ingresar.' });
            setFormData({ name: '', company_name: '', cuit: '', email: '', password: '' }); // Reset

        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
            <header style={{ background: '#333', color: 'white', padding: '1rem' }}>
                <div className="container flex justify-between items-center">
                    <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>InquiCheck | Super Admin</h1>
                    <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Panel de Control</span>
                </div>
            </header>

            <main className="container" style={{ padding: '3rem 0' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Alta de Inmobiliaria</h2>

                    {message && (
                        <div style={{
                            padding: '1rem',
                            borderRadius: '4px',
                            marginBottom: '1.5rem',
                            background: message.type === 'success' ? '#d3f9d8' : '#ffe3e3',
                            color: message.type === 'success' ? '#2b8a3e' : '#c92a2a'
                        }}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Nombre Fantasía (Empresa)</label>
                            <input name="company_name" required value={formData.company_name} onChange={handleChange}
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Nombre Contacto</label>
                            <input name="name" required value={formData.name} onChange={handleChange}
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>CUIT</label>
                            <input name="cuit" required value={formData.cuit} onChange={handleChange}
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Usuario</label>
                            <input name="email" type="email" required value={formData.email} onChange={handleChange}
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Contraseña</label>
                            <input name="password" type="password" required value={formData.password} onChange={handleChange}
                                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px' }} />
                        </div>

                        <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                            <button type="submit" disabled={loading} className="btn " style={{
                                width: '100%',
                                background: '#333',
                                color: 'white',
                                padding: '1rem',
                                fontWeight: 'bold'
                            }}>
                                {loading ? 'Creando...' : 'Crear Inmobiliaria'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
