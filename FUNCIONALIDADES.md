# InquiScore - Documentación de Funcionalidades

> Plataforma de Verificación de Inquilinos | Sistema Completo de Evaluación Locativa

---

## 📋 Tabla de Contenidos

1. [Web Pública](#web-pública)
2. [Sistema de Autenticación](#sistema-de-autenticación)
3. [Panel de Administración](#panel-de-administración)
4. [Sistema de Scoring](#sistema-de-scoring)
5. [Base de Datos](#base-de-datos)

---

## 🌐 Web Pública

### Página Principal (Home)

**Ubicación:** `/`

#### Componentes:
- **Navbar**
  - Logo de InquiScore con fondo transparente
  - Enlaces navegación: Cómo Funciona, Planes, Preguntas Frecuentes
  - Botón "Ingresar" al sistema
  
- **Hero Section**
  - Imagen de fondo difuminada (hero_real_estate.png)
  - Título principal con llamado a la acción
  - Botón naranja "Solicitar Informe" (gradiente #f59e0b → #d97706)
  - Botón secundario "Cómo funciona"
  - Trust badges: Identidad Validada, Antecedentes Judiciales, Situación Laboral

- **Sección "Cómo Funciona"**
  - 3 pasos ilustrados:
    1. ✉️ Enviás la solicitud
    2. 📱 El inquilino autoriza
    3. 📄 Recibís el informe

- **Sección "Nuestros Planes"**
  - 3 tarjetas de planes con precios y características:
    - **Informe Básico** - ARS 4.000
    - **Informe Plus** - ARS 8.000 (destacado como "Más Popular")
    - **Plan Inmobiliarias** - ARS 40.000/mes
  - Cada card incluye:
    - Icono distintivo
    - Precio prominente
    - Lista de características detalladas
    - Botón naranja "Ver Más" → redirige a `/pricing`
  - CTA adicional al final para ver todos los detalles

- **Footer**
  - Logo en blanco (invertido)
  - Descripción de la plataforma
  - Fuentes oficiales: AFIP, Poder Judicial, BCRA
  - Links legales:
    - Términos y Condiciones → `/terms`
    - Política de Privacidad → `/privacy`
    - Soporte
  - Copyright

---

### Página de Pricing

**Ubicación:** `/pricing`

#### Características:
- **Header/Navbar Premium**
  - Logo transparente
  - Enlaces: Inicio, Planes, Ingresar
  - Botón glassmorphism para login

- **Hero Section con Gradiente**
  - Fondo gradiente morado (#667eea → #764ba2)
  - Elementos decorativos borrosos
  - Título: "Elige el Plan Perfecto para Ti"
  - Descripción de valor

- **Cards de Planes Detalladas**
  - Layout responsive (grid auto-fit, 320px)
  - Cada plan incluye:
    - Badge "Más Popular" (solo Informe Plus)
    - Header con gradiente único por plan
    - Icono grande (📋 / ⭐ / 🏢)
    - Precio destacado
    - Lista completa de características
    - Effect hover (elevación y sombra)
  
  **Planes Específicos:**
  
  1. **Informe Básico - ARS 4.000**
     - Gradiente azul (#3b82f6 → #2563eb)
     - 6 características básicas
     - Ideal para consultas rápidas
  
  2. **Informe Plus - ARS 8.000** ⭐
     - Gradiente morado (#667eea → #764ba2)
     - 9 características avanzadas
     - Badge rotado "Más Popular"
     - Escala 1.05x
     - Border morado destacado
  
  3. **Plan Inmobiliarias - ARS 40.000/mes**
     - Gradiente verde (#10b981 → #059669)
     - 9 características empresariales
     - Consultas ilimitadas
     - Gestión completa

- **Sección CTA (Call to Action)**
  - 3 botones naranjas con gradiente:
    - 📝 **Solicitar Acceso** → #contacto
    - 💬 **Hablar con Nosotros** → WhatsApp
    - 🚀 **Quiero Probar el Sistema** → /login
  - Effects hover (elevación y sombra intensificada)

- **Footer Simplificado**
  - Logo en blanco
  - Descripción breve
  - Links navegación
  - Copyright

---

### Página de Términos y Condiciones

**Ubicación:** `/terms`

#### Estructura:
- **Header Premium**
  - Logo en blanco (invertido)
  - Gradiente morado (#667eea → #764ba2)
  - Título principal

- **12 Secciones Completas:**
  1. Finalidad del sistema
  2. Naturaleza de la información
  3. Confidencialidad y uso de la información
  4. Prohibición de usos indebidos
  5. Responsabilidad del usuario
  6. Datos aportados y veracidad
  7. Consentimiento y protección de datos personales
  8. Derecho de acceso, rectificación y supresión
  9. Canal de soporte
  10. Sanciones por incumplimiento
  11. Modificaciones
  12. Aceptación expresa

- **Formato:**
  - Cada sección con título en color morado (#667eea)
  - Line separadora
  - Contenido indentado
  - Listas con bullets
  - Texto en negrita para destacados

- **CTA al Final:**
  - "¿Tenés dudas sobre estos términos?"
  - Botón "Contactar Soporte"

---

### Página de Política de Privacidad

**Ubicación:** `/privacy`

#### Secciones:
1. Información que recopilamos
2. Cómo utilizamos tu información
3. Protección de datos
4. Compartición de datos
5. Consentimiento
6. Tus derechos (GDPR-style)
7. Cookies y tecnologías similares
8. Retención de datos
9. Menores de edad
10. Cambios en esta política
11. Contacto

**Formato:** Igual que T&C, estructura profesional

---

## 🔐 Sistema de Autenticación

### Página de Login

**Ubicación:** `/login`

#### Funcionalidad:
- Autenticación mediante **Supabase Auth**
- Formulario de login con:
  - Email
  - Password
  - Botón "Ingresar"
- Redirección automática a `/dashboard` después de login exitoso
- Manejo de errores de autenticación

---

## 👨‍💼 Panel de Administración (Dashboard)

### Dashboard Layout

**Ubicación:** `/dashboard/*`

#### Componentes Persistentes:

**Sidebar (Azul Oscuro)**
- Logo InquiScore en blanco
- Texto: "Panel Inmobiliaria"
- Navegación:
  - 👥 Mis Inquilinos → `/dashboard`
  - ➕ Nuevo Inquilino → `/dashboard/new-tenant`
  - 🏢 Perfil Agencia → `/dashboard/profile`
- Botón logout al final
- Estado activo visual (fondo semi-transparente)

**Header**
- Título dinámico según página
- Badge "Inmobiliaria Demo" (naranja)
- Borde inferior sutil

**Modal de Términos (Primera Vez)**
- Se muestra automáticamente al primer ingreso
- Detección mediante campo `terms_accepted_at` en base de datos
- Contenido:
  - Logo en blanco centrado
  - Título "Términos y Condiciones de Uso"
  - Puntos clave simplificados (6 bullets)
  - Advertencia importante (fondo amarillo)
  - Link a términos completos
  - Checkbox obligatorio
  - Botón naranja "Aceptar y Continuar" (deshabilitado hasta aceptar)
- Guarda fecha y versión de aceptación en DB
- No se vuelve a mostrar

---

### Dashboard Principal - Lista de Inquilinos

**Ubicación:** `/dashboard`

#### Características:

**Header Estadísticas**
- 3 tarjetas con gradientes:
  1. Total Inquilinos (gradiente azul)
  2. Tenants con Historial (gradiente morado)
  3. Score Promedio (gradiente verde)
- Íconos grandes
- Números destacados
- Efecto hover

**Barra de Búsqueda**
- Input con icono de lupa
- Búsqueda en tiempo real por:
  - Nombre
  - Apellido
  - DNI
  - Email
- Efecto focus con borde morado

**Cards de Inquilinos**
- Layout: Grid responsive (3 columnas en desktop)
- Cada card incluye:
  - Header con gradiente según score:
    - Score 4-5: Verde (#10b981)
    - Score 3-3.9: Naranja (#f59e0b)
    - Score 1-2.9: Rojo (#ef4444)
  - Nombre completo en blanco
  - Estrellas según score (⭐)
  - DNI con icono 🆔
  - Email con icono 📧
  - Teléfono con icono 📱
  - Contador de registros históricos
  - Badge de estado de contrato:
    - Activo (verde)
    - Finalizado (gris)
    - Suspendido (rojo)
  - Botón "Ver Detalle" (outline blanco)
- Efecto hover: elevación y sombra
- Glassmorphism en el cuerpo

**Estado Vacío**
- Mensaje cuando no hay inquilinos
- Icono 📭
- Botón CTA "Agregar Primer Inquilino"

**Funcionalidad**
- Cálculo dinámico de scores desde historial
- Ordenamiento por fecha de creación (más recientes primero)
- Link a detalle: `/dashboard/tenant/[id]`

---

### Detalle de Inquilino

**Ubicación:** `/dashboard/tenant/[id]`

#### Estructura:

**Breadcrumb**
- "← Volver a Mis Inquilinos"
- Link funcional a `/dashboard`

**Header del Inquilino**
- Layout lado a lado:
  - **Izquierda:**
    - Nombre completo (grande, bold)
    - DNI con icono 🆔
    - Email con icono 📧
    - Teléfono con icono 📱
  - **Derecha:**
    - Badge "Score Total" con gradiente
    - Número gigante del score (color según valor)
    - Estrellas (cantidad según score)
    - Fondo con gradiente sutil

**4 Cards de Scores Detallados**
- Layout: Grid 2x2
- Cada card con gradiente único:
  1. 💰 **Score de Pagos** (Verde)
  2. ⚖️ **Comportamiento** (Azul)
  3. 🏠 **Cuidado del Inmueble** (Morado)
  4. 📊 **Promedio General** (Gradiente arcoíris)
- Icono grande
- Título
- Número destacado con color
- Efecto hover (elevación)

**Sección Historial de Alquileres**
- Header con:
  - Título "Historial de Alquileres"
  - Botón "+ Agregar Registro" → `/dashboard/add-history?tenant_id=[id]`

**Timeline Visual**
- Línea vertical continua (azul)
- Cada registro incluye:
  - Punto circular en la timeline
  - Card con glassmorphism
  - Header con gradiente según score
  - Información:
    - 📅 Periodo: Inicio - Fin (duración en meses)
    - 🏢 Agencia que reportó
    - Scores individuales:
      - 💳 Pagos: X/5
      - 😊 Comportamiento: X/5
      - 🏠 Estado: X/5
    - 💬 Comentarios (si hay)
- Orden cronológico (más reciente arriba)

**Estado Vacío**
- "📝 No hay registros de alquileres previos"
- Sugerencia de agregar primer registro

**Cálculo Dinámico de Scores**
- Scores calculados en tiempo real desde historial
- Promedio de todos los registros
- Fórmula: `(sum of scores) / (count of records)`
- Si no hay historial: Score = 0

---

### Agregar Nuevo Inquilino

**Ubicación:** `/dashboard/new-tenant`

#### Formulario:
- **Campos:**
  - Nombre (text, requerido)
  - Apellido (text, requerido)
  - DNI (text, requerido, único)
  - Email (email, requerido)
  - Teléfono (text, requerido)
  - Estado de Contrato (select):
    - Activo
    - Finalizado
    - Suspendido

- **Validación:**
  - Todos los campos obligatorios
  - DNI único en sistema
  - Email válido

- **Funcionalidad:**
  - Inserta en tabla `tenants`
  - Asocia con agencia actual (`agency_id`)
  - Redirecciona a `/dashboard` después de crear

---

### Agregar Historial de Alquiler

**Ubicación:** `/dashboard/add-history`

#### Query Params:
- `tenant_id` (opcional): Pre-selecciona inquilino

#### Formulario:
- **Selección de Inquilino**
  - Dropdown con todos los inquilinos
  - Muestra: Nombre + Apellido + DNI
  - Pre-seleccionado si viene de detalle

- **Período de Alquiler**
  - Fecha inicio (date, requerido)
  - Fecha fin (date, requerido)

- **Scores (1-5)**
  - 💳 Score de Pagos (number, 1-5)
  - 😊 Score de Comportamiento (number, 1-5)
  - 🏠 Score de Estado del Inmueble (number, 1-5)

- **Comentarios**
  - Textarea opcional
  - Para observaciones adicionales

- **Botones:**
  - "Guardar Registro" (primario)
  - "Cancelar" (secondary)

- **Funcionalidad:**
  - Inserta en tabla `rental_history`
  - Asocia con agencia actual
  - Vincula con tenant seleccionado
  - Redirecciona a detalle del inquilino

---

### Perfil de Agencia

**Ubicación:** `/dashboard/profile`

#### Información Mostrada:
- Nombre de la agencia
- Email de contacto
- Teléfono
- CUIT
- Dirección
- Ciudad
- Provincia

**Estado Actual:** Vista de solo lectura (placeholder)

**Funcionalidad Futura:**
- Edición de perfil
- Cambio de logo
- Configuración de preferencias

---

## 📊 Sistema de Scoring

### Metodología de Cálculo

#### Score Total
```javascript
totalScore = (paymentScore + behaviorScore + careScore) / 3
```

#### Score Individual (Por Categoría)
```javascript
categoryScore = sum(all_scores_in_category) / count(records)
```

### Categorías de Evaluación

1. **💰 Pagos (Payment Score)**
   - Cumplimiento de pagos
   - Puntualidad
   - Historial de atrasos
   - Escala: 1-5

2. **⚖️ Comportamiento (Behavior Score)**
   - Convivencia
   - Respeto a normas
   - Relación con vecinos
   - Escala: 1-5

3. **🏠 Cuidado del Inmueble (Care Score)**
   - Estado de entrega
   - Mantenimiento
   - Daños reportados
   - Escala: 1-5

### Interpretación de Scores

- **4.0 - 5.0**: ⭐⭐⭐⭐⭐ Excelente (Verde)
- **3.0 - 3.9**: ⭐⭐⭐⭐ Bueno (Naranja)
- **1.0 - 2.9**: ⭐⭐⭐ Regular (Rojo)
- **0**: Sin historial

### Visualización
- Colores dinámicos según rango
- Gradientes en UI
- Estrellas visuales
- Badges con estado

---

## 🗄️ Base de Datos (Supabase)

### Estructura de Tablas

#### `agencies`
```sql
- id (uuid, PK)
- email (text, unique)
- name (text)
- phone (text)
- cuit (text)
- address (text)
- city (text)
- province (text)
- created_at (timestamp)
- terms_accepted_at (timestamp) -- NEW
- terms_version (varchar) -- NEW
```

#### `tenants`
```sql
- id (uuid, PK)
- agency_id (uuid, FK → agencies)
- first_name (text)
- last_name (text)
- dni (text, unique)
- email (text)
- phone (text)
- contract_status (text)
  - 'Activo'
  - 'Finalizado'
  - 'Suspendido'
- created_at (timestamp)
```

#### `rental_history`
```sql
- id (uuid, PK)
- tenant_id (uuid, FK → tenants)
- agency_id (uuid, FK → agencies)
- start_date (date)
- end_date (date)
- payment_score (integer, 1-5)
- behavior_score (integer, 1-5)
- care_score (integer, 1-5)
- comments (text, nullable)
- created_at (timestamp)
```

### Relaciones

```
agencies (1) -----> (N) tenants
agencies (1) -----> (N) rental_history
tenants (1) ------> (N) rental_history
```

### Índices
- `idx_tenants_agency_id` en `tenants(agency_id)`
- `idx_tenants_dni` en `tenants(dni)`
- `idx_rental_history_tenant_id` en `rental_history(tenant_id)`
- `idx_agencies_terms_accepted` en `agencies(terms_accepted_at)`

---

## 🎨 Diseño y UX

### Paleta de Colores

**Principales:**
- Azul Primario: `#1d3557`
- Azul Secundario: `#457b9d`
- Naranja Accent: `#f59e0b` → `#d97706` (gradiente)

**Gradientes de Scores:**
- Verde: `#10b981` → `#059669`
- Naranja: `#f59e0b` → `#d97706`
- Rojo: `#ef4444` → `#dc2626`
- Azul: `#3b82f6` → `#2563eb`
- Morado: `#667eea` → `#764ba2`

**Neutrales:**
- Fondo: `#f8f9fa`
- Texto Principal: `#1a1a1a`
- Texto Secundario: `#666`
- Bordes: `#dee2e6`

### Componentes de Diseño

**Botones:**
- Primarios: Gradiente naranja con sombra
- Secondary: Outline blanco/azul
- Hover: Elevación + sombra intensificada

**Cards:**
- Border radius: `var(--radius-lg)` (12px)
- Box shadow: Sutil con blur
- Hover: Transform translateY(-4px)
- Glassmorphism: `backdrop-filter: blur(10px)`

**Tipografía:**
- Fuente: System font stack
- Headers: Font-weight 700-800
- Body: Font-weight 400
- Números grandes: Font-weight 800

**Efectos:**
- Transiciones: `0.2s - 0.3s`
- Hover effects en todos los elementos interactivos
- Gradientes suaves
- Sombras con blur

---

## 📱 Responsive Design

- **Mobile First**: Design adaptado a móviles
- **Breakpoints**: Auto-fit grids con minmax
- **Cards**: Stack en móvil, grid en desktop
- **Navbar**: Mantiene funcionalidad en mobile
- **Sidebar**: Fixed en desktop

---

## 🔒 Seguridad

### Autenticación
- Supabase Auth con JWT
- Session management automático
- Protected routes en dashboard

### Datos
- Row Level Security (RLS) en Supabase
- Queries filtradas por `agency_id`
- Validación de datos en cliente y servidor

### Términos y Condiciones
- Aceptación obligatoria al primer ingreso
- Tracking de versión aceptada
- Timestamp de aceptación
- Modal no eludible

---

## 📄 Páginas Legales

### Términos y Condiciones (`/terms`)
- 12 secciones completas
- Cobertura legal exhaustiva
- Diseño profesional con gradientes
- Link al footer

### Política de Privacidad (`/privacy`)
- Conforme a normativas de protección de datos
- Derechos del usuario (GDPR-style)
- Explicación clara de uso de datos
- Link al footer

### Footer Links
- Términos y Condiciones
- Política de Privacidad
- Soporte (placeholder)

---

## 🚀 Features Destacadas

### ✅ Implementado

1. **Sistema de Scoring Dinámico**
   - Cálculo en tiempo real
   - Múltiples categorías
   - Visualización colorida

2. **Dashboard Premium**
   - Diseño moderno con gradientes
   - Cards visuales
   - Timeline interactiva
   - Estadísticas en tiempo real

3. **Pricing Page Completa**
   - 3 planes detallados
   - Badge "Más Popular"
   - CTAs naranjas
   - Diseño responsive

4. **Sistema Legal Completo**
   - T&C con 12 secciones
   - Política de privacidad
   - Modal de aceptación obligatoria
   - Tracking en base de datos

5. **Branding Profesional**
   - Logo en toda la aplicación
   - Versión transparente para navbars
   - Versión invertida (blanca) para fondos oscuros
   - Consistencia visual

6. **UX Mejorada**
   - Búsqueda en tiempo real
   - Filtros dinámicos
   - Feedback visual
   - Animaciones suaves

---

## 📝 Funcionalidades Core

### Para Inmobiliarias

- ✅ Registro y login
- ✅ Gestión de inquilinos (CRUD)
- ✅ Carga de historial de alquileres
- ✅ Visualización de scores
- ✅ Dashboard con estadísticas
- ✅ Búsqueda y filtrado
- ✅ Timeline de historial

### Para Propietarios (Futuro)

- ⏳ Consulta de informes
- ⏳ Pago de informes
- ⏳ Solicitud de verificación
- ⏳ Dashboard simplificado

### Administrativo

- ✅ Sistema de scoring automático
- ✅ Base de datos compartida
- ✅ Tracking de términos aceptados
- ✅ Multi-agencia support
- ⏳ Auditoría de datos
- ⏳ Sistema de reportes

---

## 🎯 Roadmap Futuro

### Fase 2
- [ ] Integración de pagos (Mercado Pago)
- [ ] Sistema de notificaciones
- [ ] Exportación de informes PDF
- [ ] API pública para integraciones
- [ ] App móvil

### Fase 3
- [ ] Machine Learning para predicciones
- [ ] Verificación con fuentes oficiales (AFIP, etc.)
- [ ] Sistema de scoring más sofisticado
- [ ] Multi-idioma
- [ ] Whitelabel para franquicias

---

**Documento actualizado:** Enero 2026  
**Versión del Sistema:** 1.0  
**Autor:** InquiScore Team
