# 🔍 UBICACIÓN EXACTA DE LOS CAMBIOS

## Archivo 1: `src/components/RegistrationForm.jsx`

### Cambio 1: Estado del Componente (Líneas 7-17)

```javascript
// ANTES:
const [formData, setFormData] = useState({
	archivoLogo: null,
});

// DESPUÉS:
const [formData, setFormData] = useState({
	archivoLogo: null,
	fotoProducto: null, // ← NUEVO
});
```

### Cambio 2: Refs y estado para nombre de archivo (Líneas 23-27)

```javascript
// ANTES:
const [fileName, setFileName] = useState("");
const fileInputRef = useRef(null);

// DESPUÉS:
const [fileName, setFileName] = useState("");
const [productFileName, setProductFileName] = useState(""); // ← NUEVO
const fileInputRef = useRef(null);
const productFileInputRef = useRef(null); // ← NUEVO
const recaptchaRef = useRef(null);
```

### Cambio 3: Nueva función handleProductFileChange (Líneas 71-130)

```javascript
// ✅ NUEVA FUNCIÓN COMPLETA AGREGADA AQUÍ
const handleProductFileChange = async (e) => {
	const file = e.target.files[0];
	if (!file) return;

	try {
		setError("");
		setLoading(true);

		if (!file.type.startsWith("image/")) {
			setError("Por favor, selecciona un archivo de imagen");
			productFileInputRef.current.value = "";
			setLoading(false);
			return;
		}

		const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
		const compressedFile = await imageCompression(file, options);
		const reader = new FileReader();

		reader.onload = (event) => {
			const base64String = event.target.result.split(",")[1];
			setFormData((prev) => ({
				...prev,
				fotoProducto: { data: base64String, mime: compressedFile.type, name: file.name },
			}));
			setProductFileName(file.name);
			setLoading(false);
		};

		reader.readAsDataURL(compressedFile);
	} catch (err) {
		setError("Error al procesar la imagen: " + err.message);
		productFileInputRef.current.value = "";
		setLoading(false);
	}
};
```

### Cambio 4: Actualización de handleSubmit - Reset del formulario (Líneas 169-177)

```javascript
// ANTES:
setFormData({
	nombreResponsable: "",
	whatsapp: "",
	nombreEmprendimiento: "",
	instagram: "",
	facebook: "",
	descripcion: "",
	archivoLogo: null,
	captchaToken: null,
});
setFileName("");
if (fileInputRef.current) {
	fileInputRef.current.value = "";
}

// DESPUÉS:
setFormData({
	nombreResponsable: "",
	whatsapp: "",
	nombreEmprendimiento: "",
	instagram: "",
	facebook: "",
	descripcion: "",
	archivoLogo: null,
	fotoProducto: null, // ← NUEVO
	captchaToken: null,
});
setFileName("");
setProductFileName(""); // ← NUEVO
if (fileInputRef.current) {
	fileInputRef.current.value = "";
}
if (productFileInputRef.current) {
	// ← NUEVO
	productFileInputRef.current.value = "";
}
```

### Cambio 5: Validación del formulario (Líneas 196-206)

```javascript
// ANTES:
const isFormValid = () => {
	return (
		formData.nombreResponsable.trim() &&
		formData.whatsapp.trim() &&
		formData.nombreEmprendimiento.trim() &&
		formData.descripcion.trim() &&
		formData.archivoLogo &&
		formData.captchaToken &&
		!loading
	);
};

// DESPUÉS:
const isFormValid = () => {
	return (
		formData.nombreResponsable.trim() &&
		formData.whatsapp.trim() &&
		formData.nombreEmprendimiento.trim() &&
		formData.descripcion.trim() &&
		formData.archivoLogo &&
		formData.fotoProducto && // ← NUEVO - Ahora requiere ambas imágenes
		formData.captchaToken &&
		!loading
	);
};
```

### Cambio 6: Campo visual en JSX (Líneas 383-421)

```javascript
// DESPUÉS DEL CAMPO DE LOGO, SE AGREGÓ:

{
	/* File Upload - Foto del Producto */
}
<div>
	<label
		htmlFor='fotoProducto'
		className='block text-sm font-medium text-gray-700 mb-1'>
		Foto del Producto del Negocio *
	</label>
	<div className='relative'>
		<input
			type='file'
			id='fotoProducto'
			name='fotoProducto'
			ref={productFileInputRef}
			onChange={handleProductFileChange}
			accept='image/*'
			required
			className='hidden'
		/>
		<label
			htmlFor='fotoProducto'
			className='flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-primary-300 rounded-lg bg-primary-50 hover:bg-primary-100 cursor-pointer transition'>
			<div className='text-center'>
				<svg
					className='w-8 h-8 text-primary-600 mx-auto mb-2'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M12 4v16m8-8H4'
					/>
				</svg>
				<p className='text-sm font-medium text-primary-700'>
					{productFileName ? `✓ ${productFileName}` : "Haz clic o arrastra una imagen"}
				</p>
				<p className='text-xs text-gray-500 mt-1'>PNG, JPG, GIF (máx. 1MB)</p>
			</div>
		</label>
	</div>
</div>;
```

### Cambio 7: Closing de formulario y botón (Líneas 422-458)

```javascript
// AGREGADO DESPUÉS DEL CAMPO DE FOTO DEL PRODUCTO:

{/* reCAPTCHA */}
<div className='flex justify-center'>
  {RECAPTCHA_KEY && (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={RECAPTCHA_KEY}
      onChange={handleRecaptcha}
    />
  )}
</div>

{/* Submit Button */}
<button
  type='submit'
  disabled={!isFormValid()}
  className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 ${
    isFormValid()
      ? "bg-primary-600 hover:bg-primary-700 text-white cursor-pointer shadow-md hover:shadow-lg"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}>
  {loading ? "Enviando..." : "Registrar Emprendimiento"}
</button>
</form>
);
}
```

---

## Archivo 2: `src/services/api.js`

### Cambio 1: Validación de campos (Línea 48-68)

```javascript
// ANTES:
export function validateFormData(data) {
  const required = [
    "nombreResponsable",
    "whatsapp",
    "nombreEmprendimiento",
    "descripcion",
    "archivoLogo",
    "captchaToken",
  ];

// DESPUÉS:
export function validateFormData(data) {
  const required = [
    "nombreResponsable",
    "whatsapp",
    "nombreEmprendimiento",
    "descripcion",
    "archivoLogo",
    "fotoProducto",  // ← NUEVO
    "captchaToken",
  ];
```

### Cambio 2: Validación específica de fotoProducto (Línea 65-68)

```javascript
// ANTES:
if (data.archivoLogo && !data.archivoLogo.data) {
	errors.push("Archivo de logo inválido");
}

return {
	isValid: errors.length === 0,
	errors,
};

// DESPUÉS:
if (data.archivoLogo && !data.archivoLogo.data) {
	errors.push("Archivo de logo inválido");
}

if (data.fotoProducto && !data.fotoProducto.data) {
	// ← NUEVO
	errors.push("Archivo de foto del producto inválido");
}

return {
	isValid: errors.length === 0,
	errors,
};
```

---

## Archivo 3: `GOOGLE_APPS_SCRIPT_TEMPLATE.js`

### Cambio 1: Encabezados de Sheets (Línea 73-84)

```javascript
// ANTES:
function agregarEncabezados(sheet) {
  const encabezados = [
    "Fecha y Hora",
    "Nombre del Responsable",
    "WhatsApp",
    "Nombre del Emprendimiento",
    "Instagram",
    "Facebook",
    "Descripción",
    "Archivo Logo",
    "reCAPTCHA",
  ];

// DESPUÉS:
function agregarEncabezados(sheet) {
  const encabezados = [
    "Fecha y Hora",
    "Nombre del Responsable",
    "WhatsApp",
    "Nombre del Emprendimiento",
    "Instagram",
    "Facebook",
    "Descripción",
    "Archivo Logo",
    "Foto del Producto",  // ← NUEVO (Columna I)
    "reCAPTCHA",
  ];
```

### Cambio 2: Datos guardados en Sheets (Línea 42-52)

```javascript
// ANTES:
const fila = [
	new Date().toLocaleString("es-ES"),
	data.nombreResponsable || "",
	data.whatsapp || "",
	data.nombreEmprendimiento || "",
	data.instagram || "",
	data.facebook || "",
	data.descripcion || "",
	data.archivoLogo?.name || "",
	data.captchaToken ? "Verificado" : "No verificado",
];

// DESPUÉS:
const fila = [
	new Date().toLocaleString("es-ES"),
	data.nombreResponsable || "",
	data.whatsapp || "",
	data.nombreEmprendimiento || "",
	data.instagram || "",
	data.facebook || "",
	data.descripcion || "",
	data.archivoLogo?.name || "",
	data.fotoProducto?.name || "", // ← NUEVO
	data.captchaToken ? "Verificado" : "No verificado",
];
```

### Cambio 3: Guardado de fotoProducto en Drive (Línea 56-60)

```javascript
// ANTES:
if (data.archivoLogo && data.archivoLogo.data) {
	guardarLogo(data.archivoLogo, data.nombreEmprendimiento);
}

return sendResponse(true, "Registro guardado exitosamente", 200);

// DESPUÉS:
if (data.archivoLogo && data.archivoLogo.data) {
	guardarLogo(data.archivoLogo, data.nombreEmprendimiento);
}

if (data.fotoProducto && data.fotoProducto.data) {
	// ← NUEVO
	guardarFotoProducto(data.fotoProducto, data.nombreEmprendimiento);
}

return sendResponse(true, "Registro guardado exitosamente", 200);
```

### Cambio 4: Nueva función guardarFotoProducto (Línea 110-128)

```javascript
// ✅ NUEVA FUNCIÓN AGREGADA DESPUÉS DE guardarLogo():

/**
 * Guarda la foto del producto en Google Drive
 */
function guardarFotoProducto(fotoProducto, nombreEmprendimiento) {
	try {
		// Decodifica el base64
		const imageData = Utilities.newBlob(
			Utilities.base64Decode(fotoProducto.data),
			fotoProducto.mime,
			fotoProducto.name
		);

		// Obtén o crea la carpeta 'Fotos de Productos' en Drive
		let folder = getFolderByName("Fotos de Productos - Emprendedores");
		if (!folder) {
			folder = DriveApp.createFolder("Fotos de Productos - Emprendedores");
		}

		// Guarda el archivo
		folder.createFile(imageData);
	} catch (error) {
		console.error("Error al guardar foto del producto:", error);
		// No interrumpimos el proceso si falla la foto
	}
}
```

### Cambio 5: Actualización de testDoPost() (Línea 165-180)

```javascript
// ANTES:
function testDoPost() {
  const testData = {
    nombreResponsable: "Juan Pérez",
    whatsapp: "+1234567890",
    nombreEmprendimiento: "Mi Negocio",
    instagram: "@miinstagram",
    facebook: "mi.facebook",
    descripcion: "Descripción de mi emprendimiento",
    archivoLogo: null,
    captchaToken: "test-token",
  };

// DESPUÉS:
function testDoPost() {
  const testData = {
    nombreResponsable: "Juan Pérez",
    whatsapp: "+1234567890",
    nombreEmprendimiento: "Mi Negocio",
    instagram: "@miinstagram",
    facebook: "mi.facebook",
    descripcion: "Descripción de mi emprendimiento",
    archivoLogo: null,
    fotoProducto: null,  // ← NUEVO
    captchaToken: "test-token",
  };
```

---

## Resumen de Cambios por Línea

### RegistrationForm.jsx (458 líneas totales)

| Línea   | Cambio                      | Tipo       |
| ------- | --------------------------- | ---------- |
| 15      | fotoProducto: null          | Estado     |
| 24      | productFileName             | Estado     |
| 25      | productFileInputRef         | Ref        |
| 71-130  | handleProductFileChange()   | Función    |
| 177     | fotoProducto: null          | Reset      |
| 181     | setProductFileName("")      | Reset      |
| 183-185 | Limpiar productFileInputRef | Reset      |
| 203     | formData.fotoProducto &&    | Validación |
| 383-421 | Campo visual JSX            | JSX        |
| 422-428 | reCAPTCHA + botón           | JSX        |

### api.js (77 líneas totales)

| Línea | Cambio                    | Tipo       |
| ----- | ------------------------- | ---------- |
| 48-54 | fotoProducto en required  | Validación |
| 65-67 | Validar fotoProducto.data | Validación |

### GOOGLE_APPS_SCRIPT_TEMPLATE.js (265 líneas totales)

| Línea   | Cambio                             | Tipo          |
| ------- | ---------------------------------- | ------------- |
| 48      | fotoProducto?.name en fila         | Datos         |
| 59-61   | Llamar guardarFotoProducto()       | Integración   |
| 80      | "Foto del Producto" en encabezados | Headers       |
| 110-128 | guardarFotoProducto() función      | Nueva Función |
| 175     | fotoProducto: null en testData     | Test          |

---

## ✅ Verificación de Completitud

- ✅ Estado: formData.fotoProducto agregado
- ✅ Refs: productFileInputRef agregado
- ✅ Handler: handleProductFileChange() implementado
- ✅ Reset: productFileName y productFileInputRef limpiados
- ✅ Validación Frontend: isFormValid() incluye fotoProducto
- ✅ Validación Backend: api.js valida fotoProducto
- ✅ JSX: Campo visual agregado
- ✅ Google Apps Script: Encabezado actualizado
- ✅ Google Drive: guardarFotoProducto() implementado
- ✅ Integración: Llamada en doPost()
- ✅ Compilación: Build exitoso (57 módulos)

**Todos los cambios están en su lugar. Listo para testing.**
