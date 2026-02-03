import { useState, useEffect } from "react";
import { THEME } from "../constants";

/**
 * Custom hook para manejar el tema oscuro
 * Maneja localStorage y aplicación de clase al documento
 *
 * @returns {Object} {isDarkMode, toggleDarkMode}
 */
export function useThemeMode() {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		// Cargar la preferencia del localStorage o detectar preferencia del sistema
		const saved = localStorage.getItem(THEME.STORAGE_KEY);
		if (saved !== null) {
			return JSON.parse(saved);
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	useEffect(() => {
		// Guardar preferencia en localStorage
		localStorage.setItem(THEME.STORAGE_KEY, JSON.stringify(isDarkMode));

		// Aplicar clase al documento raíz
		if (isDarkMode) {
			document.documentElement.classList.add(THEME.CLASS_NAME);
		} else {
			document.documentElement.classList.remove(THEME.CLASS_NAME);
		}
	}, [isDarkMode]);

	const toggleDarkMode = () => {
		setIsDarkMode((prev) => !prev);
	};

	return { isDarkMode, toggleDarkMode };
}
