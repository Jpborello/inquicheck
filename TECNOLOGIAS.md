# InquiCheck - Stack Tecnológico

> Documentación completa de todas las tecnologías, librerías y herramientas utilizadas

---

## 📋 Tabla de Contenidos

1. [Framework y Runtime](#framework-y-runtime)
2. [Base de Datos](#base-de-datos)
3. [Autenticación](#autenticación)
4. [Styling y UI](#styling-y-ui)
5. [Herramientas de Desarrollo](#herramientas-de-desarrollo)
6. [Deployment y Hosting](#deployment-y-hosting)
7. [Control de Versiones](#control-de-versiones)
8. [Assets y Recursos](#assets-y-recursos)

---

## 🚀 Framework y Runtime

### Next.js 16.1.6
**Rol:** Framework principal de React

**Características utilizadas:**
- ✅ App Router (nueva arquitectura de Next.js)
- ✅ Server Components y Client Components (`'use client'`)
- ✅ File-based routing
- ✅ Dynamic routes (`[id]`)
- ✅ Built-in Image optimization
- ✅ API Routes (futuro)
- ✅ Turbopack (bundler rápido)

**Por qué Next.js:**
- SSR (Server Side Rendering) para SEO
- Rutas automáticas basadas en archivos
- Optimización automática de imágenes
- Hot Module Replacement ultra rápido
- Excelente DX (Developer Experience)

**Configuración:**
```javascript
// next.config.js
const nextConfig = {};
module.exports = nextConfig;
```

---

### React 19
**Rol:** Librería UI principal

**Características utilizadas:**
- ✅ Functional Components
- ✅ Hooks:
  - `useState` - Estado local
  - `useEffect` - Efectos secundarios
  - `useRouter` - Navegación
  - `usePathname` - Ruta actual
- ✅ Props y composición
- ✅ Conditional rendering
- ✅ Lists y keys
- ✅ Event handlers

**Patrón de código:**
```javascript
'use client';
import { useState, useEffect } from 'react';

export default function Component() {
    const [state, setState] = useState(initialValue);
    
    useEffect(() => {
        // Side effects
    }, [dependencies]);
    
    return <div>...</div>;
}
```

---

### Node.js
**Versión recomendada:** 18.x o superior

**Uso:**
- Runtime de JavaScript en servidor
- Package management con npm
- Scripts de build y desarrollo

---

## 🗄️ Base de Datos

### Supabase
**Rol:** Backend as a Service (BaaS)

**Componentes utilizados:**

#### 1. **Supabase Database (PostgreSQL)**
- Base de datos relacional
- 3 tablas principales:
  - `agencies` - Inmobiliarias
  - `tenants` - Inquilinos
  - `rental_history` - Historial de alquileres

**Características:**
- ✅ ACID compliance
- ✅ Relaciones FK (Foreign Keys)
- ✅ Índices para performance
- ✅ UUID como PKs
- ✅ Timestamps automáticos
- ✅ Trigger functions (futuro)

#### 2. **Supabase Auth**
- Sistema de autenticación integrado
- JWT (JSON Web Tokens)
- Session management
- Password hashing automático

**Métodos utilizados:**
```javascript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
    email, password
});

// Get user
const { data: { user } } = await supabase.auth.getUser();

// Logout
await supabase.auth.signOut();
```

#### 3. **Supabase Client** (`@supabase/supabase-js`)
**Versión:** Latest

**Configuración:**
```javascript
// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

**Operaciones:**
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Filtering con `.eq()`, `.in()`, etc.
- ✅ Ordering con `.order()`
- ✅ Joins con `.select('*, table(*)') `
- ✅ Row Level Security (RLS)

**Ejemplo de query:**
```javascript
const { data, error } = await supabase
    .from('tenants')
    .select(`
        *,
        rental_history (*)
    `)
    .eq('agency_id', userId)
    .order('created_at', { ascending: false });
```

---

## 🔐 Autenticación

### Supabase Auth
**Estrategia:** Email + Password

**Flow:**
1. Usuario ingresa credenciales en `/login`
2. Supabase valida y genera JWT
3. Token almacenado en localStorage
4. Protected routes verifican sesión
5. Auto-redirect si no autenticado

**Session Management:**
- Tokens se renuevan automáticamente
- Expiración configurable
- Refresh tokens para persistencia

---

## 🎨 Styling y UI

### CSS Vanilla + CSS Variables
**Enfoque:** CSS puro sin framework

**Ventajas:**
- ✅ Control total sobre estilos
- ✅ No hay conflictos de clases
- ✅ Bundle size mínimo
- ✅ Mejor performance

**CSS Variables utilizadas:**
```css
:root {
    --color-primary: #1d3557;
    --color-secondary: #457b9d;
    --color-accent: #f59e0b;
    --color-text-main: #1a1a1a;
    --color-text-muted: #666;
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
}
```

### Inline Styles (React)
**Uso:** Mayoría de componentes

**Razón:**
- Estilos dinámicos basados en props/state
- Evita colisión de nombres
- Co-location (estilos junto al componente)
- Type-safe con TypeScript (futuro)

**Ejemplo:**
```javascript
<div style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem',
    borderRadius: 'var(--radius-lg)',
    color: 'white'
}}>
    Content
</div>
```

### Gradientes
**Librería:** CSS Gradients nativos

**Paleta definida:**
- Verde: `linear-gradient(135deg, #10b981 0%, #059669 100%)`
- Naranja: `linear-gradient(135deg, #f59e0b 0%, #d97706 100%)`
- Azul: `linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`
- Morado: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

### Efectos Visuales

**Glassmorphism:**
```css
backdrop-filter: blur(10px);
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
```

**Box Shadows:**
```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2); /* highlighted */
```

**Transitions:**
```css
transition: all 0.2s ease-in-out;
```

---

## 🛠️ Herramientas de Desarrollo

### Package Manager: npm
**Versión:** Incluida con Node.js

**Scripts principales:**
```json
{
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### ESLint
**Rol:** Linter de código JavaScript/React

**Configuración:**
```json
{
  "extends": ["next/core-web-vitals"]
}
```

**Beneficios:**
- Detecta errores antes de runtime
- Enforce code style
- Best practices de React/Next.js

---

### Turbopack
**Rol:** Bundler ultra-rápido (reemplazo de Webpack)

**Características:**
- HMR (Hot Module Replacement) instantáneo
- Incremental builds
- Built-in en Next.js 16

**Uso:**
```bash
npm run dev # Automáticamente usa Turbopack
```

---

## 🚀 Deployment y Hosting

### Vercel
**Rol:** Platform as a Service (PaaS) para deployment

**Características:**
- ✅ Git integration (auto-deploy en push)
- ✅ Preview deployments en PRs
- ✅ CDN global
- ✅ SSL automático
- ✅ Edge functions
- ✅ Analytics
- ✅ Zero config para Next.js

**Proceso:**
1. Push a GitHub → main branch
2. Vercel detecta cambios
3. Build automático
4. Deploy a producción
5. URL: `inquicheck.vercel.app` (o dominio custom)

**Variables de Entorno:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

### Supabase Hosting
**Rol:** Backend hosting (BaaS)

**Componentes:**
- Database (PostgreSQL en AWS)
- Auth servers
- Storage (futuro)
- Edge Functions (futuro)

**Región:** Configurable (ej: South America)

---

## 📝 Control de Versiones

### Git
**Versión:** 2.x

**Workflow:**
- Main branch: Producción
- Feature branches para desarrollo
- Commits semánticos:
  - `feat:` Nueva funcionalidad
  - `fix:` Bug fix
  - `docs:` Documentación
  - `style:` Cambios de estilo
  - `refactor:` Refactoring

**Último commit:**
```bash
feat: Add pricing page, terms & conditions, brand logo, and UI enhancements
```

### GitHub
**Rol:** Remote repository hosting

**Features utilizadas:**
- Repository hosting
- Integration con Vercel
- Auto-deploy triggers

---

## 🎨 Assets y Recursos

### Imágenes

**Logo:**
- `public/logo.png` - Logo original con fondo
- `public/logo-transparent.png` - Logo sin fondo para navbars

**Hero Image:**
- `public/hero_real_estate.png` - Imagen de fondo del Hero

**Formato:** PNG con transparencia

**Optimización:**
- Next.js Image component (futuro)
- Compresión automática en build

---

### Fuentes

**System Font Stack:**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
             'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
             sans-serif;
```

**Ventajas:**
- No requiere descargas
- Performance óptima
- Aspecto nativo en cada OS

---

## 🔧 Configuración del Proyecto

### Variables de Entorno

**Archivo:** `.env.local`

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**Prefijo `NEXT_PUBLIC_`:**
- Expone variables al cliente (browser)
- Necesario para Supabase client

---

### Estructura de Carpetas

```
inquiCheck/
├── public/                 # Assets estáticos
│   ├── logo.png
│   ├── logo-transparent.png
│   └── hero_real_estate.png
├── src/
│   ├── app/               # App Router de Next.js
│   │   ├── page.js        # Home (/)
│   │   ├── login/
│   │   ├── pricing/
│   │   ├── terms/
│   │   ├── privacy/
│   │   └── dashboard/
│   │       ├── layout.js  # Dashboard layout
│   │       ├── page.js    # Lista inquilinos
│   │       ├── new-tenant/
│   │       ├── add-history/
│   │       └── tenant/[id]/
│   ├── components/        # Componentes reusables
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── Hero.js
│   │   └── TermsModal.js
│   ├── lib/               # Utilidades
│   │   └── supabaseClient.js
│   └── styles/
│       └── globals.css    # CSS global
├── .env.local             # Variables de entorno
├── next.config.js         # Configuración de Next.js
├── package.json           # Dependencias
├── FUNCIONALIDADES.md     # Doc de features
└── TECNOLOGIAS.md         # Este archivo
```

---

## 📦 Dependencias (package.json)

### Producción
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x",
    "next": "16.1.6",
    "react": "^19.x",
    "react-dom": "^19.x"
  }
}
```

### Desarrollo
```json
{
  "devDependencies": {
    "eslint": "^9",
    "eslint-config-next": "16.1.6"
  }
}
```

---

## 🌐 Navegadores Soportados

### Desktop
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Mobile
- ✅ iOS Safari 14+
- ✅ Chrome Android 90+
- ✅ Samsung Internet 14+

---

## 🔒 Seguridad

### Implementaciones

**Frontend:**
- Environment variables ocultas del repo
- Client-side validation
- Protected routes con redirect

**Backend (Supabase):**
- Row Level Security (RLS)
- JWT verification
- Rate limiting
- SQL injection protection (parameterized queries)

**Best Practices:**
- No secrets en código
- HTTPS only en producción
- Secure cookies
- CORS configurado

---

## ⚡ Performance

### Optimizaciones

**Next.js:**
- Code splitting automático
- Tree shaking
- Minificación en build
- Static generation donde posible

**React:**
- Lazy loading de componentes (futuro)
- Memoization (futuro)
- Virtual scrolling para listas largas (futuro)

**Database:**
- Índices en columnas frecuentes
- Eager loading con joins
- Caching en cliente (useState)

**Assets:**
- Imágenes optimizadas
- Lazy loading de imágenes
- CDN de Vercel

---

## 🧪 Testing (Futuro)

### Frameworks Planeados

**Unit Testing:**
- Jest
- React Testing Library

**E2E Testing:**
- Playwright o Cypress

**Integration Testing:**
- Supabase Test DB

---

## 📊 Analytics (Futuro)

### Herramientas Potenciales

- Vercel Analytics (built-in)
- Google Analytics 4
- Mixpanel para eventos
- Sentry para error tracking

---

## 🔄 CI/CD

### Pipeline Actual

**Trigger:** Push a `main` branch

**Steps:**
1. GitHub recibe push
2. Webhook a Vercel
3. Vercel clona repo
4. `npm install`
5. `next build`
6. Deploy a CDN
7. Invalidate cache
8. Production URL live

**Tiempo:** ~2-3 minutos

---

## 📚 Documentación y Referencias

### Recursos Oficiales

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)

### Guías Internas

- `FUNCIONALIDADES.md` - Features del sistema
- `README.md` - Setup y onboarding
- `schema_init.sql` - Schema de base de datos

---

## 🚀 Upgrade Path

### Próximas Versiones

**Next.js:**
- Actualizar a versiones estables
- Adoptar nuevas features (Server Actions, etc.)

**React:**
- Usar nuevas APIs de React 19
- Concurrent rendering

**Supabase:**
- Realtime subscriptions
- Storage para archivos
- Edge Functions para logic compleja

---

## 🤝 Compatibilidad

### Versiones Mínimas

- Node.js: 18.17 o superior
- npm: 9.x o superior
- Git: 2.x

### Sistema Operativo

- ✅ Windows 10/11
- ✅ macOS 11+
- ✅ Linux (Ubuntu 20.04+)

---

## 📝 Notas Técnicas

### Decisiones de Arquitectura

**Por qué no usar Tailwind:**
- Mayor control sobre estilos
- Evitar verbosidad de clases
- Bundle size más pequeño
- Estilos dinámicos más fáciles

**Por qué inline styles:**
- Co-location
- Estilos basados en estado
- Type safety (futuro con TS)
- No colisiones de nombres

**Por qué Supabase:**
- Open source
- PostgreSQL (no vendor lock-in)
- Auth incluida
- Real-time capabilities
- Excelente DX

**Por qué Vercel:**
- Zero-config para Next.js
- Preview deployments
- Edge network global
- Simplicidad

---

## 🎯 Próximos Pasos Técnicos

### Mejoras Planificadas

1. **TypeScript Migration**
   - Type safety
   - Better IDE support
   - Catch errors en compile time

2. **Testing Suite**
   - Unit tests
   - Integration tests
   - E2E tests

3. **Performance Monitoring**
   - Web Vitals tracking
   - Error tracking
   - User analytics

4. **Progressive Enhancement**
   - Service Workers
   - Offline support
   - PWA capabilities

5. **API Development**
   - Next.js API routes
   - Rate limiting
   - Webhook endpoints

---

**Documento actualizado:** Enero 2026  
**Stack Version:** 1.0  
**Mantenedor:** InquiCheck Team
