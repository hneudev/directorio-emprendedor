/**
 * API Service for submitting registration data to Google Apps Script
 */

const API_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

if (!API_URL) {
	console.warn("VITE_GOOGLE_APPS_SCRIPT_URL is not defined. Please add it to your .env file");
}

export async function submitForm(formData) {
	try {
		if (!API_URL) {
			throw new Error(
				"Google Apps Script URL is not configured. Please add VITE_GOOGLE_APPS_SCRIPT_URL to your environment variables."
			);
		}

		const response = await fetch(API_URL, {
			method: "POST",
			mode: "no-cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		// Note: Due to CORS restrictions with no-cors mode, we cannot directly
		// read the response. We'll consider the request successful if it doesn't throw.
		return {
			success: true,
			message: "Formulario enviado correctamente",
		};
	} catch (error) {
		console.error("Error submitting form:", error);
		throw new Error(error.message || "Ocurrió un error al enviar el formulario. Por favor, intenta nuevamente.");
	}
}

/**
 * Helper function to validate the form data structure
 */
export function validateFormData(data) {
	const required = [
		"nombreResponsable",
		"whatsapp",
		"nombreEmprendimiento",
		"descripcion",
		"archivoLogo",
		"fotoProducto",
		"captchaToken",
	];

	const errors = [];

	for (const field of required) {
		if (!data[field]) {
			errors.push(`${field} es requerido`);
		}
	}

	if (data.archivoLogo && !data.archivoLogo.data) {
		errors.push("Archivo de logo inválido");
	}

	if (data.fotoProducto && !data.fotoProducto.data) {
		errors.push("Archivo de foto del producto inválido");
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}
