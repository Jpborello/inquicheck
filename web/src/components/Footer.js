export default function Footer() {
    return (
        <footer style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '3rem 0', marginTop: 'auto' }}>
            <div className="container">
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <h3 style={{ marginBottom: '1rem' }}>InquiCheck</h3>
                        <p style={{ opacity: 0.8, maxWidth: '400px' }}>
                            Plataforma de verificación de inquilinos segura, confiable y conectada con fuentes oficiales.
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 'bold' }}>Fuentes Oficiales</p>
                        <div className="flex" style={{ justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                            <span>AFIP</span>
                            <span>|</span>
                            <span>Poder Judicial</span>
                            <span>|</span>
                            <span>BCRA</span>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', opacity: 0.6 }}>
                    <p>&copy; {new Date().getFullYear()} InquiCheck. Todos los derechos reservados.</p>
                    <div className="flex gap-md">
                        <span>Términos y Condiciones</span>
                        <span>Política de Privacidad</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
