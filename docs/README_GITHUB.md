# 🚀 Directorio Emprendedor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18.2+-61dafb)](https://react.dev)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

Una plataforma moderna para conectar emprendedores, facilitar networking y promover el crecimiento empresarial en Hermosillo, Sonora.

## 📸 Preview

[Agregar screenshot aquí]

---

## ✨ Características Principales

- 🎯 **Landing Page atractiva** - Presentación profesional con secciones dinámicas
- 📋 **Sistema de registro completo** - Validación robusto de datos
- 🖼️ **Compresión de imágenes** - Automática para optimizar carga
- 🤖 **Protección contra bots** - reCAPTCHA v3 integrado
- 📱 **Responsive Design** - Funciona perfecto en móvil, tablet y desktop
- 🌙 **Dark Mode** - Tema oscuro completo y persistente
- 🔗 **Integración Google** - Almacenamiento en Google Sheets
- ⚡ **Performance** - Compilado con Vite para máxima velocidad

---

## 🛠 Tech Stack

### Frontend

- **React** 18.2+ - Interfaz de usuario moderno
- **Vite** 5.0+ - Build tool ultrarrápido
- **Tailwind CSS** 3.3+ - Styling utility-first
- **React Router DOM** 6.20+ - Navegación
- **React Icons** 5.5+ - Iconografía
- **React Hot Toast** 2.6+ - Notificaciones
- **reCAPTCHA** 2.1+ - Seguridad

### Backend

- **Google Apps Script** - Procesamiento y almacenamiento de datos
- **Google Sheets** - Base de datos
- **Google Drive** - Almacenamiento de imágenes

### DevOps

- **GitHub Actions** - CI/CD (si aplica)
- **Vercel/Netlify** - Hosting (recomendado)

---

## 🚀 Quick Start

### Requisitos Previos

```bash
Node.js 16+ (recomendado 18+)
npm 8+
Git
```

### Instalación (3 pasos)

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/directorio-emprendedor.git
cd directorio-emprendedor

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env y agrega tus credenciales
```

### Variables de Entorno Requeridas

Crea un archivo `.env` en la raíz (basado en `.env.example`):

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_RECAPTCHA_KEY=YOUR_RECAPTCHA_SITE_KEY
```

**¿Dónde obtener estas credenciales?**

1. **Google Apps Script:**
   - Crear un App Script con el código en `GOOGLE_APPS_SCRIPT_TEMPLATE.js`
   - Deploy como "New" web app
   - Copiar URL del deploy

2. **reCAPTCHA v3:**
   - Ir a https://www.google.com/recaptcha/admin
   - Crear sitio nuevo
   - Copiar "Site Key"

Ver [SECURITY.md](./SECURITY.md) para más detalles.

---

## 💻 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
# Abre http://localhost:5173

# Build para producción
npm run build
# Output en: ./dist

# Preview del build
npm run preview
```

---

## 📁 Estructura del Proyecto

```
directorio-emprendedor/
├── public/                    # Assets estáticos
│   └── assets/               # Imágenes, logos
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   ├── RegistrationForm.jsx
│   │   └── SuccessModal.jsx
│   ├── pages/                # Páginas (rutas)
│   │   ├── LandingPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   └── TermsAndConditions.jsx
│   ├── context/              # Context API
│   │   └── ThemeContext.jsx
│   ├── services/             # Servicios/APIs
│   │   └── api.js
│   ├── App.jsx               # Componente raíz
│   ├── main.jsx              # Entry point
│   └── index.css             # Estilos globales
├── .env.example              # Template variables
├── vite.config.js            # Configuración Vite
├── tailwind.config.js        # Configuración Tailwind
├── package.json
├── CODE_REVIEW.md            # Revisión de seguridad
├── SECURITY.md               # Política de seguridad
├── CONTRIBUTING.md           # Guía de contribución
└── README.md                 # Este archivo
```

---

## 🔒 Seguridad

### Crítico Antes de Producción

⚠️ **Lee [SECURITY.md](./SECURITY.md) antes de desplegar**

Puntos clave:

- ✅ Nunca commits `.env` (ya está en `.gitignore`)
- ✅ Valida datos en Google Apps Script
- ✅ Usa HTTPS en producción
- ✅ Configura reCAPTCHA correctamente
- ✅ Implementa rate limiting
- ✅ Habilita CSP (Content Security Policy)

---

## 📋 Funcionalidades Detalladas

### Landing Page

- Presentación de la comunidad
- Secciones de beneficios
- Testimonios (si aplica)
- CTA a registro

### Formulario de Registro

- Validación en tiempo real
- Compresión automática de imágenes
- Protección con reCAPTCHA
- Feedback visual de carga
- Modal de éxito

### Páginas Legales

- Política de Privacidad
- Términos y Condiciones
- Fully responsive
- Dark mode support

---

## 🎨 Customización

### Colores

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: "#faf5ff",
        500: "#a855f7",
        700: "#7e22ce",
        // ...
      }
    }
  }
}
```

### Logo y Branding

Reemplaza archivos en `public/assets/`

### Texto y Contenido

Edita directamente en componentes `.jsx`

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Lee [CONTRIBUTING.md](./CONTRIBUTING.md) para detalles completos.

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT - ver [LICENSE](./LICENSE) para detalles.

---

## 🆘 Soporte

### Documentación

- [Guía de Seguridad](./SECURITY.md)
- [Guía de Contribución](./CONTRIBUTING.md)
- [Revisión de Código](./CODE_REVIEW.md)

### Reportar Bugs

Ver [CONTRIBUTING.md#reportar-bugs](./CONTRIBUTING.md#reportar-bugs)

### Contacto

- 📧 Email: [tu-email@example.com]
- 🐦 Twitter: [@tu-twitter]
- 💬 Discord: [tu-server]

---

## 🙏 Agradecimientos

- Comunidad de Emprendedores de Hermosillo
- Contributors y reviewers
- Librerías open-source utilizadas

---

## 📊 Estadísticas

![GitHub stars](https://img.shields.io/github/stars/usuario/directorio-emprendedor?style=social)
![GitHub forks](https://img.shields.io/github/forks/usuario/directorio-emprendedor?style=social)
![GitHub issues](https://img.shields.io/github/issues/usuario/directorio-emprendedor)

---

## 🗺️ Roadmap

- [ ] Búsqueda avanzada de emprendimientos
- [ ] Sistema de calificaciones
- [ ] Mensajería entre emprendedores
- [ ] Dashboard de estadísticas
- [ ] API REST pública
- [ ] Aplicación móvil (React Native)
- [ ] Integración de pagos
- [ ] Certificaciones

---

## 📸 Screenshots

[Agregar screenshots aquí]

---

**Última actualización:** Febrero 3, 2026  
**Versión:** 0.1.0  
**Status:** 🟢 Activo y en desarrollo

---

## ⭐ Si este proyecto te fue útil, considera darle una estrella!
