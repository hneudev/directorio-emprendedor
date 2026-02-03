/**
 * Utilidades de validación centralizadas
 * Elimina duplicación de código de validación
 */

import { VALIDATION, IMAGE_CONFIG } from "../constants";
import { logger } from "./logger";

/**
 * Valida que el email sea válido
 */
export const validateEmail = (email) => {
	const regex = new RegExp(VALIDATION.EMAIL_REGEX);
	return regex.test(email);
};

/**
 * Valida que el nombre tenga la longitud correcta
 */
export const validateName = (name) => {
	const trimmed = name.trim();
	return trimmed.length >= VALIDATION.NAME_MIN_LENGTH && trimmed.length <= VALIDATION.NAME_MAX_LENGTH;
};

/**
 * Valida que el teléfono tenga formato correcto
 */
export const validatePhone = (phone) => {
	const regex = new RegExp(VALIDATION.PHONE_REGEX);
	return regex.test(phone);
};

/**
 * Valida que el archivo sea una imagen válida
 */
export const validateImageFile = (file) => {
	if (!file) return false;

	const isValidType = VALIDATION.ALLOWED_IMAGE_TYPES.includes(file.type);
	const isValidSize = file.size <= IMAGE_CONFIG.MAX_SIZE_BYTES;

	if (!isValidType) {
		logger.warn("Tipo de imagen no permitido", {
			fileType: file.type,
			allowed: VALIDATION.ALLOWED_IMAGE_TYPES,
		});
		return false;
	}

	if (!isValidSize) {
		logger.warn("Tamaño de imagen excede límite", {
			fileSize: file.size,
			maxSize: IMAGE_CONFIG.MAX_SIZE_BYTES,
		});
		return false;
	}

	return true;
};

/**
 * Valida un archivo antes de procesarlo
 */
export const validateFile = (file, maxSizeMB = 5) => {
	if (!file) {
		logger.error("Archivo no proporcionado");
		return { valid: false, error: "Archivo no proporcionado" };
	}

	const maxSizeBytes = maxSizeMB * 1024 * 1024;

	if (file.size > maxSizeBytes) {
		const error = `Archivo excede ${maxSizeMB}MB`;
		logger.error(error, { fileSize: file.size, maxSize: maxSizeBytes });
		return { valid: false, error };
	}

	return { valid: true, error: null };
};

/**
 * Valida que una cadena no esté vacía
 */
export const validateRequired = (value, fieldName = "Campo") => {
	if (!value || value.toString().trim().length === 0) {
		const error = `${fieldName} es requerido`;
		logger.warn(error);
		return { valid: false, error };
	}
	return { valid: true, error: null };
};

/**
 * Valida que una URL sea válida
 */
export const validateURL = (url) => {
	try {
		new URL(url);
		return true;
	} catch {
		logger.warn("URL inválida", { url });
		return false;
	}
};

/**
 * Valida un formulario completo
 */
export const validateForm = (formData, rules) => {
	const errors = {};

	Object.keys(rules).forEach((field) => {
		const rule = rules[field];
		const value = formData[field];

		if (rule.required) {
			const { valid, error } = validateRequired(value, rule.label);
			if (!valid) {
				errors[field] = error;
				return;
			}
		}

		if (rule.type === "email" && value) {
			if (!validateEmail(value)) {
				errors[field] = "Email inválido";
			}
		}

		if (rule.type === "phone" && value) {
			if (!validatePhone(value)) {
				errors[field] = "Teléfono inválido";
			}
		}

		if (rule.minLength && value.length < rule.minLength) {
			errors[field] = `Mínimo ${rule.minLength} caracteres`;
		}

		if (rule.maxLength && value.length > rule.maxLength) {
			errors[field] = `Máximo ${rule.maxLength} caracteres`;
		}

		if (rule.pattern && value) {
			const regex = new RegExp(rule.pattern);
			if (!regex.test(value)) {
				errors[field] = rule.errorMessage || "Formato inválido";
			}
		}
	});

	return {
		valid: Object.keys(errors).length === 0,
		errors,
	};
};

export default {
	validateEmail,
	validateName,
	validatePhone,
	validateImageFile,
	validateFile,
	validateRequired,
	validateURL,
	validateForm,
};
