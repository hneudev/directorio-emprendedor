# Referencia Rápida: Formulario Actualizado

## Estructura del Formulario de Registro

```
FORMULARIO DE REGISTRO DE EMPRENDEDOR
=======================================

[ ] Campo 1: Nombre del Responsable *
[ ] Campo 2: WhatsApp *
[ ] Campo 3: Nombre del Emprendimiento *
[ ] Campo 4: Instagram (opcional)
[ ] Campo 5: Facebook (opcional)
[ ] Campo 6: Descripción del Emprendimiento *

┌─────────────────────────────────────┐
│ Logo del Emprendimiento *           │
│ [Drag & drop o haz clic]            │
│ PNG, JPG, GIF (máx. 1MB)            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐  ✨ NUEVO
│ Foto del Producto del Negocio *     │
│ [Drag & drop o haz clic]            │
│ PNG, JPG, GIF (máx. 1MB)            │
└─────────────────────────────────────┘

[ ] Verificación reCAPTCHA *

[ENVIAR REGISTRO]
```

## Campos Requeridos (\*)

| Campo                 | Tipo        | Validación      | Notas               |
| --------------------- | ----------- | --------------- | ------------------- |
| Nombre Responsable    | Texto       | No vacío        | -                   |
| WhatsApp              | Teléfono    | No vacío        | Incluir código país |
| Nombre Emprendimiento | Texto       | No vacío        | Nombre del negocio  |
| Instagram             | Texto       | Opcional        | Sin @               |
| Facebook              | Texto       | Opcional        | Solo nombre usuario |
| Descripción           | Textarea    | No vacío        | Mín. 10 caracteres  |
| Logo                  | Archivo     | Imagen <1MB     | PNG, JPG, GIF       |
| **Foto Producto**     | **Archivo** | **Imagen <1MB** | **✨ NUEVO**        |
| reCAPTCHA             | Token       | Verificado      | Bot protection      |

## Flujo de Datos al Enviar

```
RegistrationForm.jsx
    ↓
submitForm(formData) [api.js]
    ↓
validateFormData(data)
    ├─ Verifica campos requeridos
    ├─ Valida archivoLogo ✓
    ├─ Valida fotoProducto ✓ NUEVO
    └─ Valida captchaToken
    ↓
Envía a Google Apps Script (VITE_GOOGLE_APPS_SCRIPT_URL)
    ↓
Google Apps Script
    ├─ Guarda fila en Google Sheets
    │   └─ Nueva columna: "Foto del Producto"
    ├─ Guarda archivoLogo en Drive
    │   └─ Carpeta: "Logos de Emprendedores"
    ├─ Guarda fotoProducto en Drive ✓ NUEVO
    │   └─ Carpeta: "Fotos de Productos - Emprendedores"
    └─ Retorna respuesta JSON
    ↓
Muestra mensaje de éxito al usuario
    ↓
Limpia formulario
    ├─ Vacía formData
    ├─ Limpia fileName
    ├─ Limpia productFileName ✓ NUEVO
    ├─ Reseta fileInputRef
    └─ Reseta productFileInputRef ✓ NUEVO
```

## Estado del Formulario (formData)

```javascript
{
  nombreResponsable: "string",           // Campo de texto
  whatsapp: "string",                    // Teléfono
  nombreEmprendimiento: "string",        // Nombre del negocio
  instagram: "string",                   // Opcional
  facebook: "string",                    // Opcional
  descripcion: "string",                 // Textarea
  archivoLogo: {                         // Imagen comprimida
    data: "base64string",                // Datos codificados
    mime: "image/jpeg",                  // Tipo de archivo
    name: "logo.jpg"                     // Nombre original
  },
  fotoProducto: {                        // ✨ NUEVO
    data: "base64string",                // Datos codificados
    mime: "image/jpeg",                  // Tipo de archivo
    name: "producto.jpg"                 // Nombre original
  },
  captchaToken: "token"                  // reCAPTCHA v3
}
```

## Validación de Imágenes

### Compresión Automática (browser-image-compression)

Ambos campos de imagen (logo y foto del producto) usan:

- **Máximo**: 1MB
- **Ancho/Alto máximo**: 1920px
- **Compresión**: Automática (lossy)
- **Web Worker**: Sí (no bloquea UI)

```javascript
const options = {
	maxSizeMB: 1,
	maxWidthOrHeight: 1920,
	useWebWorker: true,
};
const compressedFile = await imageCompression(file, options);
```

### Aceptados

✅ PNG
✅ JPG / JPEG
✅ GIF
✅ WEBP (si el navegador lo soporta)

### Rechazados

❌ PDF
❌ SVG
❌ TIFF
❌ BMP
❌ Documentos
❌ Videos

## Cambios en Google Apps Script

### Nueva Columna en Sheets

```
Columna H:  Archivo Logo
Columna I:  Foto del Producto (✨ NUEVO)
Columna J:  reCAPTCHA
```

### Nuevas Carpetas en Drive

```
📁 Google Drive (Mi unidad)
├── 📁 Logos de Emprendedores/
│   └── logo-empresa1.jpg
│   └── logo-empresa2.jpg
└── 📁 Fotos de Productos - Emprendedores/ (✨ NUEVO)
    └── producto-empresa1.jpg
    └── producto-empresa2.jpg
```

### Nueva Función en Apps Script

```javascript
function guardarFotoProducto(fotoProducto, nombreEmprendimiento) {
	// Decodifica base64 → blob
	// Crea carpeta si no existe
	// Guarda archivo en carpeta
	// Maneja errores sin interrumpir
}
```

## Mensajes de Error

El formulario puede mostrar estos errores:

| Error                                           | Causa                   | Solución                     |
| ----------------------------------------------- | ----------------------- | ---------------------------- |
| "Por favor, selecciona un archivo de imagen"    | Archivo no es imagen    | Selecciona PNG, JPG o GIF    |
| "Error al procesar la imagen"                   | Problema con compresión | Intenta con imagen diferente |
| "fotoProducto es requerido"                     | Campo vacío             | Sube una foto de producto    |
| "Archivo de foto del producto inválido"         | Datos corruptos         | Intenta de nuevo             |
| "Por favor, completa la verificación reCAPTCHA" | No verificado           | Completa reCAPTCHA           |
| "Error al enviar el formulario"                 | Error en servidor       | Contacta soporte             |

## Archivos del Proyecto

```
src/
├── components/
│   ├── RegistrationForm.jsx     (✨ ACTUALIZADO)
│   ├── Navbar.jsx
│   └── Footer.jsx
├── pages/
│   ├── LandingPage.jsx
│   └── RegisterPage.jsx
├── services/
│   └── api.js                   (✨ ACTUALIZADO)
├── App.jsx
├── App.css
├── index.css
└── main.jsx

GOOGLE_APPS_SCRIPT_TEMPLATE.js   (✨ ACTUALIZADO)
.env.example
package.json
vite.config.js
tailwind.config.js
postcss.config.js
```

## Checklist para Producción

- [ ] Actualizar Google Apps Script con código nuevo
- [ ] Redeploy Apps Script como Web App
- [ ] Probar flujo completo en navegador
- [ ] Verificar guardado en Google Sheets
- [ ] Verificar carpetas en Google Drive
- [ ] Probar con imágenes grandes (validar compresión)
- [ ] Probar en móvil (drag & drop)
- [ ] Verificar mensajes de error
- [ ] Limpiar caché del navegador si es necesario
- [ ] Documentar el Google Apps Script URL en .env

---

**Versión**: 1.1.0 con soporte para foto de producto
