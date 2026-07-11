import { pdf } from '@react-pdf/renderer';
import ConsentDocument from '@/components/ConsentDocument';

/**
 * Genera y descarga el PDF del documento de consentimiento
 * @param {Object} agencyData - Datos de la inmobiliaria/propietario
 * @param {Object} tenantData - Datos del inquilino
 */
export async function generateConsentPDF(agencyData, tenantData) {
    try {
        // Generar el blob del PDF
        const blob = await pdf(
            <ConsentDocument agencyData={agencyData} tenantData={tenantData} />
        ).toBlob();

        // Crear nombre del archivo con DNI y fecha
        const date = new Date().toISOString().split('T')[0];
        const dni = tenantData.dni || 'SinDNI';
        const fileName = `Consentimiento_InquiScore_${dni}_${date}.pdf`;

        // Crear link temporal y descargar
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        // Limpiar
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        return { success: true, fileName };
    } catch (error) {
        console.error('Error generando PDF:', error);
        return { success: false, error: error.message };
    }
}
