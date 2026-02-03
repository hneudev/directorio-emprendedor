# 🔒 SECURITY POLICY

## Vulnerabilidades Reportadas

Si encuentras una vulnerabilidad de seguridad, **NO la publiques en Issues públicas**.

Por favor, envía un email a: **[contacto@seguridad.com]** con:

- Descripción de la vulnerabilidad
- Pasos para reproducir
- Posible impacto
- Sugerencia de parche (opcional)

Nos comprometeemos a responder en 48 horas.

---

## 🔐 Configuración de Seguridad

### 1. Variables de Entorno

**CRÍTICO:** Estas credenciales NUNCA deben estar en control de versión:

```env
VITE_GOOGLE_APPS_SCRIPT_URL
VITE_RECAPTCHA_KEY
```

**Cómo configurar localmente:**

```bash
# 1. Copiar template
cp .env.example .env

# 2. Editar .env con tus valores reales
nano .env

# 3. Verificar que .env está en .gitignore
grep -q ".env" .gitignore && echo "OK" || echo "ERROR"
```

**Cómo configurar en producción (Vercel/Netlify):**

```bash
# Usar panel de admin:
# Vercel: Settings > Environment Variables
# Netlify: Site settings > Build & deploy > Environment

# Variables necesarias:
VITE_GOOGLE_APPS_SCRIPT_URL = https://...
VITE_RECAPTCHA_KEY = 6Ld...
```

---

### 2. Google Apps Script

El AppScript DEBE incluir validaciones:

```javascript
function doPost(e) {
	try {
		// 1. Validar origen
		const referrer = e.contextPath;
		const allowedOrigins = ["https://yourdomain.com", "http://localhost:5173"];
		if (!allowedOrigins.includes(new URL(referrer).origin)) {
			throw new Error("Invalid origin");
		}

		// 2. Validar token reCAPTCHA
		const formData = JSON.parse(e.postData.contents);
		const captchaToken = formData.captchaToken;

		const response = UrlFetchApp.fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "post",
			payload: {
				secret: PropertiesService.getScriptProperties().getProperty("RECAPTCHA_SECRET"),
				response: captchaToken,
			},
		});

		const result = JSON.parse(response.getContentText());
		if (result.score < 0.5) {
			throw new Error("reCAPTCHA validation failed");
		}

		// 3. Sanitizar y validar datos
		const data = {
			nombreResponsable: String(formData.nombreResponsable).trim(),
			// ... más validaciones
		};

		// 4. Verificar duplicados
		const sheet = SpreadsheetApp.getActiveSheet();
		const values = sheet.getDataRange().getValues();
		for (let i = 0; i < values.length; i++) {
			if (values[i][2] === data.nombreEmprendimiento) {
				throw new Error("Emprendimiento ya registrado");
			}
		}

		// 5. Guardar con timestamp
		sheet.appendRow([
			new Date(),
			data.nombreResponsable,
			data.nombreEmprendimiento,
			// ...
		]);

		return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
	} catch (error) {
		Logger.log("Error: " + error);
		return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message })).setMimeType(
			ContentService.MimeType.JSON
		);
	}
}
```

---

### 3. reCAPTCHA v3

**Configuración correcta:**

1. Ir a https://www.google.com/recaptcha/admin
2. Crear sitio nuevo
3. reCAPTCHA v3
4. Dominios autorizados:
   - `yourdomain.com`
   - `www.yourdomain.com`
   - `localhost` (solo desarrollo)
5. Copiar "Site Key" a `.env.example`
6. Guardar "Secret Key" en Google Apps Script

---

### 4. Validación de Formularios

**Frontend (no suficiente, solo UX):**

```javascript
// ✅ Para mejorar experiencia del usuario
// ❌ NO es suficiente para seguridad
validatePhoneNumber(phone) { ... }
validateEmail(email) { ... }
```

**Backend (OBLIGATORIO):**

```javascript
// ✅ Validación real en Google Apps Script
function validateFormData(data) {
	if (!data.nombreResponsable || data.nombreResponsable.length === 0) {
		throw new Error("nombreResponsable requerido");
	}
	// ... más validaciones
}
```

---

### 5. Rate Limiting

**Problema:** Sin protección contra fuerza bruta

**Solución (en Google Apps Script):**

```javascript
function isRateLimited(userId) {
	const cache = CacheService.getUserCache();
	const key = "request_count_" + userId;
	const count = parseInt(cache.get(key) || "0");

	if (count > 10) {
		// 10 solicitudes por hora
		return true;
	}

	cache.put(key, String(count + 1), 3600); // 1 hora
	return false;
}
```

---

### 6. Logging y Monitoreo

**Habilitar en producción:**

```javascript
// En Google Apps Script
function logSecurityEvent(event, details) {
	const sheet = SpreadsheetApp.getSheetByName("Security Logs");
	sheet.appendRow([new Date(), event, details, Session.getEffectiveUser().getEmail()]);
}
```

---

### 7. HTTPS Only

**Verificar:**

- ✅ Sitio debe estar en HTTPS en producción
- ✅ Usar HSTS header
- ❌ Nunca usar HTTP en producción

---

### 8. Content Security Policy

**Agregar a `vite.config.js`:**

```javascript
export default defineConfig({
	server: {
		headers: {
			"Content-Security-Policy": [
				"default-src 'self'",
				"script-src 'self' 'unsafe-inline' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
				"frame-src https://www.google.com/recaptcha/",
				"connect-src 'self' https://www.google.com/recaptcha/ https://script.google.com/",
			].join("; "),
		},
	},
});
```

---

### 9. Dependencias Vulnerables

**Verificar regularmente:**

```bash
npm audit
npm audit fix

# CI/CD debe fallar si hay vulnerabilidades críticas
```

---

## 📋 Checklist de Seguridad

### Antes de cada deploy:

- [ ] ¿Todas las credenciales están en `.env` (no en código)?
- [ ] ¿`.env` está en `.gitignore`?
- [ ] ¿Google Apps Script valida todos los datos?
- [ ] ¿reCAPTCHA está configurado correctamente?
- [ ] ¿Se validan números de teléfono en backend?
- [ ] ¿No hay console.log() de datos sensibles?
- [ ] ¿HTTPS está habilitado?
- [ ] ¿Rate limiting está activo?
- [ ] ¿npm audit pasa sin críticas?
- [ ] ¿Logs se están guardando?

---

## 🚨 Protocolo de Respuesta a Incidentes

Si se detecta una brecha:

1. **Inmediatamente:**
   - Revocar credenciales comprometidas
   - Regenerar Google Apps Script URL
   - Regenerar reCAPTCHA keys

2. **Dentro de 1 hora:**
   - Desplegar fix
   - Notificar usuarios afectados

3. **Dentro de 24 horas:**
   - Análisis post-mortem
   - Reporte completo
   - Plan de prevención

---

## Contacto

**Security Email:** [contacto@seguridad.com]  
**Response Time:** 48 horas máximo  
**Última actualización:** Febrero 3, 2026
