import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import { useThemeMode } from "./hooks/useThemeMode";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

function App() {
	const { isDarkMode, toggleDarkMode } = useThemeMode();

	return (
		<ErrorBoundary>
			<ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
				<Router>
					<div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
						<Navbar
							isDarkMode={isDarkMode}
							toggleDarkMode={toggleDarkMode}
						/>
						<main className='flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors'>
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
			</ThemeContext.Provider>
		</ErrorBoundary>
	);
}

export default App;
