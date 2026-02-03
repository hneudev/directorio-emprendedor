/**
 * Constantes de la aplicación
 * Centraliza valores mágicos para mantenibilidad
 */

// Configuración de imágenes
export const IMAGE_CONFIG = {
	MAX_SIZE_MB: 1,
	MAX_WIDTH_OR_HEIGHT: 1920,
	COMPRESSION_OPTIONS: {
		maxSizeMB: 1,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	},
	ALLOWED_FORMATS: ["image/jpeg", "image/png", "image/gif", "image/webp"],
};

// Validaciones
export const VALIDATION = {
	PHONE_REGEX: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
	EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	MIN_DESCRIPTION_LENGTH: 10,
	MIN_EMPRENDIMIENTO_NAME_LENGTH: 3,
	MAX_DESCRIPTION_LENGTH: 500,
};

// Notificaciones con Toast
export const TOAST_CONFIG = {
	DURATION: {
		SHORT: 2000,
		DEFAULT: 4000,
		LONG: 6000,
	},
	POSITION: "top-right",
	STYLES: {
		DEFAULT: {
			background: "#363636",
			color: "#fff",
		},
		SUCCESS: {
			background: "#10b981",
			duration: 3000,
		},
		ERROR: {
			background: "#ef4444",
			duration: 4000,
		},
		WARNING: {
			background: "#f59e0b",
			duration: 4000,
		},
	},
};

// URLs y rutas
export const ROUTES = {
	HOME: "/",
	REGISTER: "/registro",
	PRIVACY: "/privacidad",
	TERMS: "/terminos",
};

// reCAPTCHA
export const RECAPTCHA = {
	MIN_SCORE: 0.5, // Puntuación mínima aceptada (0-1)
	SITE_KEY: import.meta.env.VITE_RECAPTCHA_KEY,
};

// Google Apps Script
export const GOOGLE_APPS_SCRIPT = {
	URL: import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL,
	TIMEOUT: 30000, // 30 segundos
};

// Temas
export const THEME = {
	MODES: {
		LIGHT: "light",
		DARK: "dark",
	},
	STORAGE_KEY: "darkMode",
	CLASS_NAME: "dark",
};

// Colores de la aplicación
export const COLORS = {
	PRIMARY: {
		50: "#faf5ff",
		100: "#f3e8ff",
		200: "#e9d5ff",
		300: "#d8b4fe",
		400: "#c084fc",
		500: "#a855f7",
		600: "#9333ea",
		700: "#7e22ce",
		800: "#6b21a8",
		900: "#581c87",
	},
	NEUTRAL: {
		WHITE: "#ffffff",
		BLACK: "#000000",
		GRAY_50: "#f9fafb",
		GRAY_100: "#f3f4f6",
		GRAY_300: "#d1d5db",
		GRAY_600: "#4b5563",
		GRAY_800: "#1f2937",
		GRAY_900: "#111827",
	},
	STATUS: {
		SUCCESS: "#10b981",
		ERROR: "#ef4444",
		WARNING: "#f59e0b",
		INFO: "#3b82f6",
	},
};

// Mensajes comunes
export const MESSAGES = {
	FORM: {
		SUBMIT_SUCCESS: "Formulario enviado correctamente",
		SUBMIT_ERROR: "Error al enviar el formulario. Por favor, intenta nuevamente.",
		VALIDATION_ERROR: "Por favor, completa todos los campos correctamente.",
	},
	FILE: {
		INVALID_TYPE: "Por favor, selecciona un archivo de imagen (PNG, JPG, GIF)",
		UPLOAD_SUCCESS: "Archivo cargado exitosamente",
		UPLOAD_ERROR: "Error al cargar el archivo. Por favor, intenta nuevamente.",
		COMPRESSION_ERROR: "Error al comprimir la imagen.",
	},
	PHONE: {
		INVALID: "Por favor, ingresa un número de teléfono válido (ej: +1-555-123-4567 o 5551234567)",
	},
	RECAPTCHA: {
		VALIDATION_ERROR: "La validación de reCAPTCHA falló. Por favor, intenta nuevamente.",
	},
};

// Tamaños responsivos (Tailwind breakpoints)
export const BREAKPOINTS = {
	SM: 640,
	MD: 768,
	LG: 1024,
	XL: 1280,
	"2XL": 1536,
};

// Animaciones
export const ANIMATIONS = {
	TRANSITION_DURATION: 300, // ms
	HOVER_SCALE: 1.05,
};

// HTTP y métodos
export const HTTP = {
	METHODS: {
		GET: "GET",
		POST: "POST",
		PUT: "PUT",
		DELETE: "DELETE",
	},
	HEADERS: {
		JSON: "application/json",
		FORM: "application/x-www-form-urlencoded",
	},
};

// Ambiente
export const ENV = {
	isDevelopment: import.meta.env.DEV,
	isProduction: import.meta.env.PROD,
};

// Logging
export const LOG_LEVELS = {
	ERROR: "error",
	WARN: "warn",
	INFO: "info",
	DEBUG: "debug",
};

export default {
	IMAGE_CONFIG,
	VALIDATION,
	TOAST_CONFIG,
	ROUTES,
	RECAPTCHA,
	GOOGLE_APPS_SCRIPT,
	THEME,
	COLORS,
	MESSAGES,
	BREAKPOINTS,
	ANIMATIONS,
	HTTP,
	ENV,
	LOG_LEVELS,
};
