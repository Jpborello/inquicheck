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
            <h2 className="text-center" style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '3rem' }}>
              Nuestros Servicios
            </h2>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {/* Plan Card Mockups */}
              {['Informe Básico', 'Informe Plus', 'Plan Inmobiliarias'].map((plan, i) => (
                <div key={i} style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                  borderTop: `6px solid ${i === 2 ? 'var(--color-primary)' : 'var(--color-secondary)'}`
                }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{plan}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', margin: '0 0 2rem 0' }}>
                    <li style={{ marginBottom: '0.5rem' }}>✓ Identidad</li>
                    <li style={{ marginBottom: '0.5rem' }}>✓ Antecedentes</li>
                    <li style={{ marginBottom: '0.5rem' }}>✓ Score de Riesgo</li>
                  </ul>
                  <button className="btn btn-primary" style={{ width: '100%' }}>Ver Más</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
