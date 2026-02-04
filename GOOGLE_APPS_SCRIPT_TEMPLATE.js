/**
 * Google Apps Script - Directorio Emprendedor
 *
 * Este script recibe los datos del formulario del sitio web y los guarda en Google Sheets
 *
 * INSTRUCCIONES:
 * 1. Copia este código en tu proyecto de Google Apps Script
 * 2. Reemplaza 'YOUR_SPREADSHEET_ID' con el ID de tu hoja de cálculo
 * 3. Despliega como Web App
 * 4. Copia la URL de implementación en tu archivo .env
 */

// ID de tu Google Sheet (obtén este ID de la URL de tu hoja)
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";
const SHEET_NAME = "Registros";

/**
 * Función principal que recibe los datos POST del formulario
 */
function doPost(e) {
	try {
		// Parsea los datos JSON recibidos
		let data = null;

		// Intenta obtener los datos de diferentes formas
		if (e && e.postData) {
			if (typeof e.postData.contents === "string") {
				data = JSON.parse(e.postData.contents);
			}
		}

		// Si no hay datos, retorna error
		if (!data) {
			return sendResponse(false, "No se recibieron datos válidos", 400);
		}

		// Valida que tenemos todos los campos requeridos
		if (!data.nombreResponsable || !data.whatsapp || !data.nombreEmprendimiento) {
			return sendResponse(false, "Campos requeridos faltantes", 400);
		}

		// Obtén la hoja de cálculo
		const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
		let sheet = spreadsheet.getSheetByName(SHEET_NAME);

		// Si la hoja no existe, créala
		if (!sheet) {
			sheet = spreadsheet.insertSheet(SHEET_NAME);
			agregarEncabezados(sheet);
		}

		// Prepara los datos para guardar
		const fila = [
			new Date().toLocaleString("es-ES"),
			data.nombreResponsable || "",
			data.whatsapp || "",
			data.nombreEmprendimiento || "",
			data.instagram || "",
			data.facebook || "",
			data.descripcion || "",
			data.archivoLogo?.name || "",
			data.fotoProducto?.name || "",
			data.captchaToken ? "Verificado" : "No verificado",
		];

		// Añade la fila a la hoja
		sheet.appendRow(fila);

		// Si hay un archivo de logo, guárdalo en Drive
		if (data.archivoLogo && data.archivoLogo.data) {
			guardarLogo(data.archivoLogo, data.nombreEmprendimiento);
		}

		// Si hay una foto del producto, guárdala en Drive
		if (data.fotoProducto && data.fotoProducto.data) {
			guardarFotoProducto(data.fotoProducto, data.nombreEmprendimiento);
		}

		// Retorna respuesta exitosa
		return sendResponse(true, "Registro guardado exitosamente. Logo y foto del producto almacenados.", 200);
	} catch (error) {
		Logger.log("Error en doPost: " + error.toString());
		return sendResponse(false, "Error al procesar el formulario: " + error.toString(), 500);
	}
}

/**
 * Añade encabezados a la hoja de cálculo
 */
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
		"Foto del Producto",
		"reCAPTCHA",
	];

	sheet.appendRow(encabezados);

	// Formatea el encabezado
	const headerRange = sheet.getRange(1, 1, 1, encabezados.length);
	headerRange.setFontWeight("bold");
	headerRange.setBackground("#9333ea");
	headerRange.setFontColor("white");
}

/**
 * Guarda el logo en Google Drive
 */
function guardarLogo(archivoLogo, nombreEmprendimiento) {
	try {
		// Valida que tenga datos
		if (!archivoLogo.data) {
			Logger.log("Advertencia: archivoLogo sin datos base64");
			return;
		}

		// Decodifica el base64
		const imageData = Utilities.newBlob(
			Utilities.base64Decode(archivoLogo.data),
			archivoLogo.mime || "image/jpeg",
			archivoLogo.name || "logo.jpg"
		);

		// Obtén o crea la carpeta 'Logos' en Drive
		let folder = getFolderByName("Logos de Emprendedores");
		if (!folder) {
			folder = DriveApp.createFolder("Logos de Emprendedores");
		}

		// Genera nombre de archivo con el nombre del emprendimiento
		const extension = archivoLogo.name.substring(archivoLogo.name.lastIndexOf("."));
		const nombreArchivo = nombreEmprendimiento.replace(/\s+/g, "_") + "_logo" + extension;
		const imageDataRenombrada = imageData.setName(nombreArchivo);

		// Guarda el archivo en la carpeta
		const savedFile = folder.createFile(imageDataRenombrada);

		Logger.log("Logo guardado correctamente: " + savedFile.getName());
	} catch (error) {
		Logger.log("Error al guardar logo: " + error.toString());
		// No interrumpimos el proceso si falla el logo
	}
}

/**
 * Guarda la foto del producto en Google Drive
 */
function guardarFotoProducto(fotoProducto, nombreEmprendimiento) {
	try {
		// Valida que tenga datos
		if (!fotoProducto.data) {
			Logger.log("Advertencia: fotoProducto sin datos base64");
			return;
		}

		// Decodifica el base64
		const imageData = Utilities.newBlob(
			Utilities.base64Decode(fotoProducto.data),
			fotoProducto.mime || "image/jpeg",
			fotoProducto.name || "producto.jpg"
		);

		// Obtén o crea la carpeta 'Fotos de Productos' en Drive
		let folder = getFolderByName("Fotos de Productos - Emprendedores");
		if (!folder) {
			folder = DriveApp.createFolder("Fotos de Productos - Emprendedores");
		}

		// Genera nombre de archivo con el nombre del emprendimiento
		const extension = fotoProducto.name.substring(fotoProducto.name.lastIndexOf("."));
		const nombreArchivo = nombreEmprendimiento.replace(/\s+/g, "_") + "_producto" + extension;
		const imageDataRenombrada = imageData.setName(nombreArchivo);

		// Guarda el archivo en la carpeta
		const savedFile = folder.createFile(imageDataRenombrada);

		Logger.log("Foto del producto guardada correctamente: " + savedFile.getName());
	} catch (error) {
		Logger.log("Error al guardar foto del producto: " + error.toString());
		// No interrumpimos el proceso si falla la foto
	}
}

/**
 * Obtiene una carpeta por nombre
 */
function getFolderByName(folderName) {
	const folders = DriveApp.getFoldersByName(folderName);
	if (folders.hasNext()) {
		return folders.next();
	}
	return null;
}

/**
 * Envía una respuesta JSON
 */
function sendResponse(success, message, statusCode) {
	const output = ContentService.createTextOutput(
		JSON.stringify({
			success: success,
			message: message,
			timestamp: new Date().toISOString(),
		})
	);
	output.setMimeType(ContentService.MimeType.JSON);
	return output;
}

/**
 * Maneja las solicitudes OPTIONS (CORS preflight)
 */
function doOptions(e) {
	return sendResponse(true, "CORS preflight", 200);
}

/**
 * Función para probar el script localmente
 */
function testDoPost() {
	const testData = {
		nombreResponsable: "Juan Pérez",
		whatsapp: "+1234567890",
		nombreEmprendimiento: "Mi Negocio",
		instagram: "@miinstagram",
		facebook: "mi.facebook",
		descripcion: "Descripción de mi emprendimiento",
		archivoLogo: null,
		fotoProducto: null,
		captchaToken: "test-token",
	};

	const mockEvent = {
		postData: {
			contents: JSON.stringify(testData),
			type: "application/json",
		},
	};

	Logger.log("Iniciando test...");
	const resultado = doPost(mockEvent);
	Logger.log("Resultado:");
	Logger.log(resultado.getContent());
}
