# 📋 Revisión de Código - Directorio Emprendedor

**Fecha:** Febrero 3, 2026  
**Nivel:** Senior Code Review  
**Estatus:** Listo para producción con mejoras recomendadas

---

## 🔴 PROBLEMAS CRÍTICOS ENCONTRADOS

### 1. **Credenciales de reCAPTCHA expuestas en `.env` controlado por Git**

**Severidad:** 🔴 CRÍTICA  
**Archivo:** `.env`

```
VITE_RECAPTCHA_KEY=6LdNul8sAAAAAOrpqIMC4GRItu8Y8TjDz1qlYUdx
```

**Problema:**

- Las credenciales están en el repositorio Git
- Los públicos pueden interceptar y abusar de reCAPTCHA
- Se pueden suplantar registros no autorizados

**Solución:**

```bash
# 1. Eliminar credenciales del historial Git
git filter-branch --tree-filter 'rm -f .env' -- --all
git push origin --force --all

# 2. Regenerar claves de reCAPTCHA en Google Cloud
# 3. Crear .env.example SIN valores sensibles
# 4. Actualizar .gitignore (ya está correcto)
```

---

### 2. **URL de Google Apps Script expuesta en código fuente**

**Severidad:** 🔴 CRÍTICA  
**Archivo:** `.env`

```
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyhtAU45O8BnuWwdpqH5PD0jdnK2H18GEdNufFQpRvnPQHylms4i4zgw4cBfhnFKH14yw/exec
```

**Problemas:**

- URL pública que revela el AppScript ID
- Cualquiera puede ejecutar el script
- Riesgo de inyección de datos maliciosos

**Solución:**

1. Regenerar el URL del AppScript
2. Implementar validación de origen (origin header)
3. Añadir timestamp validation en el AppScript
4. Documentar cómo regenerar credenciales

---

### 3. **Sin validación del lado del servidor**

**Severidad:** 🔴 CRÍTICA  
**Archivo:** `src/services/api.js`, `src/components/RegistrationForm.jsx`

**Problema:**

```javascript
// Esto ocurre en el navegador, fácil de bypasear
validateFormData(data); // Solo validación cliente
```

**Riesgos:**

- Un atacante puede enviar datos inválidos directo al AppScript
- No hay sanitización en backend
- Sin límites de rate limiting
- Sin verificación de datos duplicados

**Solución (Requiere cambios en AppScript):**

```javascript
// En AppScript agregar:
function doPost(e) {
	// 1. Validar token reCAPTCHA en Google
	// 2. Validar estructura de datos
	// 3. Sanitizar inputs
	// 4. Rate limiting por IP
	// 5. Verificar duplicados
	// 6. Logging de seguridad
}
```

---

## 🟠 PROBLEMAS DE SEGURIDAD IMPORTANTES

### 4. **No hay validación de reCAPTCHA en backend**

**Severidad:** 🟠 ALTA  
**Archivo:** `src/services/api.js`

```javascript
// El token se envía pero nunca se valida en Google
const response = await fetch(API_URL, {
	method: "POST",
	mode: "no-cors", // ⚠️ NO PUEDE LEER RESPUESTA
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(formData),
});
```

**Problema:**

- `no-cors` mode = respuesta opaca
- No se valida si reCAPTCHA fue exitoso
- El token podría ser falso

---

### 5. **CORS permisivo (no-cors mode)**

**Severidad:** 🟠 ALTA  
**Archivo:** `src/services/api.js`

```javascript
mode: "no-cors", // Permite solicitudes sin validación CORS
```

**Solución:**

- Usar un proxy backend (Node/Express)
- O configurar CORS en AppScript correctamente

---

### 6. **Sin límite de tamaño de archivos en frontend**

**Severidad:** 🟠 MEDIA  
**Archivo:** `src/components/RegistrationForm.jsx`

```javascript
// El límite es solo en compresión, no en subida inicial
const options = {
	maxSizeMB: 1,
	maxWidthOrHeight: 1920,
};
```

**Mejora:** Validar tamaño ANTES de procesar

---

## 🟡 PROBLEMAS DE CALIDAD DEL CÓDIGO

### 7. **Gestión de estado compleja y duplicada**

**Severidad:** 🟡 MEDIA  
**Archivo:** `src/App.jsx`, `src/components/RegistrationForm.jsx`, `src/context/ThemeContext.jsx`

**Problema:**

```javascript
// En App.jsx - estado de tema en useState
const [isDarkMode, setIsDarkMode] = useState(...)
// También se pasa por ThemeContext
// Pero se repite en Navbar con props directos
```

**Recomendación:** Usar solamente ThemeContext, eliminar props duplicados

---

### 8. **Falta manejo de errores en componentes críticos**

**Severidad:** 🟡 MEDIA  
**Archivo:** `src/components/RegistrationForm.jsx`

```javascript
// handleSubmit tiene try/catch, pero no cubre todos los casos
// handleFileChange podría fallar silenciosamente
reader.onload = (event) => {
	// ¿Qué si event.target.result es null?
	// ¿Qué si JSON.parse falla?
};
```

---

### 9. **Sin manejo de errores en LandingPage**

**Severidad:** 🟡 MEDIA  
**Archivo:** `src/pages/LandingPage.jsx`

```javascript
// Las imágenes no tienen fallback si no cargan
<img
	src='/assets/logo_emprendedores anonimos.jpeg'
	alt='Emprendedores Anónimos'
	className='w-full h-auto rounded-2xl shadow-2xl'
/>
// Sin onError, sin loading state
```

---

### 10. **Números mágicos sin constantes**

**Severidad:** 🟡 BAJA  
**Archivo:** `src/components/RegistrationForm.jsx`

```javascript
maxSizeMB: 1, // ¿Por qué 1MB?
maxWidthOrHeight: 1920, // ¿Por qué 1920px?
duration: 4000, // ¿Por qué 4 segundos?
```

**Solución:** Crear archivo `src/constants.js`

---

### 11. **Sin pruebas automatizadas**

**Severidad:** 🟡 MEDIA  
**Recomendación:** Agregar Jest + React Testing Library

---

## 🟢 MEJORAS DE ESTRUCTURA Y MANTENIBILIDAD

### 12. **Demasiados archivos de documentación sin estructura**

**Severidad:** 🟢 BAJA  
**Archivos encontrados:**

```
ACTUALIZACIÓN_CAMPO_FOTO_PRODUCTO.md
ADVANCED_SETUP.md
COMPLETION_SUMMARY.md
DOCUMENTACIÓN.md
GUÍA_COMPLETAR_INTEGRACIÓN.md
...14 archivos markdown más
```

**Problema:** Confuso para nuevos developers  
**Solución:** Centralizar en `docs/` con estructura clara

---

### 13. **Falta estructura de carpetas para escalabilidad**

**Severidad:** 🟢 BAJA

**Actual:**

```
src/
  components/
  pages/
  context/
  services/
```

**Recomendado:**

```
src/
  components/
    common/
    form/
    layout/
  pages/
  context/
  services/
  hooks/
  utils/
  constants/
  types/
```

---

### 14. **Sin logging/monitoring**

**Severidad:** 🟡 MEDIA  
**Recomendación:** Integrar Sentry o LogRocket para errores en producción

---

## ✅ ASPECTOS POSITIVOS

### Bien hecho:

✅ **Dark mode implementado correctamente** - buen uso de context  
✅ **Componentes funcionales modernos** - hooks bien utilizados  
✅ **Validación de formulario robusto** - regex de teléfono válido  
✅ **Compresión de imágenes** - evita carga lenta  
✅ **UI/UX clara** - diseño profesional con Tailwind  
✅ **Responsive design** - funciona en móvil/tablet/desktop  
✅ **React Router bien implementado**  
✅ **Separación de responsabilidades** - servicios independientes

---

## 📋 PLAN DE ACCIÓN - PRIORIDAD

### ANTES de publicar en GitHub:

| Prioridad | Tarea                                  | Tiempo | Impacto |
| --------- | -------------------------------------- | ------ | ------- |
| 🔴 P0     | Eliminar credenciales del historio Git | 30 min | CRÍTICO |
| 🔴 P0     | Regenerar Google Apps Script URL       | 15 min | CRÍTICO |
| 🔴 P0     | Regenerar reCAPTCHA keys               | 15 min | CRÍTICO |
| 🔴 P0     | Crear `.env.example` sin valores       | 10 min | CRÍTICO |
| 🟠 P1     | Documentar cómo manejar credenciales   | 20 min | ALTO    |
| 🟠 P1     | Centralizar documentación              | 1h     | ALTO    |
| 🟡 P2     | Eliminar estado duplicado en theme     | 45 min | MEDIO   |
| 🟡 P2     | Agregar manejo robusto de errores      | 2h     | MEDIO   |
| 🟡 P3     | Crear archivo constants.js             | 30 min | BAJO    |
| 🟡 P3     | Refactorizar estructura de carpetas    | 2h     | BAJO    |

---

## 🔒 CHECKLIST PRE-GITHUB

- [ ] Eliminar `.env` del historial Git
- [ ] Regenerar todas las credenciales
- [ ] Crear `.env.example`
- [ ] Crear `CONTRIBUTING.md`
- [ ] Crear `SECURITY.md`
- [ ] Consolidar documentación en `docs/`
- [ ] Actualizar README.md
- [ ] Agregar `LICENSE`
- [ ] Agregar `.github/workflows/` para CI/CD
- [ ] Documentar configuración inicial
- [ ] Revisar todos los console.log() y removeAll
- [ ] Validar que no haya rutas hardcodeadas
- [ ] Verificar todas las variables de entorno
- [ ] Crear guía de contribución
- [ ] Documentar flujo de desarrollo

---

## 🎯 RECOMENDACIONES ADICIONALES

### 1. Agregar ESLint + Prettier

```json
{
	"devDependencies": {
		"eslint": "^8.0.0",
		"eslint-config-react-app": "^7.0.0",
		"prettier": "^3.0.0"
	}
}
```

### 2. Agregar Type Safety

```bash
npm install typescript @types/react @types/react-dom
```

### 3. Agregar Testing

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### 4. Mejorar CI/CD

Crear `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

---

## 📝 CONCLUSIÓN

**Estado Actual:** Proyecto funcional y bien estructurado  
**Listo para GitHub:** ❌ NO - Resolver P0 primero  
**Listo para producción:** ❌ NO - Resolver críticas

**Próximos pasos:**

1. Resolver todos los P0 (30-60 min)
2. Implementar P1 (2-3 horas)
3. Considerar P2 y P3 para futuras versiones

---

**Revisado por:** Code Review Senior  
**Fecha:** 2026-02-03  
**Confidencial:** ⚠️ Contiene información sensible
