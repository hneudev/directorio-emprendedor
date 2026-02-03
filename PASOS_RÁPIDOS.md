# ⚡ PASOS RÁPIDOS: Completar la Integración

## 1️⃣ Actualizar Google Apps Script (5 minutos)

### Ir a: https://script.google.com

1. Selecciona tu proyecto "Directorio Emprendedor"
2. **Abre el archivo** `GOOGLE_APPS_SCRIPT_TEMPLATE.js` en tu carpeta del proyecto
3. Copia TODO el contenido
4. Pega en `Editor.gs` en Google Apps Script (reemplaza todo)
5. Guarda (Ctrl+S)
6. Ejecuta → `testDoPost()` para verificar (opcional)

---

## 2️⃣ Redeploy Google Apps Script (3 minutos)

### En Google Apps Script Console:

1. Click en **"Deploy"** (arriba a la derecha)
2. Click en **"All deployments"**
3. Click en el ícono **"Edit"** (línea de lapicero) en tu Web app actual
4. Click en **"Redeploy"**
5. **COPIA la URL** que aparece
   - Formato: `https://script.google.com/macros/d/.../usercontent`

---

## 3️⃣ Actualizar .env.local (2 minutos)

### En tu carpeta del proyecto:

Abre o crea el archivo `.env.local`:

```bash
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/YOUR_NEW_ID/usercontent
VITE_RECAPTCHA_KEY=YOUR_RECAPTCHA_KEY
```

Reemplaza `YOUR_NEW_ID` con el ID de tu nueva URL desplegada.

> **Nota**: Si ya tienes esto configurado, solo actualiza la URL

---

## 4️⃣ Testing (10 minutos)

### Terminal:

```bash
# Ir a la carpeta del proyecto
cd "d:\Code\emprendedores anonimos"

# Iniciar servidor local
npm run dev

# Abre: http://localhost:5173/registro
```

### En el navegador:

1. ✅ Llena TODOS los campos del formulario
   - Nombre del Responsable
   - WhatsApp
   - Nombre del Emprendimiento
   - Instagram (opcional)
   - Facebook (opcional)
   - Descripción

2. ✅ **NUEVO**: Carga una foto del LOGO
   - Haz clic o arrastra un archivo PNG/JPG
   - Verifica que aparece el nombre del archivo

3. ✅ **NUEVO**: Carga una foto del PRODUCTO
   - Haz clic o arrastra otro archivo PNG/JPG
   - Verifica que aparece el nombre del archivo

4. ✅ Completa el reCAPTCHA
   - Haz clic en la casilla

5. ✅ Haz clic en "Registrar Emprendimiento"

6. ✅ Espera el mensaje de éxito
   - Si sale error, lee el mensaje

---

## 5️⃣ Verificar en Google Sheets (2 minutos)

### Abre tu Google Sheet:

1. Fila nueva aparecerá en la hoja "Registros"
2. Verifica que la **Columna I** (Foto del Producto) tiene el nombre del archivo
3. Verifica que la **Columna H** (Archivo Logo) tiene el nombre del archivo

---

## 6️⃣ Verificar en Google Drive (2 minutos)

### Abre Google Drive:

Deberías ver **DOS carpetas nuevas**:

```
📁 Logos de Emprendedores/
   └── foto_del_logo.jpg

📁 Fotos de Productos - Emprendedores/  ← NUEVA
   └── foto_del_producto.jpg
```

---

## ✅ Confirmación de Éxito

Si completaste todo esto correctamente:

- ✅ La compilación no tenía errores
- ✅ El formulario muestra AMBOS campos de imagen
- ✅ El formulario no envía sin las AMBAS imágenes
- ✅ Los datos aparecen en Google Sheets
- ✅ Las imágenes aparecen en Google Drive en 2 carpetas separadas
- ✅ El usuario ve un mensaje de éxito

---

## ❌ Si Algo Sale Mal

### Opción 1: Error "CORS" o "No responde"

**Solución**:

- ✅ Actualizar URL en .env.local
- ✅ Redeploy Google Apps Script como Web App

### Opción 2: Foto no aparece en Drive

**Solución**:

- ✅ Verificar que copiaste TODO el Google Apps Script
- ✅ Verificar que redployaste correctamente
- ✅ Ver los logs en Google Apps Script Console

### Opción 3: Foto no aparece en Sheets

**Solución**:

- ✅ Verificar que la columna I dice "Foto del Producto"
- ✅ Crear una nueva hoja "Registros" si no existe
- ✅ Ejecutar función testDoPost() en Apps Script

### Opción 4: Formulario no valida ambas imágenes

**Solución**:

- ✅ Limpiar caché del navegador (Ctrl+Shift+Delete)
- ✅ Reiniciar `npm run dev`

---

## 📋 Resumen Visual

```
ANTES (Sin foto de producto):
┌─────────────────────┐
│ Nombre              │
│ WhatsApp            │
│ Emprendimiento      │
│ Instagram (opt)     │
│ Facebook (opt)      │
│ Descripción         │
│ 📁 Logo *           │
│ ☑️  reCAPTCHA       │
│ [Registrar]         │
└─────────────────────┘

DESPUÉS (Con foto de producto):
┌─────────────────────┐
│ Nombre              │
│ WhatsApp            │
│ Emprendimiento      │
│ Instagram (opt)     │
│ Facebook (opt)      │
│ Descripción         │
│ 📁 Logo *           │
│ 📁 Foto Producto *  │ ← NUEVO
│ ☑️  reCAPTCHA       │
│ [Registrar]         │
└─────────────────────┘
```

---

## 📞 Preguntas Frecuentes

**P: ¿Puedo usar la URL antigua del Apps Script?**
R: No, debes actualizar a la nueva URL después de redeploy.

**P: ¿La foto se comprime automáticamente?**
R: Sí, a máximo 1MB sin necesidad de hacer nada.

**P: ¿Puedo cambiar el nombre de la carpeta de Drive?**
R: No recomendado. Está codificado en el Apps Script.

**P: ¿Dónde veo los errores si algo falla?**
R: F12 en el navegador → Console. O en script.google.com → Logs.

**P: ¿Puedo probar sin completar el reCAPTCHA?**
R: No, es obligatorio. Aparecerá error "Por favor, completa la verificación reCAPTCHA".

---

## 🎉 ¡Listo!

Una vez completado esto, tu "Directorio Emprendedor" tendrá:

- ✅ Formulario de registro con 2 fotos (logo y producto)
- ✅ Compresión automática de imágenes
- ✅ Almacenamiento en Google Sheets
- ✅ Almacenamiento en Google Drive
- ✅ Protección contra bots con reCAPTCHA
- ✅ Validación en frontend y backend

**Tiempo total**: ~20-30 minutos

---

**¿Necesitas ayuda?** Revisa los archivos de documentación:

- ACTUALIZACIÓN_CAMPO_FOTO_PRODUCTO.md
- REFERENCIA_FORMULARIO_ACTUALIZADO.md
- RESUMEN_IMPLEMENTACIÓN.md
