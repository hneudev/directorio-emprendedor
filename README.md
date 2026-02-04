# Directorio Emprendedor

Una plataforma digital para conectar emprendedores, facilitar networking y promover el crecimiento empresarial en la comunidad.

## Características

- 🌐 **Landing page** moderna y responsive
- 📝 **Sistema de registro** con validación de datos
- 🖼️ **Compresión automática** de imágenes
- 🛡️ **Protección contra bots** con reCAPTCHA v3
- 🌙 **Modo oscuro** nativo
- 📱 **Diseño mobile-first**
- ☁️ **Backend sin servidor** con Google Apps Script

## Requisitos

- Node.js 18+
- npm o yarn

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/directorio-emprendedor.git
cd directorio-emprendedor

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
```

## Configuración

1. **Crea un sitio en [Google reCAPTCHA](https://www.google.com/recaptcha/admin)**
   - Copia `SITE KEY` y `SECRET KEY`
   - Pega en `.env`

2. **Crea un Google Apps Script**
   - Copia el ID del proyecto a `.env` como `VITE_GOOGLE_APPS_SCRIPT_URL`

3. **Variables de entorno** (`.env`):
   ```
   VITE_RECAPTCHA_KEY=tu_site_key
   VITE_GOOGLE_APPS_SCRIPT_URL=tu_appscript_url
   ```

## Desarrollo

```bash
# Ejecutar servidor de desarrollo
npm run dev

# Abrir http://localhost:5173
```

## Build

```bash
# Crear build para producción
npm run build

# Preview del build
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── common/         # Componentes compartidos
│   ├── form/           # Componentes de formularios
│   └── layout/         # Layout components
├── hooks/              # Custom hooks
├── utils/              # Funciones utilitarias
├── pages/              # Páginas/rutas
├── services/           # Servicios API
├── constants.js        # Constantes globales
└── App.jsx
```

## Licencia

MIT - Ver [LICENSE](LICENSE)

## Soporte

- 🐛 [Reportar bugs](https://github.com/tu-usuario/directorio-emprendedor/issues)
- 💬 [Discusiones](https://github.com/tu-usuario/directorio-emprendedor/discussions)
