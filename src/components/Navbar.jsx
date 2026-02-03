import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);

	const isActive = (path) => location.pathname === path;

	return (
		<nav className='sticky top-0 z-50 bg-white shadow-md'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<Link
						to='/'
						className='flex items-center space-x-2 text-2xl font-bold text-primary-700 hover:text-primary-800 transition'>
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
									? "text-primary-700 border-b-2 border-primary-700"
									: "text-gray-600 hover:text-primary-700"
							}`}>
							Inicio
						</Link>
						<Link
							to='/registro'
							className={`text-sm font-medium transition ${
								isActive("/registro")
									? "text-primary-700 border-b-2 border-primary-700"
									: "text-gray-600 hover:text-primary-700"
							}`}>
							Regístrate
						</Link>
					</div>

					{/* CTA Button */}
					<div className='hidden md:block'>
						<Link
							to='/registro'
							className='bg-primary-700 hover:bg-primary-800 text-white px-6 py-2 rounded-lg font-medium transition transform hover:scale-105'>
							Comenzar
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='md:hidden text-gray-600 hover:text-primary-700'>
						<svg
							className='w-6 h-6'
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
					<div className='md:hidden pb-4'>
						<Link
							to='/'
							onClick={() => setIsOpen(false)}
							className={`block px-2 py-2 text-base font-medium ${
								isActive("/") ? "text-primary-700 bg-primary-50 rounded" : "text-gray-600 hover:text-primary-700"
							}`}>
							Inicio
						</Link>
						<Link
							to='/registro'
							onClick={() => setIsOpen(false)}
							className={`block px-2 py-2 text-base font-medium ${
								isActive("/registro")
									? "text-primary-700 bg-primary-50 rounded"
									: "text-gray-600 hover:text-primary-700"
							}`}>
							Regístrate
						</Link>
						<Link
							to='/registro'
							onClick={() => setIsOpen(false)}
							className='block w-full mt-2 bg-primary-700 hover:bg-primary-800 text-white px-6 py-2 rounded-lg font-medium text-center transition'>
							Comenzar
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
}
