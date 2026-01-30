'use client';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
            {/* Header */}
            <header style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '2rem 0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <div className="container" style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: '0 2rem'
                }}>
                    <Link href="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                        <img
                            src="/logo.png"
                            alt="InquiCheck Logo"
                            style={{
                                height: '60px',
                                width: 'auto',
                                filter: 'brightness(0) invert(1)'
                            }}
                        />
                    </Link>
                    <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 700 }}>
                        Política de Privacidad
                    </h1>
                    <p style={{ margin: '0.5rem 0 0', opacity: 0.95, fontSize: '1.1rem' }}>
                        Cómo protegemos tus datos personales
                    </p>
                </div>
            </header>

            {/* Content */}
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '3rem 2rem'
            }}>
                <div style={{
                    background: 'white',
                    padding: '3rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    lineHeight: 1.8,
                    color: '#333'
                }}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#555' }}>
                        En <strong>InquiCheck</strong>, nos tomamos muy en serio la privacidad y protección de tus datos personales. Esta política describe cómo recopilamos, utilizamos y protegemos tu información.
                    </p>

                    <Section title="Información que recopilamos">
                        <p>Recopilamos la siguiente información:</p>
                        <ul>
                            <li>Datos de registro: nombre, email, CUIT/CUIL, teléfono</li>
                            <li>Información de inquilinos: datos personales compartidos voluntariamente</li>
                            <li>Historial de consultas y registros de evaluación locativa</li>
                            <li>Datos de uso de la plataforma (logs, navegación)</li>
                        </ul>
                    </Section>

                    <Section title="Cómo utilizamos tu información">
                        <ul>
                            <li>Proveer los servicios de evaluación locativa que solicitaste</li>
                            <li>Conectar inmobiliarias con información compartida</li>
                            <li>Mejorar la plataforma y experiencia del usuario</li>
                            <li>Cumplir con obligaciones legales y normativas</li>
                            <li>Comunicarnos contigo sobre el servicio</li>
                        </ul>
                    </Section>

                    <Section title="Protección de datos">
                        <p><strong>InquiCheck protege tu información mediante:</strong></p>
                        <ul>
                            <li>Cifrado de datos sensibles en tránsito y en reposo</li>
                            <li>Acceso restringido solo a personal autorizado</li>
                            <li>Servidores seguros y respaldos periódicos</li>
                            <li>Auditorías de seguridad regulares</li>
                            <li>Protocolos de autenticación robustos</li>
                        </ul>
                    </Section>

                    <Section title="Compartición de datos">
                        <p>Tus datos <strong>NO se comparten ni comercializan</strong> con terceros.</p>
                        <p>La información solo es accesible para:</p>
                        <ul>
                            <li>Entidades privadas habilitadas (inmobiliarias verificadas)</li>
                            <li>El titular de los datos (con consentimiento cuando corresponda)</li>
                            <li>Autoridades judiciales o regulatorias cuando sea requerido por ley</li>
                        </ul>
                    </Section>

                    <Section title="Consentimiento">
                        <p>Al utilizar InquiCheck:</p>
                        <ul>
                            <li>Aceptás que tus datos sean utilizados conforme a esta política</li>
                            <li>Reconocés que los datos compartidos serán visibles para inmobiliarias habilitadas</li>
                            <li>Podés retirar tu consentimiento en cualquier momento</li>
                        </ul>
                    </Section>

                    <Section title="Tus derechos">
                        <p>Tenés derecho a:</p>
                        <ul>
                            <li><strong>Acceder</strong> a tus datos personales almacenados</li>
                            <li><strong>Rectificar</strong> información inexacta o desactualizada</li>
                            <li><strong>Suprimir</strong> tus datos personales (derecho al olvido)</li>
                            <li><strong>Limitar</strong> el procesamiento de tus datos</li>
                            <li><strong>Portabilidad</strong> de datos en formato estructurado</li>
                            <li><strong>Oponerte</strong> al procesamiento de tus datos</li>
                        </ul>
                        <p>Para ejercer estos derechos, contactá a nuestro canal de soporte oficial.</p>
                    </Section>

                    <Section title="Cookies y tecnologías similares">
                        <p>Utilizamos cookies y tecnologías similares para:</p>
                        <ul>
                            <li>Mantener tu sesión activa</li>
                            <li>Recordar tus preferencias</li>
                            <li>Analizar el uso de la plataforma</li>
                            <li>Mejorar la seguridad del sitio</li>
                        </ul>
                        <p>Podés configurar tu navegador para bloquear cookies, aunque esto puede afectar la funcionalidad del servicio.</p>
                    </Section>

                    <Section title="Retención de datos">
                        <p>Conservamos tus datos personales mientras:</p>
                        <ul>
                            <li>Mantengas una cuenta activa en InquiCheck</li>
                            <li>Sea necesario para cumplir con obligaciones legales</li>
                            <li>Existan disputas legales pendientes</li>
                        </ul>
                        <p>Una vez que solicites la eliminación de tu cuenta, procederemos a anonimizar o eliminar tus datos conforme a la normativa vigente.</p>
                    </Section>

                    <Section title="Menores de edad">
                        <p>InquiCheck <strong>no está dirigido a menores de 18 años</strong>. No recopilamos conscientemente información de menores. Si detectamos que un menor ha proporcionado datos personales, procederemos a eliminarlos de inmediato.</p>
                    </Section>

                    <Section title="Cambios en esta política">
                        <p>Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cambios significativos mediante:</p>
                        <ul>
                            <li>Aviso en la plataforma</li>
                            <li>Email a tu dirección registrada</li>
                        </ul>
                        <p>El uso continuado de InquiCheck después de estos cambios constituye tu aceptación de la política actualizada.</p>
                    </Section>

                    <Section title="Contacto">
                        <p>Para consultas sobre esta Política de Privacidad o el manejo de tus datos personales, contactanos a través de nuestro canal de soporte oficial.</p>
                    </Section>

                    {/* Bottom CTA */}
                    <div style={{
                        marginTop: '3rem',
                        padding: '2rem',
                        background: '#f8f9fa',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center'
                    }}>
                        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#555' }}>
                            ¿Tenés dudas sobre tu privacidad?
                        </p>
                        <Link href="/" style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            padding: '0.875rem 2rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'inline-block',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                        }}>
                            Contactar Soporte
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={{
                background: '#1a1a1a',
                color: 'white',
                padding: '2rem 0',
                marginTop: '3rem'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: '0 2rem',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    opacity: 0.7
                }}>
                    © 2026 InquiCheck. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
                fontSize: '1.5rem',
                color: '#667eea',
                marginBottom: '1rem',
                fontWeight: 700,
                paddingBottom: '0.5rem',
                borderBottom: '2px solid #e0e0e0'
            }}>
                {title}
            </h2>
            <div style={{ paddingLeft: '1rem' }}>
                {children}
            </div>
        </section>
    );
}
