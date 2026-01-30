'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function TermsModal({ onAccept }) {
    const [accepted, setAccepted] = useState(false);

    const handleAccept = () => {
        if (accepted) {
            onAccept();
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '2rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '700px',
                width: '100%',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '2rem',
                    borderTopLeftRadius: 'var(--radius-lg)',
                    borderTopRightRadius: 'var(--radius-lg)',
                    textAlign: 'center'
                }}>
                    <img
                        src="/logo.png"
                        alt="InquiCheck Logo"
                        style={{
                            height: '50px',
                            width: 'auto',
                            marginBottom: '1rem',
                            filter: 'brightness(0) invert(1)'
                        }}
                    />
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
                        Términos y Condiciones de Uso
                    </h2>
                    <p style={{ margin: '0.5rem 0 0', opacity: 0.95, fontSize: '0.95rem' }}>
                        Leer solo te tomará unos minutos
                    </p>
                </div>

                {/* Content - Scrollable */}
                <div style={{
                    padding: '2rem',
                    overflowY: 'auto',
                    flex: 1,
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    color: '#333'
                }}>
                    <p style={{ marginBottom: '1.5rem', color: '#555' }}>
                        Al acceder, registrarse o utilizar la plataforma <strong>InquiCheck</strong>, usted acepta de manera expresa, voluntaria e informada los presentes Términos y Condiciones.
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ color: '#667eea', fontSize: '1.1rem', marginBottom: '0.75rem' }}>Puntos Clave:</h3>
                        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}>
                                InquiCheck es una plataforma de evaluación locativa, <strong>no es una lista negra</strong>
                            </li>
                            <li style={{ marginBottom: '0.5rem' }}>
                                La información es <strong>estrictamente confidencial</strong> y de uso personal
                            </li>
                            <li style={{ marginBottom: '0.5rem' }}>
                                Está <strong>prohibido</strong> compartir, divulgar o publicar información fuera de la plataforma
                            </li>
                            <li style={{ marginBottom: '0.5rem' }}>
                                Los datos deben ser <strong>reales, objetivos y veraces</strong>
                            </li>
                            <li style={{ marginBottom: '0.5rem' }}>
                                Tienes derecho a <strong>acceder, rectificar y suprimir</strong> tus datos personales
                            </li>
                            <li style={{ marginBottom: '0.5rem' }}>
                                El uso indebido puede resultar en <strong>suspensión o cancelación</strong> de la cuenta
                            </li>
                        </ul>
                    </div>

                    <div style={{
                        background: '#fff8e1',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: '4px solid #f59e0b',
                        marginBottom: '1.5rem'
                    }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#755800' }}>
                            <strong>⚠️ Importante:</strong> InquiCheck se reserva el derecho de auditar, corregir, suspender o eliminar registros ante irregularidades detectadas.
                        </p>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                        Para conocer todos los detalles, podés leer los{' '}
                        <Link href="/terms" target="_blank" style={{
                            color: '#667eea',
                            textDecoration: 'underline',
                            fontWeight: 600
                        }}>
                            Términos y Condiciones completos
                        </Link>.
                    </p>
                </div>

                {/* Footer - Checkbox and Button */}
                <div style={{
                    padding: '2rem',
                    borderTop: '2px solid #f0f0f0',
                    background: '#f8f9fa'
                }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        marginBottom: '1.5rem'
                    }}>
                        <input
                            type="checkbox"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            style={{
                                width: '20px',
                                height: '20px',
                                marginTop: '2px',
                                cursor: 'pointer',
                                accentColor: '#667eea'
                            }}
                        />
                        <span style={{ fontSize: '1rem', color: '#333', fontWeight: 500 }}>
                            He leído y acepto los Términos y Condiciones de InquiCheck
                        </span>
                    </label>

                    <button
                        onClick={handleAccept}
                        disabled={!accepted}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            border: 'none',
                            cursor: accepted ? 'pointer' : 'not-allowed',
                            background: accepted
                                ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                                : '#d0d0d0',
                            color: 'white',
                            boxShadow: accepted ? '0 4px 16px rgba(245, 158, 11, 0.4)' : 'none',
                            transition: 'all 0.2s',
                            opacity: accepted ? 1 : 0.6
                        }}
                        onMouseEnter={(e) => {
                            if (accepted) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.5)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (accepted) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 16px rgba(245, 158, 11, 0.4)';
                            }
                        }}
                    >
                        Aceptar y Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}
