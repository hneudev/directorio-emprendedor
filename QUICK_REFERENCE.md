# 🎯 REFERENCIA RÁPIDA - Directorio Emprendedor

Cheat sheet para referencia rápida mientras trabajas.

---

## ⚡ Comandos Útiles

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (usa esto para trabajar)
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview

# Ver versión de Node
node --version

# Ver versión de npm
npm --version

# Limpiar y reinstalar (si hay problemas)
rm -rf node_modules package-lock.json && npm install
```

---

## 🌐 URLs Importantes

### Desarrollo

```
http://localhost:5173           (Inicio)
http://localhost:5173/registro  (Formulario)
```

### Producción (después de desplegar)

```
https://tu-dominio.com          (Inicio)
https://tu-dominio.com/registro (Formulario)
```

### Google Services

```
Google Sheets:      https://sheets.google.com
Google Apps Script: https://script.google.com
Google Drive:       https://drive.google.com
reCAPTCHA Console:  https://www.google.com/recaptcha/admin
```

---

## 📁 Archivos Clave

### Frontend

```
src/App.jsx                 (Rutas y estructura)
src/components/Navbar.jsx   (Navegación)
src/pages/LandingPage.jsx   (Página de inicio)
src/pages/RegisterPage.jsx  (Página de registro)
src/components/RegistrationForm.jsx (Formulario)
src/services/api.js         (Funciones de API)
src/index.css               (Estilos globales)
```

### Configuración

```
.env                    (Variables de entorno - EDITA ESTO)
.env.example            (Plantilla de variables)
package.json            (Dependencias)
vite.config.js          (Configuración de Vite)
tailwind.config.js      (Configuración de Tailwind)
tailwind.config.js      (Colores y tema)
```

### Backend

```
GOOGLE_APPS_SCRIPT_TEMPLATE.js  (Código Google Apps Script)
```

### Documentación

```
START_HERE.md           (Resumen visual)
QUICK_START.md          (Inicio rápido - 5 min)
README.md               (Descripción general)
SETUP_GUIDE.md          (Guía completa de setup)
TECHNICAL_SPECS.md      (Especificaciones técnicas)
ADVANCED_SETUP.md       (Configuraciones avanzadas)
VERIFICATION_CHECKLIST  (QA checklist)
```

---

## 🎨 Personalización Común

### Cambiar Color Principal

Abre `tailwind.config.js`:

```javascript
colors: {
  primary: {
    600: '#9333ea',  // ← Cambiar este color
    700: '#7e22ce',  // ← Y este para hover
    // ...
  },
}
```

Luego reinicia: `npm run dev`

### Cambiar Textos

**Landing Page**: `src/pages/LandingPage.jsx`
**Formulario**: `src/components/RegistrationForm.jsx`
**Navbar**: `src/components/Navbar.jsx`

### Cambiar Secciones

Edita directamente en los archivos `.jsx` que desees modificar.

---

## ⚙️ Variables de Entorno

```bash
# Archivo: .env

# URL de Google Apps Script
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/YOUR_ID/usercodeapp

# Clave de reCAPTCHA
VITE_RECAPTCHA_KEY=YOUR_RECAPTCHA_KEY
```

⚠️ **Importante**: Nunca hagas commit de `.env` (ya está en `.gitignore`)

---

## 🔧 Solucionar Problemas Rápido

| Problema            | Solución                              |
| ------------------- | ------------------------------------- |
| npm error           | `npm install`                         |
| .env no funciona    | Reinicia: `Ctrl+C` y `npm run dev`    |
| Estilos raros       | `npm run build` o recarga F5          |
| Puerto 5173 ocupado | Cambia en `vite.config.js`            |
| Formulario no envía | Revisa Google Apps Script y .env      |
| reCAPTCHA error     | Comprueba VITE_RECAPTCHA_KEY en .env  |
| Imagen no comprime  | Verifica que es formato imagen válido |

---

## 📊 Estructura de Componentes

```
App (Rutas)
├── Navbar (Fixed en top)
└── main (se cambia según ruta)
    ├── LandingPage (/)
    │   ├── Hero
    │   ├── Nosotros
    │   ├── Objetivos
    │   ├── CTA
    │   └── Footer
    └── RegisterPage (/registro)
        ├── Header
        ├── RegistrationForm
        │   ├── Input fields
        │   ├── File upload
        │   └── reCAPTCHA
        └── Support info
```

---

## 🎯 Flujo de Datos

```
Usuario completa formulario
        ↓
RegistrationForm.jsx
        ↓
handleSubmit()
        ↓
submitForm() en api.js
        ↓
POST a Google Apps Script
        ↓
Google Apps Script procesa
        ↓
Guarda en Google Sheet
        ↓
Guarda logo en Google Drive
        ↓
Retorna respuesta
        ↓
Muestra éxito/error al usuario
```

---

## 📱 Breakpoints Responsivos

```
xs: 0px     (celular pequeño)
sm: 640px   (celular)
md: 768px   (tablet)
lg: 1024px  (laptop)
xl: 1280px  (desktop)
```

Ejemplo uso en Tailwind:

```jsx
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>{/* Responsive layout */}</div>
```

---

## 🎨 Colores Disponibles

### Paleta Principal (Morado)

```
primary-50:   #faf5ff
primary-100:  #f3e8ff
primary-200:  #e9d5ff
primary-300:  #d8b4fe
primary-400:  #c084fc
primary-500:  #a855f7
primary-600:  #9333ea  ← Usa este
primary-700:  #7e22ce  ← Para hover
primary-800:  #6b21a8
primary-900:  #581c87
```

Uso:

```jsx
className = "bg-primary-600"; // Color sólido
className = "text-primary-700"; // Texto
className = "border-primary-500"; // Bordes
className = "hover:bg-primary-700"; // Hover
```

---

## 🔐 Seguridad: Lo Que NO Hacer

```
❌ NO hardcodees URLs de API en código
❌ NO compartas .env en repositorio
❌ NO guardes secrets en comentarios
❌ NO desactives reCAPTCHA en producción
❌ NO confíes solo en validación del cliente
```

✅ **SÍ**:

- Usa `.env` para variables sensibles
- Valida en servidor también (Google Apps Script)
- Usa HTTPS en producción
- Mantén secrets en variables de entorno

---

## 🚀 Despliegue Rápido

### Vercel (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Sigue el wizard
```

### Netlify

```bash
# 1. Build
npm run build

# 2. Deploy carpeta dist/ a Netlify
```

### GitHub Pages

```bash
# 1. Build
npm run build

# 2. Push dist/ a rama gh-pages
```

---

## 📊 Git Workflow (Opcional)

```bash
# Inicializar repo
git init

# Configurar usuario
git config user.name "Tu Nombre"
git config user.email "tu@email.com"

# Agregar archivos
git add .

# Commit
git commit -m "Initial commit: Directorio Emprendedor"

# Agregar remote (si tienes GitHub)
git remote add origin https://github.com/tu-usuario/repo.git

# Push
git push -u origin main
```

---

## 📚 Recursos Rápidos

| Recurso            | Enlace                                    |
| ------------------ | ----------------------------------------- |
| React Docs         | https://react.dev                         |
| Vite               | https://vitejs.dev                        |
| Tailwind CSS       | https://tailwindcss.com                   |
| React Router       | https://reactrouter.com                   |
| Google Apps Script | https://developers.google.com/apps-script |
| reCAPTCHA          | https://developers.google.com/recaptcha   |

---

## 💻 DevTools Shortcuts

```
F12             Abre DevTools
Ctrl+Shift+I    Abre DevTools
Ctrl+Shift+J    Abre Console
Ctrl+Shift+K    Abre Console (Firefox)
Ctrl+Shift+E    Abre Inspector (Firefox)
Ctrl+Option+I   Abre DevTools (Mac)
```

**Pestañas útiles:**

- Elements: Ver HTML
- Console: Ver logs y errores
- Network: Ver solicitudes HTTP
- Application: Ver storage y cookies

---

## 🎯 Checklist de Desarrollo Diario

```
☐ npm run dev  (Servidor ejecutándose)
☐ DevTools abierto (F12)
☐ Console sin errores
☐ Cambios guardados
☐ Navegador actualizado (F5)
☐ Responsive check (móvil/tablet)
```

---

## 📝 Comentarios Útiles en Código

```javascript
// TODO: Implementar feature X
// FIXME: Arreglar bug Y
// HACK: Solución temporal para Z
// NOTE: Recordar esto por tal razón
// REVIEW: Alguien debería revisar esto
```

---

## 🔄 Actualizar Dependencias

```bash
# Ver versiones disponibles
npm outdated

# Actualizar todo
npm update

# Actualizar paquete específico
npm install react@latest

# Auditar seguridad
npm audit

# Arreglar vulnerabilidades
npm audit fix
```

---

## 🎓 Próximas Mejoras Sugeridas

```
1. Añadir validación de email
2. Enviar email automático al usuario
3. Panel de admin para ver registros
4. Sistema de búsqueda
5. Filtros avanzados
6. Notificaciones en tiempo real
7. Sistema de calificaciones
8. Chat entre emprendedores
9. Multiidioma
10. Dark mode
```

---

## 📞 Preguntas Frecuentes

**P: ¿Cómo cambio el puerto?**
R: Edita `vite.config.js` → `server: { port: 3000 }`

**P: ¿Cómo cambio el color del tema?**
R: Edita `tailwind.config.js` → sección `colors.primary`

**P: ¿Cómo desactivo reCAPTCHA?**
R: No lo hagas en producción, pero en dev puedes comentar la línea en `RegistrationForm.jsx`

**P: ¿Dónde veo los registros?**
R: En tu Google Sheet (el que creaste en Google Drive)

**P: ¿Cómo reseteo la base de datos?**
R: Borra todas las filas del Google Sheet (excepto encabezados)

**P: ¿Puedo usar otro backend?**
R: Sí, edita `src/services/api.js` y `src/components/RegistrationForm.jsx`

---

## 🔗 Enlaces de Referencia Rápida

```
Proyecto:           d:\Code\emprendedores anonimos
Servidor:           http://localhost:5173
DevTools:           F12
Documentación:      START_HERE.md → QUICK_START.md
Google Services:    console.cloud.google.com
```

---

## 📋 Template de Reporte de Bug

```
**Descripción:**
[Describe el problema]

**Pasos para reproducir:**
1. ...
2. ...
3. ...

**Comportamiento esperado:**
[Qué debería pasar]

**Comportamiento actual:**
[Qué está pasando]

**Screenshots/Logs:**
[Adjunta si es posible]

**Entorno:**
- OS: [Windows/Mac/Linux]
- Node: [versión]
- npm: [versión]
```

---

## 🎊 ¡Listo!

Guardabos esta referencia para cuando la necesites.

**Tu próximo paso:** Abre `http://localhost:5173` en navegador

---

**Última actualización: 2 de febrero de 2026**

_Referencia rápida del Directorio Emprendedor_
