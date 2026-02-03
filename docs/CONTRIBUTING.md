# 🤝 Guía de Contribución

Gracias por tu interés en contribuir a Directorio Emprendedor. Este documento explica cómo colaborar de forma efectiva.

## 📋 Índice

- [Código de Conducta](#código-de-conducta)
- [¿Cómo Empezar?](#cómo-empezar)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Funcionalidades](#solicitar-funcionalidades)
- [Guía de Pull Request](#guía-de-pull-request)
- [Estándares de Código](#estándares-de-código)
- [Commit Messages](#commit-messages)

---

## Código de Conducta

- Sé respetuoso y profesional
- No tolera discriminación
- Reporta comportamiento inapropiado a [contacto@seguridad.com]
- Enfócate en lo que es mejor para la comunidad

---

## ¿Cómo Empezar?

### 1. Fork y Clone

```bash
# Fork en GitHub
# Luego clone tu fork
git clone https://github.com/TU_USUARIO/directorio-emprendedor.git
cd directorio-emprendedor

# Agrega upstream
git remote add upstream https://github.com/ORIGINAL_REPO/directorio-emprendedor.git
```

### 2. Configura el Ambiente

```bash
# Instala Node 16+
node --version

# Instala dependencias
npm install

# Configura variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de desarrollo
```

### 3. Crea una Rama

```bash
# Actualiza main
git fetch upstream
git rebase upstream/main

# Crea rama descriptiva
git checkout -b feature/nombre-descriptivo
# o para bugs:
git checkout -b fix/descripcion-bug
```

---

## Reportar Bugs

### 🐛 Antes de reportar:

1. Verifica si el bug ya está reportado
2. Prueba con la última versión
3. Limpia caché del navegador
4. Prueba en navegador diferente

### Cómo reportar:

**Usa este template:**

```markdown
### Descripción

[Descripción clara del bug]

### Pasos para reproducir

1. ...
2. ...
3. ...

### Comportamiento esperado

[Qué debería pasar]

### Comportamiento actual

[Qué pasa realmente]

### Screenshots/Videos

[Si aplica]

### Ambiente

- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Firefox/Safari]
- Versión: [Node/React version]

### Logs

\`\`\`
[Pega logs de error aquí]
\`\`\`

### Workaround

[Si existe alguna solución temporal]
```

---

## Solicitar Funcionalidades

### 📝 Template:

```markdown
### Descripción

[Qué funcionalidad quieres agregar]

### Caso de uso

[Por qué es útil]

### Ejemplo de implementación

[Cómo imaginas que funcione]

### Alternativas consideradas

[Otros enfoques posibles]

### Contexto adicional

[Información relevante]
```

---

## Guía de Pull Request

### ✅ Antes de enviar PR:

1. **Actualiza tu rama:**

```bash
git fetch upstream
git rebase upstream/main
```

2. **Prueba localmente:**

```bash
npm run dev      # Verifica que funciona
npm run build    # Verifica que compila
npm run lint     # Verifica estilos (si aplica)
```

3. **Prueba en múltiples navegadores:**
   - Chrome
   - Firefox
   - Safari (si tienes Mac)

4. **Verifica cambios de seguridad:**

```bash
npm audit
# No debe haber vulnerabilidades críticas
```

### 📝 Descripción del PR:

```markdown
## Descripción

[Descripción clara de cambios]

## Tipo de cambio

- [ ] 🐛 Bug fix
- [ ] ✨ Funcionalidad nueva
- [ ] 📝 Documentación
- [ ] 🎨 Cambios de UI/UX
- [ ] ♻️ Refactor
- [ ] 🔒 Seguridad

## ¿Cómo se prueba esto?

[Pasos para verificar]

## Checklist

- [ ] Mi código sigue los estándares del proyecto
- [ ] Agregué tests (si aplica)
- [ ] Actualicé documentación
- [ ] No introduje errores de linting
- [ ] Probé en múltiples navegadores
- [ ] No hay vulnerabilidades de seguridad

## Cambios de Breaking (si aplica)

[Describe cambios que rompan compatibilidad]

## Tickets relacionados

Cierra #[número] (si aplica)

## Screenshots/Videos (si aplica)

[Evidencia de cambios]
```

---

## Estándares de Código

### JavaScript/React

```javascript
// ✅ BIEN
const handleSubmit = (e) => {
	e.preventDefault();
	const { name, email } = formData;

	if (!name.trim()) {
		showError("Name is required");
		return;
	}

	submitForm(formData);
};

// ❌ MAL
const handleSubmit = (e) => {
	e.preventDefault();
	submitForm(e.target.value); // No extraer datos
};
```

### Nombres descriptivos

```javascript
// ✅ BIEN
const isFormValid = () => { ... }
const handlePhoneChange = (value) => { ... }
const validateEmail = (email) => { ... }

// ❌ MAL
const check = () => { ... }
const handle = (v) => { ... }
const val = (e) => { ... }
```

### Comentarios

```javascript
// ✅ BIEN - Explica POR QUÉ
// Validamos en frontend para UX, pero backend también valida
if (!email.includes('@')) { ... }

// ❌ MAL - Explica QUÉ (obvio del código)
// Check if email is valid
if (!email.includes('@')) { ... }
```

### Manejo de errores

```javascript
// ✅ BIEN
try {
	const response = await submitForm(data);
	showSuccess("Form submitted");
} catch (error) {
	console.error("Form submission failed:", error);
	showError(error.message || "Unknown error");
}

// ❌ MAL
try {
	submitForm(data);
} catch (e) {
	alert("Error"); // Nunca usar alert
}
```

### Estructura de componentes

```javascript
// ✅ BIEN
function MyComponent() {
  // 1. Imports
  // 2. State
  const [data, setData] = useState(...);

  // 3. Effects
  useEffect(() => { ... }, []);

  // 4. Handlers
  const handleChange = (e) => { ... };

  // 5. Render
  return <div>...</div>;
}

// ❌ MAL
function MyComponent() {
  return <div>...</div>;
  const [data, setData] = useState(...);
}
```

---

## Commit Messages

### Formato

```
<tipo>(<ámbito>): <descripción>

<cuerpo>

<footer>
```

### Tipos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios de documentación
- `style`: Cambios de formato (no código)
- `refactor`: Reorganización de código
- `test`: Agregar/actualizar tests
- `chore`: Cambios de build, deps, etc.
- `security`: Cambios de seguridad

### Ejemplos

```bash
# ✅ BIEN
git commit -m "feat(form): agregar validación de teléfono"
git commit -m "fix(navbar): corregir oscuridad de dark mode en móvil"
git commit -m "docs: actualizar guía de instalación"
git commit -m "security: validar reCAPTCHA en backend"

# ❌ MAL
git commit -m "fix stuff"
git commit -m "actualizaciones"
git commit -m "cambios varios"
```

### Commit detallado

```bash
git commit -m "feat(registration): add image compression for logos

- Implementa browser-image-compression
- Reduce tamaño máximo a 1MB
- Valida formato de imagen antes de procesar
- Muestra mensaje de error si falla

Relates to #123"
```

---

## Flujo de Trabajo Típico

```bash
# 1. Actualizar rama local
git fetch upstream
git rebase upstream/main

# 2. Crear rama
git checkout -b feature/nueva-funcionalidad

# 3. Hacer cambios y commits
git add .
git commit -m "feat(feature): descripción"

# 4. Verificar antes de push
npm run build
npm run lint

# 5. Push a tu fork
git push origin feature/nueva-funcionalidad

# 6. Crear Pull Request en GitHub
# (El sitio te mostrará un botón)

# 7. Una vez aprobado:
git fetch upstream
git rebase upstream/main
git push origin feature/nueva-funcionalidad
```

---

## Revisión de Código

### Lo que buscamos:

✅ Código limpio y legible  
✅ Cambios mínimos y enfocados  
✅ Tests o evidencia de pruebas  
✅ Sin vulnerabilidades de seguridad  
✅ Documentación actualizada

### Proceso de aprobación:

1. Al menos 1 maintainer revisa
2. Se piden cambios si es necesario
3. Una vez aprobado, se hace merge a `main`
4. GitHub Actions ejecuta tests automáticamente

---

## Preguntas Frecuentes

**¿Dónde reporto vulnerabilidades de seguridad?**

> Ve a [SECURITY.md](./SECURITY.md)

**¿Cómo agrego mis credenciales de desarrollo?**

> Copia `.env.example` a `.env` y edita. NUNCA commits `.env`

**¿Debo agregar tests?**

> Sí para funcionalidad crítica. Verifica primera qué está en el proyecto.

**¿Cómo me convierto en maintainer?**

> Contribuye regularmente con PRs de calidad, eventualmente te ofreceremos.

---

## Recursos Útiles

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [Git Documentation](https://git-scm.com/doc)
- [Código de Conducta](./CODE_OF_CONDUCT.md)

---

## Gracias! 🙏

Tu contribución es valiosa para la comunidad de emprendedores.

**Última actualización:** Febrero 3, 2026
