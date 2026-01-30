import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <Hero />

      <main style={{ flex: 1 }}>
        {/* Features / How it works */}
        <section id="como-funciona" className="section container text-center">
          <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '3rem' }}>
            Tomá decisiones seguras antes de alquilar
          </h2>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { title: '1. Enviás la solicitud', text: 'Cargá los datos del inquilino.', icon: '✉️' },
              { title: '2. El inquilino autoriza', text: 'Recibí el formulario y da su consentimiento.', icon: '📱' },
              { title: '3. Recibís el informe', text: 'Te enviamos un informe completo.', icon: '📄' }
            ].map((step, i) => (
              <div key={i} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{step.icon}</div>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{step.title}</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Plans / Services */}
        <section id="planes" style={{ background: '#e9ecef' }} className="section">
          <div className="container">
            <h2 className="text-center" style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
              Nuestros Planes
            </h2>
            <p className="text-center" style={{ color: '#666', marginBottom: '3rem', fontSize: '1.1rem' }}>
              Elegí el plan que mejor se adapte a tus necesidades
            </p>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Informe Básico */}
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                borderTop: '6px solid #3b82f6'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                  <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>Informe Básico</h3>
                  <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Información esencial para consultas rápidas</p>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#3b82f6' }}>ARS 4.000</div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>por consulta</div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 auto 0', flex: 1 }}>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span>Identidad verificada (DNI/CUIT)</span>
                  </li>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span>Score general de riesgo (1-5)</span>
                  </li>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span>Cantidad de registros históricos</span>
                  </li>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span>Estado de garantes</span>
                  </li>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span>Acceso a info. compartida</span>
                  </li>
                </ul>
                <a href="/pricing" className="btn" style={{
                  width: '100%',
                  marginTop: '1.5rem',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.875rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                  transition: 'all 0.2s'
                }}>
                  Ver Más
                </a>
              </div>

              {/* Informe Plus */}
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                borderTop: '6px solid #667eea',
                position: 'relative',
                transform: 'scale(1.05)',
                zIndex: 2
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  padding: '0.4rem 1rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.4)'
                }}>
                  Más Popular
                </div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
                  <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>Informe Plus</h3>
                  <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Análisis detallado para decisiones críticas</p>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#667eea' }}>ARS 8.000</div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>por consulta</div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 auto 0', flex: 1 }}>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span style={{ fontWeight: 600 }}>Todo lo del Informe Básico</span>
                  </li>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span>Sub-scores detallados (Pagos, Comportamiento, Estado inmueble)</span>
                  </li>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span>Historial cronológico completo</span>
                  </li>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span>Datos con consentimiento firmado</span>
                  </li>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span>Mayor nivel de detalle</span>
                  </li>
                </ul>
                <a href="/pricing" className="btn" style={{
                  width: '100%',
                  marginTop: '1.5rem',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.875rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                  transition: 'all 0.2s'
                }}>
                  Ver Más
                </a>
              </div>

              {/* Plan Inmobiliarias */}
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                borderTop: '6px solid #10b981'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
                  <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>Plan Inmobiliarias</h3>
                  <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Solución completa para inmobiliarias</p>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10b981' }}>ARS 40.000</div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>por mes</div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 auto 0', flex: 1 }}>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span style={{ fontWeight: 600 }}>Consultas ilimitadas</span>
                  </li>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span>Gestión completa de inquilinos</span>
                  </li>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span>Carga de historial con puntajes</span>
                  </li>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span>Acceso a base de datos compartida</span>
                  </li>
                  <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                    <span>Badge "Entidad Verificada"</span>
                  </li>
                </ul>
                <a href="/pricing" className="btn" style={{
                  width: '100%',
                  marginTop: '1.5rem',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.875rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                  transition: 'all 0.2s'
                }}>
                  Ver Más
                </a>
              </div>
            </div>

            {/* CTA adicional */}
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#444' }}>
                ¿Necesitás más información sobre nuestros planes?
              </p>
              <a href="/pricing" className="btn btn-primary" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)'
              }}>
                Ver Todos los Detalles
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
