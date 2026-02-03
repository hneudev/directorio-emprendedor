import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

function App() {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		// Cargar la preferencia del localStorage o detectar preferencia del sistema
		const saved = localStorage.getItem("darkMode");
		if (saved !== null) {
			return JSON.parse(saved);
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	useEffect(() => {
		// Guardar preferencia en localStorage
		localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
		// Aplicar clase al documento raíz
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<Router>
			<div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
				<Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
				<main className='flex-1 dark:bg-gray-900 dark:text-white transition-colors'>
					<Routes>
						<Route
							path='/'
							element={<LandingPage />}
						/>
						<Route
							path='/registro'
							element={<RegisterPage />}
						/>
						<Route
							path='/privacidad'
							element={<PrivacyPolicy />}
						/>
						<Route
							path='/terminos'
							element={<TermsAndConditions />}
						/>
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
