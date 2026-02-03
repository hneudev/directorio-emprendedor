# 🚀 Directorio Emprendedor

Una plataforma moderna para conectar emprendedores, facilitar el networking y promover el crecimiento empresarial.

## 📋 Características

- **Landing Page moderna y atractiva** con secciones de presentación, objetivos y llamadas a la acción
- **Sistema de registro completo** para emprendimientos con validación de datos
- **Compresión de imágenes** automática usando `browser-image-compression`
- **Protección contra bots** con reCAPTCHA integrado
- **Diseño responsivo** optimizado para móvil, tablet y escritorio
- **Paleta de colores morada/lila** moderna y profesional
- **Integración con Google Apps Script** para almacenamiento de datos
- **Navegación fluida** con React Router

## 🛠 Tech Stack

- **Frontend:**
  - React 18.2+
  - Vite 5.0+
  - Tailwind CSS 3.3+
  - React Router DOM 6.20+
  - React Google reCAPTCHA 3.10+
  - Browser Image Compression 2.0+

- **Backend:**
  - Google Apps Script (Web App)

## 📦 Instalación

1. **Clona el repositorio:**

   ```bash
   git clone <repository-url>
   cd directorio-emprendedor
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   ```bash
   cp .env.example .env
   ```

4. **Edita el archivo `.env` y añade:**
   - `VITE_GOOGLE_APPS_SCRIPT_URL`: URL de tu Web App de Google Apps Script
   - `VITE_RECAPTCHA_KEY`: Tu clave de sitio de reCAPTCHA

## 🚀 Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
directorio-emprendedor/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navegación sticky
│   │   └── RegistrationForm.jsx    # Formulario principal
│   ├── pages/
│   │   ├── LandingPage.jsx         # Página de inicio
│   │   └── RegisterPage.jsx        # Página de registro
│   ├── services/
│   │   └── api.js                  # Conexión con Google Apps Script
│   ├── App.jsx                     # Configuración de rutas
│   ├── main.jsx                    # Punto de entrada
│   └── index.css                   # Estilos globales
├── public/                         # Archivos estáticos
├── .env.example                    # Variables de entorno (ejemplo)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

## 🔧 Configuración de Google Apps Script

### 1. Crear el Script

1. Ve a [Google Apps Script](https://script.google.com/)
2. Crea un nuevo proyecto
3. Usa este código básico como plantilla:

```javascript
function doPost(e) {
	try {
		const data = JSON.parse(e.postData.contents);

		// Obtén tu hoja de cálculo de Google Sheets
		const sheet = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID").getSheetByName("Registros");

		// Añade una nueva fila con los datos
		sheet.appendRow([
			new Date(),
			data.nombreResponsable,
			data.whatsapp,
			data.nombreEmprendimiento,
			data.instagram,
			data.facebook,
			data.descripcion,
			data.archivoLogo?.name || "",
		]);

		return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
	} catch (error) {
		return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message })).setMimeType(
			ContentService.MimeType.JSON
		);
	}
}
```

### 2. Desplegar como Web App

1. Click en "Implementar" → "Nueva implementación"
2. Selecciona "Tipo: Aplicación web"
3. Ejecutar como: Tu cuenta
4. Acceso de quién puede acceder: Cualquiera
5. Copia la URL de implementación

### 3. Configurar en el proyecto

Copia la URL de la implementación en tu archivo `.env`:

```
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercodeapp
```

## 🔐 Configuración de reCAPTCHA

1. Ve a [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin)
2. Crea un nuevo sitio
3. Copia tu **Site Key**
4. Añádelo a tu `.env`:

```
VITE_RECAPTCHA_KEY=YOUR_RECAPTCHA_SITE_KEY
```

## 🏗 Build para Producción

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`

## 👀 Vista Previa de Producción

```bash
npm run preview
```

## 📊 Payload del Formulario

El formulario envía exactamente este JSON a Google Apps Script:

```json
{
	"nombreResponsable": "String",
	"whatsapp": "String",
	"nombreEmprendimiento": "String",
	"instagram": "String",
	"facebook": "String",
	"descripcion": "String",
	"archivoLogo": {
		"data": "BASE64_ENCODED_IMAGE",
		"mime": "image/jpeg",
		"name": "filename.jpg"
	},
	"captchaToken": "String"
}
```

## 🎨 Personalización

### Colores

Los colores principal (morado/lila) están definidos en `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    // ... más tonos
    900: '#581c87',
  },
}
```

Edita estos valores para cambiar la paleta de colores.

### Contenido

- **Landing Page**: Edita `src/pages/LandingPage.jsx`
- **Formulario**: Edita `src/components/RegistrationForm.jsx`
- **Navegación**: Edita `src/components/Navbar.jsx`

## 🐛 Troubleshooting

### "VITE_GOOGLE_APPS_SCRIPT_URL is not defined"

Asegúrate de haber:

1. Creado el archivo `.env`
2. Añadido `VITE_GOOGLE_APPS_SCRIPT_URL`
3. Reiniciado el servidor de desarrollo

### "reCAPTCHA no está configurado"

Añade `VITE_RECAPTCHA_KEY` a tu archivo `.env`

### Las imágenes no se comprimen

Verifica que:

1. `browser-image-compression` está instalado (`npm install`)
2. El archivo es una imagen válida (PNG, JPG, GIF)
3. El tamaño es menor a 1MB

## 📝 Variables de Entorno

| Variable                      | Descripción                             | Obligatoria |
| ----------------------------- | --------------------------------------- | ----------- |
| `VITE_GOOGLE_APPS_SCRIPT_URL` | URL de tu Web App de Google Apps Script | ✅ Sí       |
| `VITE_RECAPTCHA_KEY`          | Clave de sitio de reCAPTCHA             | ✅ Sí       |

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 📧 Soporte

Si tienes preguntas o necesitas ayuda, contacta a: `info@directorioemprendedor.com`

---

**Hecho con ❤️ para emprendedores**
