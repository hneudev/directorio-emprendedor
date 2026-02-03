# Placeholders Pendientes de Personalización

## ✅ INFORMACIÓN ACTUALIZADA

Los siguientes datos ya han sido personalizados con la información oficial de Emprendedores Anónimos:

### Footer (LandingPage.jsx)

- ✅ **Logo:** Actualizado con imagen real (`/assets/logo_emprendedores anonimos.jpeg`)
- ✅ **Nombre:** "Emprendedores Anónimos"
- ✅ **Descripción:** Menciona Hermosillo, Sonora
- ✅ **Email:** `emprendedoresanonimos.hmo@gmail.com`
- ✅ **Teléfono:** `662-475-9454` (clickeable con `tel:`)
- ✅ **Ubicación:** "Hermosillo, Sonora"
- ✅ **Instagram:** https://www.instagram.com/emprendedoresanonimoshmo/
- ✅ **Facebook:** https://www.facebook.com/profile.php?id=61581507025991
- ✅ **WhatsApp:** https://wa.me/6624759454
- ✅ **Copyright:** "2026 Emprendedores Anónimos HMO"

### Página de Registro (RegisterPage.jsx)

- ✅ **Email de contacto:** `emprendedoresanonimos.hmo@gmail.com`

---

## ⏳ PLACEHOLDERS PENDIENTES DE PERSONALIZACIÓN

### 1. **Política de Privacidad** (PRIORITARIO)

**Ubicación:** [LandingPage.jsx](LandingPage.jsx#L296)

```javascript
<a
	href='#'
	className='...'>
	Privacidad
</a>
```

**Acción recomendada:**

- Crear página `/privacidad` o `/privacy`
- O crear modal que muestre la política
- Cambiar `href='#'` a `href='/privacidad'`

**Contenido a incluir:**

- Información sobre cómo se protegen los datos
- Tipos de datos recolectados
- Uso de Google Apps Script para almacenar datos
- Declaración sobre anonimato
- Conformidad con LGPD/GDPR si aplica

---

### 2. **Términos y Condiciones** (PRIORITARIO)

**Ubicación:** [LandingPage.jsx](LandingPage.jsx#L301)

```javascript
<a
	href='#'
	className='...'>
	Términos
</a>
```

**Acción recomendada:**

- Crear página `/terminos` o `/terms`
- O crear modal que muestre los términos
- Cambiar `href='#'` a `href='/terminos'`

**Contenido a incluir:**

- Reglas de uso de la plataforma
- Responsabilidades del usuario
- Prohibiciones (spam, contenido ofensivo, etc.)
- Limitaciones de responsabilidad
- Derecho a remover emprendimientos

---

### 3. **Descripción de Servicios** (RECOMENDADO)

**Ubicación:** [LandingPage.jsx - Sección "Nuestros Objetivos"](LandingPage.jsx#L120)

Los textos están bien, pero considera:

- Expandir la sección "¿Quiénes Somos?" con más detalles
- Agregar información sobre cómo encontrar emprendimientos
- Explicar el proceso de búsqueda/filtrado

---

### 4. **Enlaces de Redes Sociales Adicionales** (OPCIONAL)

**Ubicación:** Footer, sección "Síguenos"

Actualmente tiene:

- ✅ Instagram
- ✅ Facebook
- ✅ WhatsApp

Considera agregar (si tienen presencia):

- YouTube (para tutoriales, historias de éxito)
- TikTok (contenido más casual, emprendedores jóvenes)
- LinkedIn (para networking B2B)

---

### 5. **Información de Ubicación Física** (OPCIONAL)

**Ubicación:** Footer, sección "Contacto" - solo muestra ciudad

Si desean compartir ubicación exacta:

- Dirección específica (si tienen oficina)
- Mapa integrado (Google Maps)
- Horario de atención

**Nota:** Se respeta el anonimato mencionando solo la ciudad.

---

### 6. **Formulario de Contacto** (RECOMENDADO)

Actualmente no hay un formulario de contacto separado.

Considerar agregar:

- Página `/contacto` con formulario
- Campos: Nombre, Email, Asunto, Mensaje
- Integración con Google Apps Script para guardar consultas
- Confirmación de envío al usuario

---

### 7. **FAQ / Preguntas Frecuentes** (RECOMENDADO)

**Ubicación:** Página nueva o sección en landing

Preguntas sugeridas:

- ¿Qué es Emprendedores Anónimos?
- ¿Cómo registro mi emprendimiento?
- ¿Mi información está segura?
- ¿Cuál es el costo de registrarse?
- ¿Puedo editar mi información después?
- ¿Cómo busco otros emprendimientos?
- ¿Cómo me comunico con otro emprendedor?

---

### 8. **Página de Directorio/Búsqueda** (IMPORTANTE)

Este es un **componente clave** pero aún no existe.

**Pendiente de crear:**

- Página `/directorio` o `/emprendimientos`
- Sistema de búsqueda y filtros
- Conexión con Google Sheets para mostrar datos
- Visualización de emprendimientos registrados
- Filtros por categoría, ubicación, etc.

---

### 9. **Página de Detalle de Emprendimiento** (IMPORTANTE)

**Pendiente de crear:**

- Ruta: `/emprendimiento/:id`
- Mostrar información completa del emprendimiento
- Logo y foto del producto
- Información de contacto
- Enlaces a redes sociales

---

### 10. **Página de Perfil de Usuario** (OPCIONAL)

**Pendiente de crear:**

- Mostrar emprendimientos registrados por usuario
- Opción para editar información
- Opción para eliminar emprendimiento
- Histórico de registros

---

## RESUMEN PRIORIDADES

### 🔴 CRÍTICO (Necesario para operación)

1. Política de Privacidad
2. Términos y Condiciones
3. Página de Directorio/Búsqueda
4. Página de Detalle de Emprendimiento

### 🟡 IMPORTANTE (Mejora UX)

1. Formulario de Contacto
2. FAQ
3. Página de Perfil

### 🟢 OPCIONAL (Futuro)

1. Redes sociales adicionales
2. Información de ubicación física
3. Elementos de branding adicionales

---

## ARCHIVOS A MODIFICAR

- [LandingPage.jsx](src/pages/LandingPage.jsx) - Actualizar enlaces a nuevas páginas
- [App.jsx](src/App.jsx) - Agregar nuevas rutas
- Crear nuevas páginas en `src/pages/`
