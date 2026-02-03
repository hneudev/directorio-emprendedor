import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar({ isDarkMode, toggleDarkMode }) {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);

	const isActive = (path) => location.pathname === path;

	return (
		<nav className='sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-colors'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<Link
						to='/'
						className='flex items-center space-x-2 text-2xl font-bold text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition'>
						<img
							src='/assets/logo_emprendedores anonimos.jpeg'
							alt='Emprendedores Anónimos Logo'
							className='h-10 w-auto'
						/>
						<span className='hidden sm:inline'>Directorio</span>
					</Link>

					{/* Desktop Menu */}
					<div className='hidden md:flex space-x-8'>
						<Link
							to='/'
							className={`text-sm font-medium transition ${
								isActive("/")
									? "text-primary-700 dark:text-primary-400 border-b-2 border-primary-700 dark:border-primary-400"
									: "text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400"
							}`}>
							Inicio
						</Link>
						<Link
							to='/registro'
							className={`text-sm font-medium transition ${
								isActive("/registro")
									? "text-primary-700 dark:text-primary-400 border-b-2 border-primary-700 dark:border-primary-400"
									: "text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400"
							}`}>
							Regístrate
						</Link>
					</div>

					{/* Right side - Dark Mode Toggle & CTA Button */}
					<div className='hidden md:flex items-center space-x-4'>
						{/* Dark Mode Toggle */}
						<button
							onClick={toggleDarkMode}
							className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition'
							aria-label='Toggle dark mode'>
							{isDarkMode ? (
								<FaSun
									size={20}
									className='text-yellow-500'
								/>
							) : (
								<FaMoon
									size={20}
									className='text-gray-600'
								/>
							)}
						</button>

						{/* CTA Button */}
						<Link
							to='/registro'
							className='bg-primary-700 dark:bg-primary-600 hover:bg-primary-800 dark:hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition transform hover:scale-105'>
							Comenzar
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='md:hidden flex items-center space-x-2'>
						{/* Dark Mode Toggle (Mobile) */}
						<button
							onClick={toggleDarkMode}
							className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition'
							aria-label='Toggle dark mode'>
							{isDarkMode ? (
								<FaSun
									size={18}
									className='text-yellow-500'
								/>
							) : (
								<FaMoon
									size={18}
									className='text-gray-600'
								/>
							)}
						</button>

						{/* Hamburger Menu */}
						<svg
							className='w-6 h-6 text-gray-600 dark:text-gray-300'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
							/>
						</svg>
					</button>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<div className='md:hidden pb-4 dark:bg-gray-800'>
						<Link
							to='/'
							onClick={() => setIsOpen(false)}
							className={`block px-2 py-2 text-base font-medium transition ${
								isActive("/")
									? "text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-gray-700 rounded"
									: "text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400"
							}`}>
							Inicio
						</Link>
						<Link
							to='/registro'
							onClick={() => setIsOpen(false)}
							className={`block px-2 py-2 text-base font-medium transition ${
								isActive("/registro")
									? "text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-gray-700 rounded"
									: "text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400"
							}`}>
							Regístrate
						</Link>
						<Link
							to='/registro'
							onClick={() => setIsOpen(false)}
							className='block w-full mt-2 bg-primary-700 dark:bg-primary-600 hover:bg-primary-800 dark:hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium text-center transition'>
							Comenzar
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
}
