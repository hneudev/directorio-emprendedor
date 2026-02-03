import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

function App() {
	return (
		<Router>
			<div className='min-h-screen flex flex-col'>
				<Navbar />
				<main className='flex-1'>
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
