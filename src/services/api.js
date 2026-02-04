/**
 * API Service for submitting registration data to Google Apps Script
 * Includes improved error handling, logging, and CORS configuration
 */

import { logger } from "../utils/logger";

const API_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
const REQUEST_TIMEOUT = 30000; // 30 seconds

if (!API_URL) {
	logger.warn("VITE_GOOGLE_APPS_SCRIPT_URL is not defined. Please add it to your .env file");
}

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = REQUEST_TIMEOUT) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

	try {
		const response = await fetch(url, {
			...options,
			signal: controller.signal,
		});
		clearTimeout(timeoutId);
		return response;
	} catch (error) {
		clearTimeout(timeoutId);
		if (error.name === "AbortError") {
			throw new Error(`Request timeout after ${timeoutMs}ms`);
		}
		throw error;
	}
}

export async function submitForm(formData) {
	try {
		if (!API_URL) {
			throw new Error(
				"Google Apps Script URL is not configured. Please add VITE_GOOGLE_APPS_SCRIPT_URL to your environment variables."
			);
		}

		logger.info("Submitting form data", {
			hasLogo: !!formData.archivoLogo,
			hasProduct: !!formData.fotoProducto,
		});

		const response = await fetchWithTimeout(
			API_URL,
			{
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"X-Requested-With": "XMLHttpRequest",
				},
				body: JSON.stringify(formData),
				credentials: "omit", // No incluir credenciales por seguridad
			},
			REQUEST_TIMEOUT
		);

		// Log de respuesta
		logger.info("Form submission response", {
			status: response.status,
			statusText: response.statusText,
		});

		// Intentar leer la respuesta si es posible
		let responseData = null;
		const contentType = response.headers.get("content-type");

		if (contentType && contentType.includes("application/json")) {
			try {
				responseData = await response.json();
				logger.info("Response data received", responseData);
			} catch (e) {
				logger.warn("Could not parse response as JSON", { error: e.message });
			}
		}

		// Verificar estado de respuesta
		if (!response.ok) {
			throw new Error(responseData?.message || `HTTP Error: ${response.status} ${response.statusText}`);
		}

		return {
			success: true,
			message: "Formulario enviado correctamente",
			data: responseData,
		};
	} catch (error) {
		logger.error("Error submitting form", {
			message: error.message,
			stack: error.stack,
		});

		// Manejar diferentes tipos de errores
		let userMessage = "Ocurrió un error al enviar el formulario. Por favor, intenta nuevamente.";

		if (error.message.includes("timeout")) {
			userMessage = "La conexión tardó demasiado. Por favor, verifica tu conexión a internet e intenta nuevamente.";
		} else if (error.message.includes("Failed to fetch")) {
			userMessage = "No se pudo conectar al servidor. Por favor, verifica tu conexión a internet.";
		} else if (error.message.includes("HTTP Error")) {
			userMessage = `Error del servidor: ${error.message}. Por favor, intenta nuevamente más tarde.`;
		}

		throw new Error(userMessage);
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
