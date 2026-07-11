import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos del documento
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 10,
        fontFamily: 'Helvetica',
        lineHeight: 1.5,
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 11,
        marginBottom: 15,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    text: {
        fontSize: 10,
        marginBottom: 5,
        textAlign: 'justify',
    },
    fieldLabel: {
        fontSize: 10,
        marginBottom: 3,
        marginTop: 8,
    },
    fieldValue: {
        fontSize: 10,
        borderBottom: '1 solid #000',
        paddingBottom: 2,
        marginBottom: 8,
    },
    checkbox: {
        fontSize: 10,
        marginBottom: 5,
    },
    list: {
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    listItem: {
        fontSize: 10,
        marginBottom: 3,
    },
    signatureSection: {
        marginTop: 30,
        marginBottom: 20,
    },
    signatureBox: {
        marginTop: 20,
        marginBottom: 10,
    },
    signatureLine: {
        borderTop: '1 solid #000',
        width: '60%',
        marginTop: 40,
        marginBottom: 3,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        fontSize: 8,
        color: '#666',
    },
    bold: {
        fontWeight: 'bold',
    },
});

const ConsentDocument = ({ agencyData = {}, tenantData = {} }) => {
    // Fecha actual formateada
    const currentDate = new Date().toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* HEADER */}
                <View style={styles.header}>
                    <Text style={styles.title}>CONSENTIMIENTO DE REGISTRO Y VERIFICACIÓN DE INQUILINO</Text>
                    <Text style={styles.subtitle}>Plataforma InquiScore</Text>
                    <Text style={styles.fieldValue}>
                        Lugar y fecha: {agencyData.city || '_______________________'}, {currentDate}
                    </Text>
                </View>

                {/* SECCIÓN 1: DATOS DE LA ENTIDAD */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. DATOS DE LA ENTIDAD / PROPIETARIO SOLICITANTE</Text>

                    <Text style={styles.text}>Tipo de solicitante (marcar lo que corresponda):</Text>
                    <Text style={styles.checkbox}>☐ Inmobiliaria</Text>
                    <Text style={styles.checkbox}>☐ Propietario / Dueño directo</Text>

                    <Text style={styles.fieldLabel}>Nombre completo / Razón social:</Text>
                    <Text style={styles.fieldValue}>{agencyData.name || ''}</Text>

                    <Text style={styles.fieldLabel}>CUIT / DNI:</Text>
                    <Text style={styles.fieldValue}>{agencyData.cuit || ''}</Text>

                    <Text style={styles.fieldLabel}>Domicilio:</Text>
                    <Text style={styles.fieldValue}>{agencyData.address || ''}</Text>

                    <Text style={styles.fieldLabel}>Teléfono:</Text>
                    <Text style={styles.fieldValue}>{agencyData.phone || ''}</Text>

                    <Text style={styles.fieldLabel}>Correo electrónico:</Text>
                    <Text style={styles.fieldValue}>{agencyData.email || ''}</Text>

                    <Text style={styles.fieldLabel}>Nombre y apellido del responsable:</Text>
                    <Text style={styles.fieldValue}>{agencyData.responsibleName || ''}</Text>
                </View>

                {/* SECCIÓN 2: DATOS DEL INQUILINO */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. DATOS DEL INQUILINO</Text>

                    <Text style={styles.fieldLabel}>Nombre y apellido:</Text>
                    <Text style={styles.fieldValue}>
                        {tenantData.first_name && tenantData.last_name
                            ? `${tenantData.first_name} ${tenantData.last_name}`
                            : ''}
                    </Text>

                    <Text style={styles.fieldLabel}>DNI / CUIT:</Text>
                    <Text style={styles.fieldValue}>{tenantData.dni || ''}</Text>

                    <Text style={styles.fieldLabel}>Fecha de nacimiento:</Text>
                    <Text style={styles.fieldValue}>{tenantData.birthdate || ''}</Text>

                    <Text style={styles.fieldLabel}>Domicilio actual:</Text>
                    <Text style={styles.fieldValue}>{tenantData.address || ''}</Text>

                    <Text style={styles.fieldLabel}>Teléfono:</Text>
                    <Text style={styles.fieldValue}>{tenantData.phone || ''}</Text>

                    <Text style={styles.fieldLabel}>Correo electrónico:</Text>
                    <Text style={styles.fieldValue}>{tenantData.email || ''}</Text>
                </View>

                {/* SECCIÓN 3: OBJETO DEL CONSENTIMIENTO */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. OBJETO DEL CONSENTIMIENTO</Text>
                    <Text style={styles.text}>
                        Por medio del presente documento, el/la inquilino/a identificado/a precedentemente autoriza de manera expresa,
                        libre e informada a que sus datos personales sean verificados, registrados y utilizados dentro de la plataforma
                        InquiScore, con la finalidad de evaluación locativa y generación de un score de riesgo.
                    </Text>
                </View>

                {/* SECCIÓN 4: ALCANCE DE LA AUTORIZACIÓN */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4. ALCANCE DE LA AUTORIZACIÓN</Text>
                    <Text style={styles.text}>El/la inquilino/a autoriza a que InquiScore pueda:</Text>
                    <View style={styles.list}>
                        <Text style={styles.listItem}>• Verificar antecedentes públicos disponibles legalmente</Text>
                        <Text style={styles.listItem}>• Registrar historial de alquileres y referencias locativas</Text>
                        <Text style={styles.listItem}>• Evaluar cumplimiento de obligaciones locativas (pagos, comportamiento, entrega del inmueble)</Text>
                        <Text style={styles.listItem}>• Generar un score de riesgo con fines exclusivamente locativos</Text>
                        <Text style={styles.listItem}>• Almacenar dicha información en una base de datos privada y no pública</Text>
                        <Text style={styles.listItem}>
                            • Permitir la consulta de dicha información únicamente a entidades privadas habilitadas
                            (inmobiliarias o propietarios), dentro de la plataforma
                        </Text>
                    </View>
                    <Text style={styles.text}>
                        En ningún caso la información será de acceso público ni utilizada con fines ajenos a la evaluación de alquileres.
                    </Text>
                </View>
            </Page>

            {/* PÁGINA 2 */}
            <Page size="A4" style={styles.page}>
                {/* SECCIÓN 5: FINALIDAD DEL SISTEMA */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>5. FINALIDAD DEL SISTEMA</Text>
                    <Text style={styles.text}>El/la inquilino/a declara conocer que InquiScore:</Text>
                    <View style={styles.list}>
                        <Text style={styles.listItem}>• No es un sistema de castigo ni una lista negra</Text>
                        <Text style={styles.listItem}>• No reemplaza decisiones humanas ni profesionales</Text>
                        <Text style={styles.listItem}>
                            • Tiene como finalidad agilizar procesos, reducir riesgos y generar confianza en el mercado de alquileres
                        </Text>
                        <Text style={styles.listItem}>
                            • La información registrada tiene carácter orientativo y se utiliza como apoyo para la toma de decisiones
                        </Text>
                    </View>
                </View>

                {/* SECCIÓN 6: PROTECCIÓN DE DATOS PERSONALES */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>6. PROTECCIÓN DE DATOS PERSONALES</Text>
                    <Text style={styles.text}>
                        Los datos personales serán tratados conforme a la normativa vigente en materia de protección de datos personales.
                    </Text>
                    <Text style={styles.text}>El/la inquilino/a tiene derecho a:</Text>
                    <View style={styles.list}>
                        <Text style={styles.listItem}>• Acceder a su información</Text>
                        <Text style={styles.listItem}>• Solicitar la rectificación de datos incorrectos</Text>
                        <Text style={styles.listItem}>• Solicitar la supresión de sus datos personales</Text>
                    </View>
                    <Text style={styles.text}>
                        Las solicitudes deberán realizarse a través de los canales oficiales de soporte de InquiScore.
                    </Text>
                </View>

                {/* SECCIÓN 7: CONFIDENCIALIDAD */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>7. CONFIDENCIALIDAD</Text>
                    <Text style={styles.text}>
                        La información registrada en InquiScore es estrictamente confidencial. Se encuentra prohibida su divulgación,
                        reproducción o uso fuera de la plataforma.
                    </Text>
                </View>

                {/* SECCIÓN 8: VIGENCIA */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>8. VIGENCIA</Text>
                    <Text style={styles.text}>
                        El presente consentimiento tendrá vigencia desde la fecha de su firma y mientras la información resulte relevante
                        para fines locativos, sin perjuicio del derecho del/la inquilino/a a solicitar su eliminación conforme a la ley.
                    </Text>
                </View>

                {/* SECCIÓN 9: ACEPTACIÓN Y FIRMA */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>9. ACEPTACIÓN Y FIRMA</Text>
                    <Text style={styles.text}>
                        Habiendo leído y comprendido el presente documento, las partes firman en conformidad.
                    </Text>
                </View>

                {/* FIRMAS */}
                <View style={styles.signatureSection}>
                    <View style={styles.signatureBox}>
                        <Text style={[styles.text, styles.bold]}>FIRMA DEL INQUILINO</Text>
                        <View style={styles.signatureLine}></View>
                        <Text style={styles.fieldLabel}>Firma</Text>
                        <Text style={styles.fieldLabel}>Aclaración: _______________________________</Text>
                        <Text style={styles.fieldLabel}>DNI: _______________________________</Text>
                    </View>

                    <View style={styles.signatureBox}>
                        <Text style={[styles.text, styles.bold]}>FIRMA DE LA ENTIDAD / PROPIETARIO</Text>
                        <View style={styles.signatureLine}></View>
                        <Text style={styles.fieldLabel}>Firma</Text>
                        <Text style={styles.fieldLabel}>Aclaración: _______________________________</Text>
                        <Text style={styles.fieldLabel}>Cargo (si corresponde): _______________________________</Text>
                    </View>
                </View>

                {/* FOOTER */}
                <View style={styles.footer}>
                    <Text style={styles.bold}>PLATAFORMA INQUISCORE</Text>
                    <Text>
                        Este documento forma parte del sistema InquiScore y respalda el consentimiento para la verificación
                        y registro de datos con fines locativos.
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default ConsentDocument;
