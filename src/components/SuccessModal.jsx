import { useEffect, useState } from "react";

export default function SuccessModal({ isOpen, onClose, nombreEmprendimiento }) {
	const [isVisible, setIsVisible] = useState(isOpen);

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
			// Auto-cierra el modal después de 10 segundos
			const timer = setTimeout(() => {
				setIsVisible(false);
				onClose();
			}, 10000);
			return () => clearTimeout(timer);
		}
	}, [isOpen, onClose]);

	if (!isVisible) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn'>
			<div className='bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 animate-fadeIn'>
				{/* Icono de éxito */}
				<div className='flex justify-center mb-6'>
					<div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
						<svg
							className='w-8 h-8 text-green-600'
							fill='currentColor'
							viewBox='0 0 20 20'>
							<path
								fillRule='evenodd'
								d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
								clipRule='evenodd'
							/>
						</svg>
					</div>
				</div>

				{/* Título */}
				<h2 className='text-2xl font-bold text-center text-gray-800 mb-2'>¡Registro Exitoso!</h2>

				{/* Mensaje */}
				<p className='text-center text-gray-600 mb-2'>Gracias por registrar tu emprendimiento</p>

				{/* Nombre del emprendimiento */}
				{nombreEmprendimiento && (
					<p className='text-center text-primary-600 font-semibold mb-4'>{nombreEmprendimiento}</p>
				)}

				{/* Texto adicional */}
				<p className='text-center text-sm text-gray-500 mb-6'>
					Pronto aparecerás en nuestro directorio. ¡Gracias por ser parte de la comunidad de emprendedores anónimos!
				</p>

				{/* Barra de progreso */}
				<div className='w-full bg-gray-200 rounded-full h-1 overflow-hidden'>
					<div className='bg-green-600 h-full animate-shrinkWidth' />
				</div>
			</div>

			<style>{`
				@keyframes shrinkWidth {
					from {
						width: 100%;
					}
					to {
						width: 0%;
					}
				}
				.animate-shrinkWidth {
					animation: shrinkWidth 10s linear forwards;
				}
			`}</style>
		</div>
	);
}
