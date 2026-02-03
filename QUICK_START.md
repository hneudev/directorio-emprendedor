# 🚀 Quick Start Guide - Directorio Emprendedor

Comienza en 5 minutos.

---

## ⚡ Inicio Rápido (5 minutos)

### 1. Instalar Dependencias (2 min)

```bash
cd "d:/Code/emprendedores anonimos"
npm install
```

✅ **¿Completado?** Si ves "added XXX packages" sin errores.

---

### 2. Crear Archivo `.env` (1 min)

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Abre `.env` y verifica que tenga estas líneas:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercodeapp
VITE_RECAPTCHA_KEY=YOUR_RECAPTCHA_SITE_KEY
```

(Por ahora pueden ser placeholders, los actualizarás después)

✅ **Completado?** El archivo `.env` existe.

---

### 3. Iniciar Servidor (1 min)

```bash
npm run dev
```

Tu navegador debería abrir automáticamente http://localhost:5173

✅ **Completado?** Ves la página de inicio del Directorio Emprendedor.

---

### 4. Navega por el Sitio (1 min)

- Haz click en "Registra tu Emprendimiento"
- Verás el formulario
- Vuelve a "Inicio" con el logo o menú

✅ **Completado?** La navegación funciona fluidamente.

---

## 📋 Próximos Pasos (Configuración Real)

Ahora que tienes el proyecto ejecutándose, configura Google Apps Script y reCAPTCHA:

### 📌 Paso 1: Configurar Google Apps Script (10-15 min)

Sigue la guía en **SETUP_GUIDE.md** (sección "Google Apps Script")

Lo que necesitas:

1. Crear un Google Sheet
2. Crear un Google Apps Script
3. Desplegar como Web App
4. Copiar la URL

Resultado:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/1AbCdEfGhIjKlMnOpQrStUvWxYz123456789/usercodeapp
```

---

### 🔐 Paso 2: Configurar reCAPTCHA (5-10 min)

Sigue la guía en **SETUP_GUIDE.md** (sección "reCAPTCHA")

Lo que necesitas:

1. Ir a https://www.google.com/recaptcha/admin
2. Crear un nuevo sitio
3. Seleccionar reCAPTCHA v3
4. Obtener la "Clave de sitio"

Resultado:

```env
VITE_RECAPTCHA_KEY=6LcVxAbCdEfGhIjKlMnOpQrStUvWxYz123456789Q
```

---

### ✅ Paso 3: Actualizar `.env`

Abre `.env` y reemplaza los placeholders con tus claves reales:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/1AbCdEfGhIjKlMnOpQrStUvWxYz123456789/usercodeapp
VITE_RECAPTCHA_KEY=6LcVxAbCdEfGhIjKlMnOpQrStUvWxYz123456789Q
```

---

### 🧪 Paso 4: Probar el Formulario

1. Asegúrate de que el servidor está ejecutándose (`npm run dev`)
2. Ve a http://localhost:5173/registro
3. Completa el formulario con datos de prueba
4. Haz click en "Enviar Registro"
5. Debería aparecer un mensaje de éxito ✅

**¿No funciona?** Revisa la consola del navegador (F12 → Console) para ver errores.

---

## 📚 Documentación Disponible

- **README.md** - Descripción general del proyecto
- **SETUP_GUIDE.md** - Guía detallada de configuración
- **GOOGLE_APPS_SCRIPT_TEMPLATE.js** - Código del backend
- **VERIFICATION_CHECKLIST.md** - Checklist de verificación
- **ADVANCED_SETUP.md** - Configuraciones avanzadas
- **COMPLETION_SUMMARY.md** - Resumen de lo generado

---

## 🎨 Personalizar el Sitio

### Cambiar Colores

Abre `tailwind.config.js` y edita la sección `primary`:

```javascript
colors: {
  primary: {
    600: '#9333ea',  // ← Tu color principal (cambiar aquí)
    700: '#7e22ce',  // ← Color hover
    // ...
  },
}
```

[Elige colores aquí](https://www.twind.style/)

### Cambiar Texto

- **Landing Page**: `src/pages/LandingPage.jsx`
- **Formulario**: `src/components/RegistrationForm.jsx`
- **Navbar**: `src/components/Navbar.jsx`

---

## 🚀 Construir para Producción

Cuando estés listo para desplegar:

```bash
npm run build
```

Esto crea una carpeta `dist/` lista para producción.

Opciones de despliegue:

- **Vercel**: https://vercel.com (recomendado para React)
- **Netlify**: https://netlify.com
- **Tu servidor propio**: Copia `dist/` a tu servidor

---

## 🆘 Solucionar Problemas

### ❌ "Cannot find module 'react'"

```bash
npm install
npm run dev
```

### ❌ "VITE_GOOGLE_APPS_SCRIPT_URL is not defined"

1. Copia `.env.example` a `.env`
2. Añade tus variables
3. Reinicia: Ctrl+C y `npm run dev`

### ❌ "reCAPTCHA no está configurado"

- Comprueba que `VITE_RECAPTCHA_KEY` está en `.env`
- Reinicia el servidor

### ❌ El formulario no envía datos

1. Abre DevTools (F12)
2. Ve a la pestaña "Network"
3. Intenta enviar el formulario
4. Busca errores en las solicitudes
5. Verifica que Google Apps Script está desplegado

---

## 📞 Recursos Útiles

| Recurso            | Enlace                                    |
| ------------------ | ----------------------------------------- |
| React              | https://react.dev                         |
| Vite               | https://vitejs.dev                        |
| Tailwind CSS       | https://tailwindcss.com                   |
| Google Apps Script | https://developers.google.com/apps-script |
| reCAPTCHA          | https://developers.google.com/recaptcha   |

---

## ✨ Características de Tu Proyecto

✅ Landing Page moderna  
✅ Formulario completo con validaciones  
✅ Compresión automática de imágenes  
✅ Protección reCAPTCHA  
✅ Integración con Google Apps Script  
✅ Diseño responsivo (móvil, tablet, desktop)  
✅ Colores morado/lila profesionales  
✅ Sin errores, listo para producción

---

## 🎯 Próximos Pasos Después del Setup

1. **Personalizar contenido**
   - Cambiar textos
   - Añadir tu logo
   - Configurar redes sociales

2. **Probar en diferentes dispositivos**
   - Móvil
   - Tablet
   - Desktop

3. **Desplegar a producción**
   - Configurar dominio
   - Configurar SSL/HTTPS
   - Monitorear errores

4. **Mantener el sitio**
   - Revisar registros en Google Sheet
   - Responder consultas
   - Actualizar contenido

---

## 💡 Tips Pro

1. **DevTools es tu amigo**
   - Abre F12 para ver errores
   - Tab "Network" muestra solicitudes
   - Tab "Console" muestra logs

2. **Reinicia después de cambios en `.env`**
   - Ctrl+C en la terminal
   - `npm run dev`

3. **Guarda el ID de Google Sheet**
   - Lo necesitarás si cambias Google Apps Script

4. **Haz backups**
   - Git es ideal para controlar cambios

5. **Testing local primero**
   - Prueba todo en `localhost:5173`
   - Luego despliega a producción

---

## 🎉 ¡Listo para Comenzar!

Tu proyecto del Directorio Emprendedor está completamente configurado.

**Comando para iniciar:**

```bash
npm run dev
```

**Abre en navegador:**
http://localhost:5173

¡Felicidades! 🚀

---

_Si tienes preguntas, revisa los otros archivos de documentación._
