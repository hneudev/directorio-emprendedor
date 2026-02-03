# 🔧 Especificaciones Técnicas - Directorio Emprendedor

Detalles técnicos completos de la arquitectura y componentes.

---

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────┐
│                   NAVEGADOR WEB                      │
│  ┌───────────────────────────────────────────────┐  │
│  │  React App (Vite)                             │  │
│  │  - Landing Page (/)                           │  │
│  │  - Register Page (/registro)                  │  │
│  │  - Componentes UI (Navbar, Form)              │  │
│  │  - Servicios (API calls)                      │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
           │                              │
           │                              │
    HTTP POST request          Valida reCAPTCHA
           │                              │
           v                              v
┌─────────────────────────────────────────────────────┐
│        GOOGLE APPS SCRIPT (Web App)                  │
│  ┌───────────────────────────────────────────────┐  │
│  │  doPost(e) - Recibe datos JSON                │  │
│  │  Valida datos                                 │  │
│  │  Guarda en Google Sheet                       │  │
│  │  Guarda logo en Drive                         │  │
│  │  Retorna respuesta JSON                       │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
           │
           v
┌─────────────────────────────────────────────────────┐
│              ALMACENAMIENTO (Google)                 │
│  ┌──────────────────┐      ┌──────────────────┐    │
│  │  Google Sheets   │      │  Google Drive    │    │
│  │  (Registros)     │      │  (Logos)         │    │
│  └──────────────────┘      └──────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## 📦 Stack Tecnológico

### Frontend

```
├── React 18.2         (UI Framework)
├── Vite 5.0           (Build Tool)
├── React Router 6.20  (Client Routing)
├── Tailwind CSS 3.3   (Styling)
├── PostCSS 8.4        (CSS Processing)
└── Autoprefixer 10.4  (Browser Compatibility)
```

### Librerías Adicionales

```
├── react-google-recaptcha 2.1  (CAPTCHA)
└── browser-image-compression   (Image Optimization)
```

### Backend

```
└── Google Apps Script (Serverless)
```

---

## 📁 Estructura de Componentes

### src/App.jsx

**Responsabilidad**: Enrutamiento principal

```jsx
Function: App()
├── Providers:
│   └── Router (BrowserRouter)
├── Routes:
│   ├── / → LandingPage
│   └── /registro → RegisterPage
└── Layout:
    └── Navbar (persistente)
```

**Dependencias**: react-router-dom, React

---

### src/components/Navbar.jsx

**Responsabilidad**: Navegación global

```jsx
Function: Navbar()
├── Features:
│   ├── Sticky positioning
│   ├── Responsive menu
│   ├── Active route highlighting
│   └── Mobile hamburger menu
├── State:
│   └── isOpen (boolean)
└── Props: Ninguno
```

**Dependencias**: react-router-dom, React

---

### src/pages/LandingPage.jsx

**Responsabilidad**: Página de inicio

```jsx
Function: LandingPage()
├── Sections:
│   ├── Hero
│   │   ├── Título
│   │   ├── Subtítulo
│   │   ├── CTA Button
│   │   └── Imagen
│   ├── Nosotros
│   │   └── 3 Cards (Innovación, Colaboración, Crecimiento)
│   ├── Objetivos
│   │   └── 4 Cards (Visibilidad, Networking, Crecimiento, Soporte)
│   ├── CTA Section
│   │   └── Llamada a la acción grande
│   └── Footer
│       ├── Links
│       ├── Redes sociales
│       └── Contacto
└── Props: Ninguno
```

**Dependencias**: react-router-dom, React

---

### src/pages/RegisterPage.jsx

**Responsabilidad**: Contenedor del formulario

```jsx
Function: RegisterPage()
├── Sections:
│   ├── Header
│   ├── RegistrationForm (componente)
│   ├── Info cards
│   └── Support section
└── Props: Ninguno
```

**Dependencias**: RegistrationForm, React

---

### src/components/RegistrationForm.jsx

**Responsabilidad**: Lógica del formulario

```jsx
Function: RegistrationForm()
├── State:
│   ├── formData (object)
│   ├── loading (boolean)
│   ├── error (string)
│   ├── success (boolean)
│   └── fileName (string)
├── Features:
│   ├── Validación de campos
│   ├── Compresión de imágenes
│   ├── reCAPTCHA
│   ├── Manejo de errores
│   └── Loading state
└── Functions:
    ├── handleChange()
    ├── handleFileChange()
    ├── handleRecaptcha()
    └── handleSubmit()
```

**Campos del formulario:**

```javascript
{
  nombreResponsable: string,
  whatsapp: string,
  nombreEmprendimiento: string,
  instagram: string,
  facebook: string,
  descripcion: string,
  archivoLogo: {
    data: base64,
    mime: string,
    name: string
  },
  captchaToken: string
}
```

**Dependencias**: react-google-recaptcha, browser-image-compression, api.js, React

---

### src/services/api.js

**Responsabilidad**: Comunicación con backend

```javascript
Function: submitForm(formData)
├── Validación de URL
├── Envío POST a Google Apps Script
├── Manejo de errores
└── Retorna: { success, message }

Function: validateFormData(data)
├── Verifica campos requeridos
├── Valida estructura del logo
└── Retorna: { isValid, errors[] }
```

**Variables de entorno requeridas:**

```
VITE_GOOGLE_APPS_SCRIPT_URL
```

---

## 🎨 Sistema de Estilos

### Tailwind CSS Configuration

**Colores Personalizados:**

```javascript
colors: {
  primary: {
    50: '#faf5ff',    // Muy claro
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',   // Principal
    700: '#7e22ce',   // Hover
    800: '#6b21a8',
    900: '#581c87',   // Muy oscuro
  },
}
```

**Breakpoints (Responsive):**

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## 🔄 Flujo de Datos

### Formulario → Backend → Google Sheets

```
1. Usuario rellena formulario
   ↓
2. handleChange() actualiza formData
   ↓
3. handleFileChange() comprime imagen
   ↓
4. handleRecaptcha() obtiene token
   ↓
5. handleSubmit() valida todo
   ↓
6. submitForm() envía POST
   ↓
7. Google Apps Script recibe
   ↓
8. Google Apps Script valida
   ↓
9. Google Apps Script guarda en Sheet
   ↓
10. Google Apps Script guarda logo en Drive
   ↓
11. Respuesta JSON al cliente
   ↓
12. Mostrar éxito/error al usuario
```

---

## 🔐 Seguridad

### Client-Side (React)

```
✅ Validación de campos requeridos
✅ Validación de tipos de archivo
✅ Compresión de imágenes (previene overflow)
✅ Límite de tamaño (1MB)
✅ reCAPTCHA v3 (detección de bots)
```

### Server-Side (Google Apps Script)

```
✅ Valida JSON recibido
✅ Valida campos requeridos
✅ CORS headers configurados
✅ No almacena datos sensibles en logs
```

---

## 📊 Validaciones

### Campos Requeridos

```
- nombreResponsable: ✅ Required
- whatsapp: ✅ Required
- nombreEmprendimiento: ✅ Required
- descripcion: ✅ Required
- archivoLogo: ✅ Required
- captchaToken: ✅ Required
```

### Campos Opcionales

```
- instagram: ⭕ Optional
- facebook: ⭕ Optional
```

### Validaciones de Archivo

```
- Tipo: Debe ser imagen (image/*)
- Tamaño: Máximo 1MB (compresión automática)
- Formato: PNG, JPG, GIF, WebP, etc.
```

---

## 🌐 Variables de Entorno

### Requeridas

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/.../usercodeapp
VITE_RECAPTCHA_KEY=6Lc...Q
```

### Acceso en el Código

```javascript
import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
import.meta.env.VITE_RECAPTCHA_KEY;
```

---

## 🚀 Performance

### Optimizaciones Implementadas

```
✅ Image Compression (browser-image-compression)
   - Reduce tamaño de imagen antes de envío
   - Máximo 1MB comprimido

✅ Lazy Loading (React Router)
   - Carga componentes bajo demanda

✅ CSS Minimizado (Tailwind)
   - Solo incluye CSS usado

✅ Bundle Optimization (Vite)
   - Code splitting automático
   - Tree shaking de librerías no usadas
```

### Métricas Esperadas

```
- First Contentful Paint: < 2s
- Largest Contentful Paint: < 2.5s
- Total Bundle Size: < 200KB (gzipped)
```

---

## 🧪 Testing Recomendado

### Unit Tests

```javascript
// Test de validación de formulario
expect(validateFormData({})).toEqual({
  isValid: false,
  errors: ['nombreResponsable es requerido', ...]
})
```

### Integration Tests

```javascript
// Test de envío de formulario
// Mockear Google Apps Script
// Verificar que se llama la función correctamente
```

### E2E Tests

```javascript
// Test del flujo completo
// 1. Navegar a /registro
// 2. Completar formulario
// 3. Verificar envío
// 4. Verificar en Google Sheet
```

---

## 📱 Responsividad Detallada

### Breakpoints

```
Mobile First:
xs: 320px - 480px   (Celular)
sm: 480px - 640px   (Celular grande)
md: 640px - 1024px  (Tablet)
lg: 1024px - 1280px (Laptop)
xl: 1280px+         (Desktop)
```

### Cambios por Breakpoint

```
Navbar:
- xs/sm: Menu hamburguesa
- md+: Menu horizontal

Landing Page:
- xs/sm: Stack vertical
- md+: Grid de 2 columnas

Formulario:
- xs/sm: Campo por línea
- md+: 2 columnas en algunos campos
```

---

## 🔄 Ciclo de Desarrollo

### Flujo Local

```
npm run dev
  ↓
Vite inicia en localhost:5173
  ↓
Hot Module Replacement activo
  ↓
Cambios se reflejan automáticamente
```

### Build para Producción

```
npm run build
  ↓
Vite optimiza y compila
  ↓
Genera carpeta dist/
  ↓
Listo para desplegar
```

---

## 📊 Google Apps Script API

### Endpoint

```
POST {VITE_GOOGLE_APPS_SCRIPT_URL}
Content-Type: application/json

Body:
{
  "nombreResponsable": "...",
  "whatsapp": "...",
  ...
}
```

### Respuesta Exitosa

```json
{
	"success": true,
	"message": "Registro guardado exitosamente",
	"timestamp": "2026-02-02T..."
}
```

### Respuesta Error

```json
{
	"success": false,
	"message": "Error al procesar...",
	"timestamp": "2026-02-02T..."
}
```

---

## 🎯 Casos de Uso

### Happy Path (Usuario exitoso)

```
1. Usuario navega a /registro
2. Completa todos los campos
3. Selecciona imagen
4. Completa reCAPTCHA
5. Presiona "Enviar"
6. Servidor recibe datos
7. Datos se guardan en Sheet
8. Logo se guarda en Drive
9. Usuario ve mensaje de éxito
10. Formulario se resetea
```

### Error Path (Usuario con error)

```
1. Usuario intenta enviar sin completar
2. Botón está deshabilitado
3. O si intenta enviar incompleto:
   - Muestra mensaje de error
   - Valida los campos
4. Usuario completa campos
5. Intenta de nuevo
6. Éxito
```

---

## 🔮 Posibles Extensiones Futuras

```
✨ Autenticación de usuarios
✨ Panel de admin
✨ Búsqueda de emprendimientos
✨ Sistema de calificaciones
✨ Chat en tiempo real
✨ Notificaciones por email
✨ Integración con redes sociales
✨ Filtros avanzados
✨ Análisis y reportes
✨ Multiidioma
```

---

## 📚 Referencias Técnicas

| Componente                | Documentación                                              |
| ------------------------- | ---------------------------------------------------------- |
| React 18                  | https://react.dev                                          |
| React Router              | https://reactrouter.com                                    |
| Vite                      | https://vitejs.dev                                         |
| Tailwind CSS              | https://tailwindcss.com                                    |
| Google Apps Script        | https://developers.google.com/apps-script                  |
| browser-image-compression | https://github.com/Donaldcwl/browser-image-compression     |
| react-google-recaptcha    | https://github.com/google-recaptcha/react-google-recaptcha |

---

**Última actualización: 2 de febrero de 2026**
