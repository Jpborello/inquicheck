'use client';
import Link from 'next/link';

export default function TermsPage() {
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
                        Términos y Condiciones de Uso
                    </h1>
                    <p style={{ margin: '0.5rem 0 0', opacity: 0.95, fontSize: '1.1rem' }}>
                        Leer solo te tomará unos minutos
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
                        Al acceder, registrarse o utilizar la plataforma <strong>InquiCheck</strong>, usted acepta de manera expresa, voluntaria e informada los presentes Términos y Condiciones.
                        Si no está de acuerdo con alguno de ellos, deberá abstenerse de utilizar el sistema.
                    </p>

                    <Section number="1" title="Finalidad del sistema">
                        <p><strong>InquiCheck</strong> es una plataforma privada de evaluación locativa creada con el objetivo de:</p>
                        <ul>
                            <li>Agilizar los procesos de alquiler</li>
                            <li>Reducir riesgos para propietarios e inmobiliarias</li>
                            <li>Facilitar decisiones basadas en información objetiva</li>
                            <li>Fomentar la confianza y la transparencia entre las partes</li>
                        </ul>
                        <p><strong>InquiCheck no es un sistema de castigo, ni una lista negra, ni una herramienta de exclusión.</strong><br />
                            Su finalidad es ordenar información histórica y objetiva para mejorar la eficiencia del mercado de alquileres.</p>
                    </Section>

                    <Section number="2" title="Naturaleza de la información">
                        <p>La información disponible en InquiCheck:</p>
                        <ul>
                            <li>Es compartida por entidades privadas habilitadas y usuarios autorizados</li>
                            <li>Se basa en datos históricos, puntajes estandarizados y registros objetivos</li>
                            <li>No constituye una recomendación, sentencia ni decisión definitiva</li>
                            <li>No reemplaza el criterio profesional de quien la consulta</li>
                        </ul>
                        <p>El uso de la información es de carácter orientativo y de apoyo a la toma de decisiones.</p>
                    </Section>

                    <Section number="3" title="Confidencialidad y uso de la información">
                        <p>Toda la información accesible en la plataforma es <strong>estrictamente confidencial</strong>.</p>
                        <p>Está <strong>terminantemente prohibido</strong>:</p>
                        <ul>
                            <li>Divulgar información a terceros no autorizados</li>
                            <li>Compartir capturas, reportes o datos fuera de la plataforma</li>
                            <li>Utilizar la información con fines distintos a la evaluación locativa</li>
                            <li>Publicar, difundir o reproducir datos obtenidos en InquiCheck</li>
                        </ul>
                        <p><strong>El acceso a la plataforma es personal e intransferible.</strong></p>
                    </Section>

                    <Section number="4" title="Prohibición de usos indebidos">
                        <p>Queda expresamente prohibido utilizar InquiCheck para:</p>
                        <ul>
                            <li>Discriminación de personas</li>
                            <li>Hostigamiento, extorsión o presión indebida</li>
                            <li>Creación de listados externos o bases paralelas</li>
                            <li>Publicaciones en redes sociales, grupos privados o medios externos</li>
                        </ul>
                        <p><strong>Cualquier uso que se aparte de la finalidad del sistema será considerado una falta grave.</strong></p>
                    </Section>

                    <Section number="5" title="Responsabilidad del usuario">
                        <p>El usuario declara que:</p>
                        <ul>
                            <li>Utilizará la plataforma de buena fe</li>
                            <li>Comprende que los datos reflejan información histórica</li>
                            <li>Asume plena responsabilidad por las decisiones que tome</li>
                            <li>No atribuirá a InquiCheck consecuencias derivadas del uso de la información</li>
                        </ul>
                    </Section>

                    <Section number="6" title="Datos aportados y veracidad">
                        <p>Los datos cargados en la plataforma deben ser:</p>
                        <ul>
                            <li>Reales</li>
                            <li>Objetivos</li>
                            <li>Ajustados a los formularios y escalas establecidas</li>
                        </ul>
                        <p>Está prohibida la carga de información falsa, manipulada o con intención de perjudicar a terceros.</p>
                        <p><strong>InquiCheck se reserva el derecho de auditar, corregir, suspender o eliminar registros ante irregularidades detectadas.</strong></p>
                    </Section>

                    <Section number="7" title="Consentimiento y protección de datos personales">
                        <p>La plataforma contempla el uso de consentimientos firmados cuando corresponda.</p>
                        <p>Los datos personales:</p>
                        <ul>
                            <li>No son públicos</li>
                            <li>No se comercializan</li>
                            <li>No se utilizan con fines ajenos a la evaluación locativa</li>
                        </ul>
                        <p>El acceso a la información se limita exclusivamente a entidades privadas habilitadas y bajo las condiciones aquí establecidas.</p>
                    </Section>

                    <Section number="8" title="Derecho de acceso, rectificación y supresión">
                        <p>Toda persona cuyos datos se encuentren registrados en InquiCheck tiene derecho a:</p>
                        <ul>
                            <li>Solicitar acceso a su información</li>
                            <li>Solicitar la rectificación de datos inexactos</li>
                            <li>Solicitar la supresión de sus datos personales</li>
                        </ul>
                        <p>Las solicitudes deberán realizarse exclusivamente a través de los canales oficiales de soporte.</p>
                        <p>InquiCheck podrá proceder a la eliminación, anonimización o desvinculación de los datos, conforme a la normativa vigente y preservando información estadística o histórica no identificable cuando corresponda.</p>
                    </Section>

                    <Section number="9" title="Canal de soporte">
                        <p>InquiCheck pone a disposición un canal de soporte oficial para:</p>
                        <ul>
                            <li>Consultas generales</li>
                            <li>Solicitudes de corrección de datos</li>
                            <li>Solicitudes de eliminación de información</li>
                            <li>Reporte de usos indebidos</li>
                        </ul>
                        <p>Toda solicitud será registrada y evaluada dentro de plazos razonables.</p>
                    </Section>

                    <Section number="10" title="Sanciones por incumplimiento">
                        <p>El incumplimiento de estos términos podrá derivar en:</p>
                        <ul>
                            <li>Suspensión inmediata del acceso</li>
                            <li>Cancelación definitiva de la cuenta</li>
                            <li>Pérdida de beneficios adquiridos</li>
                            <li>Inicio de acciones legales si correspondiera</li>
                        </ul>
                        <p><strong>InquiCheck se reserva el derecho de actuar ante cualquier uso indebido del sistema.</strong></p>
                    </Section>

                    <Section number="11" title="Modificaciones">
                        <p>InquiCheck podrá modificar estos Términos y Condiciones cuando lo considere necesario.<br />
                            El uso continuado de la plataforma implica la aceptación de las versiones vigentes.</p>
                    </Section>

                    <Section number="12" title="Aceptación expresa">
                        <p>Al marcar la casilla de aceptación y continuar utilizando la plataforma, el usuario declara haber leído, comprendido y aceptado la totalidad de estos Términos y Condiciones.</p>
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
                            ¿Tenés dudas sobre estos términos?
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

function Section({ number, title, children }) {
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
                {number}. {title}
            </h2>
            <div style={{ paddingLeft: '1rem' }}>
                {children}
            </div>
        </section>
    );
}
