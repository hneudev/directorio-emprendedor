# ✅ Checklist de Verificación - Directorio Emprendedor

Use este checklist para verificar que todo está configurado correctamente.

---

## 📋 Pre-Desarrollo

- [ ] Node.js instalado (`node --version` debe mostrar v16+)
- [ ] npm instalado (`npm --version` debe mostrar v7+)
- [ ] Git instalado (opcional pero recomendado)
- [ ] Editor de código (VS Code recomendado)

---

## 🚀 Proyecto Base

- [ ] Carpeta del proyecto existe: `d:\Code\emprendedores anonimos`
- [ ] Archivo `package.json` existe
- [ ] Archivo `vite.config.js` existe
- [ ] Archivo `tailwind.config.js` existe
- [ ] Carpeta `src/` existe con subdirectorios:
  - [ ] `src/components/`
  - [ ] `src/pages/`
  - [ ] `src/services/`
  - [ ] `src/index.css`
  - [ ] `src/main.jsx`
  - [ ] `src/App.jsx`
- [ ] Carpeta `public/` existe
- [ ] Archivo `index.html` existe
- [ ] Archivo `.gitignore` existe

---

## 📦 Dependencias

- [ ] Ejecutaste `npm install` sin errores
- [ ] Carpeta `node_modules/` se creó
- [ ] Archivo `package-lock.json` o `package.lock.yaml` existe
- [ ] Las siguientes dependencias están instaladas:
  - [ ] `react` (v18.2+)
  - [ ] `react-dom` (v18.2+)
  - [ ] `react-router-dom` (v6.20+)
  - [ ] `react-google-recaptcha` (v2.1+)
  - [ ] `browser-image-compression` (v2.0+)
  - [ ] `tailwindcss` (v3.3+)
  - [ ] `vite` (v5.0+)

Verifica con: `npm list --depth=0`

---

## 🔑 Configuración de Variables de Entorno

- [ ] Archivo `.env` creado (copiado de `.env.example`)
- [ ] Variable `VITE_GOOGLE_APPS_SCRIPT_URL` configurada
  - [ ] Comienza con `https://script.google.com/macros/d/`
  - [ ] Termina con `/usercodeapp`
  - [ ] No está vacía
- [ ] Variable `VITE_RECAPTCHA_KEY` configurada
  - [ ] Comienza con `6Lc` o `6Le` (claves recaptcha)
  - [ ] No está vacía

Verifica: El servidor debe iniciar sin avisos de variables faltantes

---

## 🌐 Google Apps Script (Backend)

### Configuración

- [ ] Cuenta Google disponible
- [ ] Acceso a [Google Apps Script](https://script.google.com/)
- [ ] Nuevo proyecto de Google Apps Script creado
- [ ] Google Sheet creado con ID copiado

### Código del Script

- [ ] Contenido de `GOOGLE_APPS_SCRIPT_TEMPLATE.js` copiado al script
- [ ] Placeholder `YOUR_SPREADSHEET_ID` reemplazado con ID real
- [ ] Script guardado (Ctrl+S)
- [ ] Función `doPost` verificada
- [ ] Función `agregarEncabezados` verificada
- [ ] Función `guardarLogo` verificada

### Deployment

- [ ] Script desplegado como "Aplicación web"
- [ ] Ejecutar como: Tu cuenta Google
- [ ] Acceso: "Cualquiera"
- [ ] URL de implementación copiada y guardada
- [ ] Autorización otorgada al script
- [ ] URL añadida a `VITE_GOOGLE_APPS_SCRIPT_URL` en `.env`

---

## 🔐 reCAPTCHA (Google)

- [ ] Acceso a [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin)
- [ ] Nuevo sitio reCAPTCHA creado
- [ ] Tipo: reCAPTCHA v3 seleccionado
- [ ] Dominios configurados:
  - [ ] `localhost`
  - [ ] Tu dominio de producción (si aplica)
- [ ] Clave de sitio (Site Key) copiada
- [ ] Clave de sitio añadida a `VITE_RECAPTCHA_KEY` en `.env`
- [ ] Clave secreta guardada (para backend si es necesario)

---

## 🎨 Interfaz de Usuario

### Navbar

- [ ] Logo visible
- [ ] Enlaces de navegación presentes (Inicio, Regístrate)
- [ ] Botón "Comenzar" visible
- [ ] Menú móvil funciona (en pantallas pequeñas)
- [ ] Navegación sticky (permanece en la parte superior)
- [ ] Colores morado/lila aplicados

### Landing Page

- [ ] Sección Hero visible
  - [ ] Título atractivo
  - [ ] Subtítulo motivador
  - [ ] Imagen/gráfico en la derecha
  - [ ] Botón CTA funciona
- [ ] Sección "Nosotros" visible
  - [ ] 3 tarjetas presentes
  - [ ] Cada tarjeta tiene ícono, título y descripción
- [ ] Sección "Objetivos" visible
  - [ ] 4 tarjetas presentes
  - [ ] Hover effect funciona
  - [ ] Números visibles (01, 02, 03, 04)
- [ ] CTA Section visible
- [ ] Footer completo
  - [ ] Enlaces sociales
  - [ ] Información de contacto
  - [ ] Copyright

### Página de Registro

- [ ] Título "Inscribe tu Emprendimiento" visible
- [ ] Subtítulo/descripción presente
- [ ] Información de beneficios visible
- [ ] Formulario presente

---

## 📝 Formulario de Registro

### Campos Presentes

- [ ] Nombre del Responsable (requerido)
- [ ] WhatsApp (requerido)
- [ ] Nombre del Emprendimiento (requerido)
- [ ] Instagram (opcional)
- [ ] Facebook (opcional)
- [ ] Descripción (requerido)
- [ ] Logo/Imagen (requerido)
- [ ] reCAPTCHA (requerido)

### Funcionalidad

- [ ] Puedes escribir en todos los campos
- [ ] Puedes seleccionar una imagen para el logo
- [ ] reCAPTCHA es visible y funciona
- [ ] Botón de envío está visible
- [ ] Botón está deshabilitado hasta rellenar todo
- [ ] Los estilos de error se aplican correctamente
- [ ] Los estilos de éxito se aplican correctamente

### Validaciones

- [ ] No puedes enviar si falta algún campo requerido
- [ ] Mensaje de error aparece si falta algo
- [ ] Si seleccionas un archivo no-imagen, muestra error
- [ ] Imagen se comprime automáticamente

---

## 🚀 Servidor de Desarrollo

### Inicio

- [ ] Ejecutaste `npm run dev`
- [ ] Sin errores en la consola
- [ ] Servidor inició en `http://localhost:5173`
- [ ] Ventana del navegador se abrió automáticamente

### Navegación

- [ ] Puedes navegar de `/` a `/registro`
- [ ] Puedes navegar de `/registro` a `/`
- [ ] Los enlaces en la navbar funcionan
- [ ] Los botones CTA funcionan
- [ ] Scroll suave funciona

### Estilos

- [ ] Colores correctos (morado/lila)
- [ ] Tipografía clara
- [ ] Espaciado consistente
- [ ] Diseño responsivo en móvil (abre DevTools F12)
- [ ] Sin errores de CSS

---

## 🧪 Prueba del Formulario

### En Desarrollo

1. [ ] Navega a `/registro`
2. [ ] Completa todos los campos:
   - [ ] Nombre: cualquier nombre
   - [ ] WhatsApp: cualquier número
   - [ ] Emprendimiento: un nombre
   - [ ] Descripción: texto descriptivo
   - [ ] Logo: selecciona una imagen
3. [ ] Completa reCAPTCHA
   - [ ] El checkbox aparece
   - [ ] Puedes hacer click en él
4. [ ] Haz click en "Enviar Registro"
   - [ ] Botón se deshabilita
   - [ ] Spinner/loading aparece
   - [ ] Mensaje de éxito o error aparece
5. [ ] Verifica en Google Sheet
   - [ ] Abre tu Google Sheet
   - [ ] Debería haber una nueva fila con los datos

---

## 📦 Build para Producción

- [ ] Ejecutaste `npm run build` sin errores
- [ ] Carpeta `dist/` se creó
- [ ] Carpeta `dist/` contiene:
  - [ ] `index.html`
  - [ ] Carpeta `assets/` con archivos JS y CSS
- [ ] Ejecutaste `npm run preview`
- [ ] La previsualización funciona correctamente
- [ ] Todos los enlaces funcionan en la previsualización

---

## 🌐 Despliegue (Opcional)

Si vas a desplegar a producción:

### Vercel

- [ ] Cuenta Vercel creada
- [ ] Repositorio Git configurado
- [ ] Proyecto conectado a Vercel
- [ ] Variables de entorno configuradas en Vercel
- [ ] Deploy completado
- [ ] URL de producción funciona

### Netlify

- [ ] Cuenta Netlify creada
- [ ] Sitio conectado
- [ ] Variables de entorno configuradas
- [ ] Deploy completado
- [ ] URL funciona

### Servidor Propio

- [ ] Servidor preparado
- [ ] Node.js instalado en servidor
- [ ] Archivos de `dist/` copiados
- [ ] Variables de entorno configuradas
- [ ] Servidor web configurado (Nginx/Apache)
- [ ] SSL/HTTPS configurado
- [ ] Dominio apunta al servidor

---

## 🔒 Seguridad

- [ ] Archivo `.env` no está comprometido en Git
- [ ] `.gitignore` contiene `.env` y `node_modules/`
- [ ] No hay secrets en comentarios de código
- [ ] reCAPTCHA está verificando correctamente
- [ ] Google Apps Script solo acepta POST
- [ ] CORS está configurado apropiadamente

---

## 📱 Responsividad

Abre DevTools (F12) y verifica en diferentes tamaños:

### Mobile (320px - 640px)

- [ ] Navbar se adapta correctamente
- [ ] Menú móvil funciona
- [ ] Landing Page se ve bien
- [ ] Formulario se ve bien
- [ ] Todos los campos son accesibles

### Tablet (640px - 1024px)

- [ ] Layout se adapta
- [ ] Texto es legible
- [ ] Botones son clickeables

### Desktop (1024px+)

- [ ] Layout completo visible
- [ ] Navegación horizontal presente
- [ ] Contenido bien espaciado

---

## 📚 Documentación

- [ ] README.md existe y tiene instrucciones claras
- [ ] SETUP_GUIDE.md existe con pasos paso a paso
- [ ] GOOGLE_APPS_SCRIPT_TEMPLATE.js existe
- [ ] COMPLETION_SUMMARY.md existe
- [ ] ADVANCED_SETUP.md existe para referencias

---

## 🎉 ¡Listo!

Si has marcado todos estos checkboxes, tu proyecto está completamente configurado y listo para:

- ✅ Desarrollo local
- ✅ Testing
- ✅ Producción
- ✅ Mantenimiento

---

## 🆘 Si Algo No Funciona

### Problema: Servidor no inicia

```bash
# Limpia cache y reinstala
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Problema: Variables de entorno no cargan

1. Verifica que `.env` existe
2. Reinicia el servidor (`npm run dev`)
3. Revisa la consola del navegador (F12)

### Problema: Formulario no envía

1. Verifica `VITE_GOOGLE_APPS_SCRIPT_URL`
2. Verifica que Google Apps Script está desplegado
3. Abre DevTools → Network y revisa la solicitud
4. Verifica que reCAPTCHA está configurado

### Problema: Estilos se ven raros

```bash
# Reconstruye Tailwind
npm run build
```

### Problema: Imágenes no se comprimen

1. Verifica que `browser-image-compression` está instalado
2. Abre DevTools → Console para ver errores
3. Prueba con una imagen más pequeña

---

## 📞 Recursos

- Documentación de React: https://react.dev
- Documentación de Vite: https://vitejs.dev
- Documentación de Tailwind: https://tailwindcss.com
- Google Apps Script Docs: https://developers.google.com/apps-script

---

**Última actualización: 2 de febrero de 2026**

¡Felicidades por completar tu proyecto del Directorio Emprendedor! 🚀
