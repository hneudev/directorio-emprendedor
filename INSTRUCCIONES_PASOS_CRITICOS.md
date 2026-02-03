# 🔐 INSTRUCCIONES PARA PASOS CRÍTICOS (P11-P12)

**Estado:** Listo para fase de credenciales  
**Fecha:** Febrero 3, 2026  
**Responsabilidad:** Usuario (requiere acceso a Google Cloud)

---

## 📋 RESUMEN DE LA SITUACIÓN

### Lo que está hecho ✅

- Estructura de código mejorada (10 pasos)
- Logging y error handling implementados
- Validación de datos en frontend
- Documentación centralizada

### Lo que falta 🔴

- Credenciales de Google Apps Script (expuestas actualmente)
- Credenciales de reCAPTCHA (expuestas actualmente)

### Riesgo de seguridad actual

```
⚠️ CRÍTICO: El archivo .env contiene:
   • reCAPTCHA key: VITE_RECAPTCHA_KEY=6LdNul8sAAAAAOrpqIMC4GRItu8Y8TjDz1qlYUdx
   • AppScript URL expuesta en .env y en git history

   ⚠️ CUALQUIERA PUEDE USAR ESTAS CREDENCIALES
```

---

## 🔧 PASO 11: Regenerar Google Apps Script URL

### Prerrequisitos:

- Cuenta de Google
- Acceso a Google Apps Script (script.google.com)
- Editor de código

### Pasos detallados:

#### 1. Crear nuevo AppScript

```
1. Ir a: https://script.google.com
2. Click en "+ Proyecto nuevo"
3. Nombrarlo: "Emprendedores Anónimos - Backend v2" (o similar)
4. Esperar a que cargue el editor
```

#### 2. Agregar código validado (IMPORTANTE)

```javascript
// Este AppScript DEBE incluir:

function doPost(e) {
	try {
		// 1. Validar origen
		const origin = e.parameter.origin || "";
		// CAMBIAR A TU DOMINIO CUANDO DESPLIEGUES
		const allowedOrigins = [
			"http://localhost:5173",
			"http://localhost:3000",
			// 'https://emprendedores.com' // Agregar cuando tengas dominio
		];

		if (!allowedOrigins.includes(origin) && allowedOrigins[0] !== "*") {
			return ContentService.createTextOutput(
				JSON.stringify({ success: false, message: "Origen no permitido" })
			).setMimeType(ContentService.MimeType.JSON);
		}

		// 2. Validar estructura de datos
		const data = JSON.parse(e.postData.contents);

		const required = ["nombreResponsable", "whatsapp", "nombreEmprendimiento", "descripcion", "captchaToken"];

		for (const field of required) {
			if (!data[field]) {
				throw new Error(`Campo requerido faltante: ${field}`);
			}
		}

		// 3. Validar reCAPTCHA (IMPORTANTE)
		const recaptchaToken = data.captchaToken;
		const recaptchaSecret = PropertiesService.getScriptProperties().getProperty("RECAPTCHA_SECRET");

		if (!recaptchaSecret) {
			Logger.log("ERROR: RECAPTCHA_SECRET no configurado");
			throw new Error("Servidor no configurado correctamente");
		}

		const recaptchaResponse = validateRecaptcha(recaptchaToken, recaptchaSecret);

		if (!recaptchaResponse.success || recaptchaResponse.score < 0.5) {
			Logger.log("reCAPTCHA falló:", recaptchaResponse);
			throw new Error("reCAPTCHA no válido");
		}

		// 4. Sanitizar datos
		const sanitized = {
			nombreResponsable: sanitizeString(data.nombreResponsable),
			whatsapp: sanitizePhone(data.whatsapp),
			nombreEmprendimiento: sanitizeString(data.nombreEmprendimiento),
			descripcion: sanitizeString(data.descripcion),
			instagram: sanitizeString(data.instagram || ""),
			facebook: sanitizeString(data.facebook || ""),
			email: sanitizeEmail(data.email || ""),
			archivoLogo: data.archivoLogo || {},
			fotoProducto: data.fotoProducto || {},
			timestamp: new Date().toISOString(),
		};

		// 5. Verificar duplicados
		if (existeDuplicate(sanitized.whatsapp)) {
			throw new Error("Este número ya está registrado");
		}

		// 6. Guardar en Sheets
		const sheet = SpreadsheetApp.getActiveSheet();
		sheet.appendRow([
			sanitized.timestamp,
			sanitized.nombreResponsable,
			sanitized.whatsapp,
			sanitized.nombreEmprendimiento,
			sanitized.descripcion,
			sanitized.instagram,
			sanitized.facebook,
			JSON.stringify(sanitized.archivoLogo),
			JSON.stringify(sanitized.fotoProducto),
		]);

		// 7. Log de éxito
		Logger.log("Registro guardado:", sanitized);

		return ContentService.createTextOutput(
			JSON.stringify({
				success: true,
				message: "Registro guardado correctamente",
				id: sheet.getLastRow(),
			})
		).setMimeType(ContentService.MimeType.JSON);
	} catch (error) {
		Logger.log("ERROR en doPost:", error);

		return ContentService.createTextOutput(
			JSON.stringify({
				success: false,
				message: error.message || "Error al procesar solicitud",
			})
		).setMimeType(ContentService.MimeType.JSON);
	}
}

function validateRecaptcha(token, secret) {
	const url = "https://www.google.com/recaptcha/api/siteverify";

	const payload = {
		secret: secret,
		response: token,
	};

	const options = {
		method: "post",
		payload: payload,
		muteHttpExceptions: true,
	};

	const response = UrlFetchApp.fetch(url, options);
	return JSON.parse(response.getContentText());
}

function sanitizeString(str) {
	if (!str) return "";
	return String(str)
		.trim()
		.substring(0, 500) // Límite de caracteres
		.replace(/[<>\"']/g, ""); // Remove peligrosas
}

function sanitizePhone(phone) {
	if (!phone) return "";
	return String(phone).replace(/[^0-9+()-]/g, "");
}

function sanitizeEmail(email) {
	if (!email) return "";
	return String(email).trim().substring(0, 100);
}

function existeDuplicate(whatsapp) {
	const sheet = SpreadsheetApp.getActiveSheet();
	const data = sheet.getDataRange().getValues();

	for (let i = 1; i < data.length; i++) {
		if (data[i][2] === whatsapp) {
			// Column 2 es whatsapp
			return true;
		}
	}
	return false;
}
```

#### 3. Configurar propiedades del script

```
1. Click en "Proyecto" → "Configuración del proyecto"
2. Copiar Project ID
3. Click en "Secretos" → "Agregar secreto"
4. Nombre: RECAPTCHA_SECRET
5. Valor: Tu reCAPTCHA secret key (de paso 12)
6. Guardar
```

#### 4. Desplegar como Web App

```
1. Click en "Implementar" → "Nueva implementación"
2. Seleccionar tipo: "Aplicación web"
3. Configurar como:
   - Ejecutar como: Tu cuenta Google
   - Quién tiene acceso: Cualquiera
4. Copiar el URL de despliegue (es tu nuevo API_URL)
5. Guardar URL, lo necesitarás en el .env
```

#### 5. Actualizar .env local

```bash
# Reemplazar antigua URL con la nueva:
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/[NUEVA_ID]/usercodeJS

# También necesitarás agregar el secret cuando lo tengas:
VITE_RECAPTCHA_SECRET=6Lc[TU_SECRET_KEY]
```

---

## 🔑 PASO 12: Regenerar claves reCAPTCHA

### Prerrequisitos:

- Cuenta de Google
- Acceso a Google reCAPTCHA Admin Console

### Pasos detallados:

#### 1. Ir a Google reCAPTCHA Admin

```
1. Ir a: https://www.google.com/recaptcha/admin
2. Log in con tu cuenta Google
3. Click en "+" para crear nuevo sitio
```

#### 2. Configurar nuevo sitio

```
Nombre del sitio:
  → "Emprendedores Anónimos"

Tipo de reCAPTCHA:
  → reCAPTCHA v3 (NO v2)

Dominios:
  → localhost (para desarrollo)
  → Tu dominio cuando lo tengas (ej: emprendedores.com)

Aceptar términos
Click en "CREAR"
```

#### 3. Copiar claves

```
Copiar AMBAS claves:

SITE KEY (pública, en código frontend):
  6Lc...xxxxx

SECRET KEY (privada, SOLO en backend):
  6Lc...xxxxx (muy importante: no compartir)
```

#### 4. Actualizar .env

```bash
# Frontend (pública, está bien):
VITE_RECAPTCHA_KEY=6Lc[TU_SITE_KEY]

# Backend (privada, PROTEGER):
VITE_RECAPTCHA_SECRET=6Lc[TU_SECRET_KEY]
```

#### 5. Actualizar código si es necesario

```javascript
// src/components/RegistrationForm.jsx
// Ya debería tener la key correcta

<ReCAPTCHA
	sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
	onChange={onCaptchaChange}
/>

// El secreto se usa en AppScript (paso 11)
```

---

## 🔐 LIMPIAR HISTORIAL GIT (PASO 13)

### ⚠️ ADVERTENCIA IMPORTANTE

Este paso reescribe la historia de Git. Necesita ser hecho por TODO el equipo.

### Pasos:

```bash
# 1. Hacer backup local
git clone https://github.com/[usuario]/emprendedores-anonimos .backup

# 2. Remover .env del historial
git filter-branch --tree-filter 'rm -f .env' -- --all

# 3. Force push (sobrescribe historial remoto)
git push origin --force --all

# 4. Force push tags
git push origin --force --tags

# 5. Advertir al equipo
# "Se limpió el historial de Git. Haz un nuevo clone."
```

### Después de limpiar:

```bash
# Todos los miembros del equipo deben hacer:
rm -rf emprendedores-anonimos
git clone https://github.com/[usuario]/emprendedores-anonimos
```

---

## ✅ CHECKLIST FINAL

- [ ] Regenerar Google Apps Script URL (Paso 11)
- [ ] Regenerar reCAPTCHA keys (Paso 12)
- [ ] Copiar nuevas claves a .env local
- [ ] Configurar reCAPTCHA secret en AppScript
- [ ] Probar en localhost que todo funciona
- [ ] Limpiar historial de Git (Paso 13)
- [ ] Force push a GitHub
- [ ] Avisar al equipo
- [ ] Eliminar .env antiguo (no está en repo ahora)
- [ ] Verificar que .gitignore está correcto

---

## 🧪 PRUEBAS POST-REGENERACIÓN

```bash
npm run dev

# En otra terminal:
# 1. Ir a http://localhost:5173/registro
# 2. Llenar formulario de prueba
# 3. Enviar
# 4. Verificar en Google Sheets que se guardó
# 5. Verificar en logs de AppScript
# 6. Verificar en console del navegador
```

---

## 📞 SOPORTE Y REFERENCIAS

**Google Apps Script Documentation:**

- https://developers.google.com/apps-script

**reCAPTCHA v3 Documentation:**

- https://developers.google.com/recaptcha/docs/v3

**Google Sheets API:**

- https://developers.google.com/sheets

---

**Versión:** 1.0  
**Última actualización:** 2026-02-03  
**Autor:** Code Review Senior
