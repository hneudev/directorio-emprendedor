# Actualización: Campo de Foto del Producto

## Resumen

Se ha agregado con éxito un nuevo campo al formulario de registro para que los emprendedores carguen una foto de su producto o servicio. Este campo es **obligatorio** y sigue el mismo patrón de validación y compresión que el campo del logo.

## Cambios Realizados

### 1. **Componente: RegistrationForm.jsx**

#### Estado actualizado:

```javascript
const [formData, setFormData] = useState({
	// ... campos anteriores
	fotoProducto: null, // ✅ NUEVO CAMPO
	// ...
});

const [productFileName, setProductFileName] = useState(""); // ✅ NUEVO
const productFileInputRef = useRef(null); // ✅ NUEVO
```

#### Nueva función handler:

```javascript
const handleProductFileChange = async (e) => {
	// Valida que sea una imagen
	// Comprime a máximo 1MB
	// Convierte a base64
	// Almacena en formData.fotoProducto
};
```

#### Campo visual agregado:

- Ubicación: Después del campo de Logo (aproximadamente línea 380)
- Etiqueta: "Foto del Producto del Negocio \*"
- Funcionalidad: Drag & drop o click para seleccionar imagen
- Validación: PNG, JPG, GIF (máx. 1MB)
- Retroalimentación: Muestra nombre de archivo cuando se selecciona

#### Validación actualizada:

```javascript
const isFormValid = () => {
  return (
    // ... validaciones anteriores
    formData.fotoProducto &&  // ✅ Ahora requiere foto del producto
    // ...
  );
};
```

#### Manejo de formulario:

- El reset después de envío ahora limpia `fotoProducto` y `productFileName`
- El ref se limpia correctamente al limpiar el formulario

### 2. **Servicio de API: services/api.js**

#### Validación actualizada:

```javascript
export function validateFormData(data) {
	const required = [
		"nombreResponsable",
		"whatsapp",
		"nombreEmprendimiento",
		"descripcion",
		"archivoLogo",
		"fotoProducto", // ✅ NUEVO CAMPO REQUERIDO
		"captchaToken",
	];

	// Validación específica para fotoProducto
	if (data.fotoProducto && !data.fotoProducto.data) {
		errors.push("Archivo de foto del producto inválido");
	}
}
```

### 3. **Backend: GOOGLE_APPS_SCRIPT_TEMPLATE.js**

#### Encabezados de la hoja actualizado:

```javascript
const encabezados = [
	"Fecha y Hora",
	"Nombre del Responsable",
	"WhatsApp",
	"Nombre del Emprendimiento",
	"Instagram",
	"Facebook",
	"Descripción",
	"Archivo Logo",
	"Foto del Producto", // ✅ NUEVA COLUMNA
	"reCAPTCHA",
];
```

#### Almacenamiento de datos:

```javascript
const fila = [
	// ... datos anteriores
	data.fotoProducto?.name || "", // ✅ Nombre de archivo en Sheet
	// ...
];
```

#### Guardado en Google Drive:

```javascript
// Si hay una foto del producto, guárdala en Drive
if (data.fotoProducto && data.fotoProducto.data) {
	guardarFotoProducto(data.fotoProducto, data.nombreEmprendimiento);
}

// Nueva función:
function guardarFotoProducto(fotoProducto, nombreEmprendimiento) {
	// Decodifica base64
	// Crea carpeta "Fotos de Productos - Emprendedores" en Drive
	// Guarda el archivo
}
```

## Funcionalidad del Campo

### Flujo de Usuario:

1. Usuario navega a `/registro`
2. Completa todos los campos del formulario
3. **NUEVO**: Selecciona una foto de su producto o servicio
4. La foto se comprime automáticamente a máximo 1MB
5. Se muestra confirmación visual con el nombre del archivo
6. Al enviar el formulario, la foto se sube junto con el logo

### Validaciones:

- ✅ Campo obligatorio (marca \*)
- ✅ Solo acepta imágenes (PNG, JPG, GIF)
- ✅ Compresión automática (máx. 1MB)
- ✅ Conversión a base64 para envío
- ✅ Manejo de errores con mensajes claros

### Almacenamiento:

- **Google Sheets**: Nombre de archivo en columna "Foto del Producto"
- **Google Drive**: Carpeta "Fotos de Productos - Emprendedores"
  - Similar a como se guardan los logos

## Archivos Modificados

1. `src/components/RegistrationForm.jsx` - Lógica y vista del formulario
2. `src/services/api.js` - Validación del campo nuevo
3. `GOOGLE_APPS_SCRIPT_TEMPLATE.js` - Almacenamiento en Drive y Sheets

## Testing Recomendado

1. **Validación del campo**:
   - Intentar enviar sin foto de producto → debe mostrar error
   - Campo debe ser requerido (\*)

2. **Compresión de imagen**:
   - Subir imagen grande → debe comprimirse a <1MB
   - Verificar en Google Drive que el archivo sea más pequeño

3. **Visualización en Sheets**:
   - Verificar que aparece en columna "Foto del Producto"
   - Verificar que el nombre de archivo es correcto

4. **Interfaz de usuario**:
   - Verificar drag & drop funciona
   - Verificar nombre del archivo se muestra después de seleccionar
   - Verificar estilos Tailwind se aplican correctamente

## Próximos Pasos (Opcional)

Si deseas mejorar aún más esta funcionalidad:

1. **Validación de tamaño mínimo**: Asegurar foto sea lo suficientemente grande
2. **Previsualización**: Mostrar thumbnail de la imagen seleccionada
3. **Metadatos**: Guardar dimensiones originales de la foto
4. **Galería**: Crear sección en landing page con las fotos de los productos
5. **Filtros**: Permitir búsqueda por categoría de producto

## Notas Importantes

⚠️ **Antes de desplegar en producción**:

- Prueba el flujo completo con Google Apps Script
- Verifica que los archivos se guardan correctamente en Drive
- Prueba con imágenes de diferentes tamaños y formatos
- Asegúrate que el `SPREADSHEET_ID` está configurado correctamente en el Apps Script
- Verifica que la carpeta de Google Drive se crea exitosamente

✅ **El código está listo para usar**, solo necesitas:

1. Actualizar el Google Apps Script con el código de `GOOGLE_APPS_SCRIPT_TEMPLATE.js`
2. Redeploy el Apps Script como Web App

---

**Fecha de actualización**: 2024
**Versión**: 1.1.0
