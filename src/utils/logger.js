/**
 * Logger simple sin dependencias externas
 * Centraliza logging para debugging y monitoreo
 */

const LOG_LEVELS = {
	ERROR: "error",
	WARN: "warn",
	INFO: "info",
	DEBUG: "debug",
};

const LOG_STYLES = {
	error: { color: "#ef4444", prefix: "❌" },
	warn: { color: "#f59e0b", prefix: "⚠️" },
	info: { color: "#3b82f6", prefix: "ℹ️" },
	debug: { color: "#6b7280", prefix: "🐛" },
};

class Logger {
	constructor() {
		this.isDev = import.meta.env.DEV;
		this.logs = [];
	}

	_log(level, message, data = null) {
		const timestamp = new Date().toISOString();
		const logEntry = {
			timestamp,
			level,
			message,
			data,
		};

		// Guardar en array para exportar si es necesario
		this.logs.push(logEntry);

		// Solo mostrar en desarrollo
		if (this.isDev) {
			const style = LOG_STYLES[level];
			const prefix = style ? style.prefix : "";
			const color = style ? style.color : "#000";

			console.log(`%c${prefix} [${level.toUpperCase()}] ${message}`, `color: ${color}; font-weight: bold;`);

			if (data) {
				console.log(data);
			}
		}
	}

	error(message, data) {
		this._log(LOG_LEVELS.ERROR, message, data);
	}

	warn(message, data) {
		this._log(LOG_LEVELS.WARN, message, data);
	}

	info(message, data) {
		this._log(LOG_LEVELS.INFO, message, data);
	}

	debug(message, data) {
		this._log(LOG_LEVELS.DEBUG, message, data);
	}

	getLogs() {
		return this.logs;
	}

	clearLogs() {
		this.logs = [];
	}

	exportLogs() {
		const blob = new Blob([JSON.stringify(this.logs, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `logs-${Date.now()}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}
}

// Singleton instance
export const logger = new Logger();

export default logger;
