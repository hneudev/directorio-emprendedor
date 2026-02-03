# 🔧 Guía de Configuración - Directorio Emprendedor

Esta guía te ayudará a configurar completamente el proyecto Directorio Emprendedor.

## 1️⃣ Configuración Inicial del Proyecto

### Instalar dependencias

```bash
npm install
```

### Copiar archivo de variables de entorno

```bash
cp .env.example .env
```

## 2️⃣ Configurar Google Apps Script

### Paso 1: Crear un Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Copia el **ID de la hoja** (está en la URL):
   - URL: `https://docs.google.com/spreadsheets/d/**ESTE_ES_EL_ID**/edit`
   - Guárdalo para más adelante

### Paso 2: Crear el Google Apps Script

1. Ve a [Google Apps Script](https://script.google.com)
2. Crea un nuevo proyecto
3. Dale un nombre, p. ej., "Directorio Emprendedor API"
4. Copia todo el contenido de `GOOGLE_APPS_SCRIPT_TEMPLATE.js`
5. Pégalo en el editor de Google Apps Script
6. **IMPORTANTE**: Reemplaza `YOUR_SPREADSHEET_ID` con el ID de tu hoja de cálculo
7. Guarda el proyecto (Ctrl+S o Cmd+S)

### Paso 3: Deployar como Web App

1. En Google Apps Script, haz clic en "Implementar" (Deploy)
2. Selecciona "Nueva implementación"
3. Elige el tipo de implementación:
   - **Tipo**: Aplicación web
   - **Ejecutar como**: Tu cuenta Google
   - **Acceso de quién puede acceder**: Cualquiera
4. Haz clic en "Implementar"
5. Se te pedirá que autorices el script:
   - Haz clic en tu cuenta Google
   - Haz clic en "Permitir" en la pantalla de permisos
6. **COPIA LA URL DE IMPLEMENTACIÓN** que aparece (se parece a esto):
   ```
   https://script.google.com/macros/d/1xxxxxxxxxxxxxxxxxxxxxx/usercodeapp
   ```

### Paso 4: Agregar la URL a tu proyecto

1. Abre el archivo `.env` en tu proyecto
2. Reemplaza `YOUR_GOOGLE_APPS_SCRIPT_URL` con la URL que copiaste:
   ```env
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/1xxxxxxxxxxxxxxxxxxxxxx/usercodeapp
   ```

## 3️⃣ Configurar reCAPTCHA

### Paso 1: Crear clave de reCAPTCHA

1. Ve a [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin)
2. Inicia sesión con tu cuenta Google
3. Haz clic en el signo "+" para crear un nuevo sitio
4. Rellena el formulario:
   - **Etiqueta**: "Directorio Emprendedor"
   - **Tipo de reCAPTCHA**: reCAPTCHA v3
   - **Dominios**: localhost, tu dominio de producción (p. ej., directorioemprendedor.com)
5. Acepta los términos y crea el sitio

### Paso 2: Obtener las claves

1. Después de crear el sitio, verás dos claves:
   - **Clave de sitio** (Site key) - la que necesitas
   - **Clave secreta** (Secret key) - para el backend

2. **COPIA LA CLAVE DE SITIO**

### Paso 3: Agregar la clave al proyecto

1. Abre el archivo `.env`
2. Reemplaza `YOUR_RECAPTCHA_SITE_KEY` con tu clave de sitio:
   ```env
   VITE_RECAPTCHA_KEY=6LcxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQ
   ```

## 4️⃣ Variables de Entorno Completas

Tu archivo `.env` debe verse así:

```env
# Google Apps Script
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/1xxxxxxxxxxxxxxxxxxxxxx/usercodeapp

# reCAPTCHA
VITE_RECAPTCHA_KEY=6LcxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQ
```

⚠️ **IMPORTANTE**: Nunca commits el archivo `.env` a Git (ya está en `.gitignore`)

## 5️⃣ Ejecutar el Proyecto

### Desarrollo local

```bash
npm run dev
```

Se abrirá automáticamente en `http://localhost:5173`

### Probar el formulario

1. Ve a http://localhost:5173/registro
2. Rellena todos los campos
3. Sube una imagen
4. Completa la verificación reCAPTCHA
5. Haz clic en "Enviar Registro"
6. Si todo está correcto, verás un mensaje de éxito
7. Los datos aparecerán en tu Google Sheet

### Ver los datos registrados

1. Ve a tu Google Sheet
2. Verás que aparece una nueva fila con los datos del registro
3. Los logos se guardarán en una carpeta "Logos de Emprendedores" en tu Google Drive

## 6️⃣ Construir para Producción

### Build

```bash
npm run build
```

Esto creará una carpeta `dist/` con los archivos optimizados para producción.

### Desplegar

Puedes desplegar el contenido de la carpeta `dist/` en:

- Vercel (recomendado)
- Netlify
- GitHub Pages
- Tu propio servidor

#### Ejemplo con Vercel:

```bash
npm install -g vercel
vercel
```

Sigue las instrucciones que aparecen en la terminal.

## 7️⃣ Troubleshooting

### "No puedo enviar el formulario"

**Comprueba:**

- [ ] El archivo `.env` existe y tiene las variables correctas
- [ ] La URL de Google Apps Script es correcta
- [ ] El reCAPTCHA está completado
- [ ] Todos los campos obligatorios están rellenos

### "reCAPTCHA dice 'no configurado'"

- Comprueba que `VITE_RECAPTCHA_KEY` está en el archivo `.env`
- Reinicia el servidor de desarrollo (`npm run dev`)

### "El formulario se envía pero no aparecen los datos en el Sheet"

**Comprueba en Google Apps Script:**

1. Ve al proyecto de Google Apps Script
2. Abre la pestaña "Ejecuciones" en la parte izquierda
3. Busca errores en las ejecuciones recientes
4. Verifica que el `SPREADSHEET_ID` es correcto

### "Error CORS"

Esto es normal due a la configuración de Google Apps Script. El script está configurado para permitir solicitudes CORS.

## 8️⃣ Personalizar los Colores

Los colores morado/lila están definidos en `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
}
```

Puedes cambiar estos valores a cualquier color que prefieras.

## 9️⃣ Contacto y Soporte

Si tienes problemas, puedes:

- Revisar la documentación en `README.md`
- Contactar a: info@directorioemprendedor.com
- Crear un issue en el repositorio

---

**¡Listo! Tu aplicación está lista para usarse. ¡Felicidades!** 🎉
