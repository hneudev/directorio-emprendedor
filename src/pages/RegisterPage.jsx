import RegistrationForm from "../components/RegistrationForm";

export default function RegisterPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-white via-primary-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors'>
			<div className='max-w-2xl mx-auto'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
						Inscribe tu <span className='text-primary-700 dark:text-primary-400'>Emprendimiento</span>
					</h1>
					<p className='text-xl text-gray-600 dark:text-gray-300'>
						Comparte tu visión con nuestra comunidad y expande tu red de conexiones
					</p>
				</div>

				{/* Form Card */}
				<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 transition-colors'>
					{/* Info Box */}
					<div className='mb-8 bg-primary-50 dark:bg-primary-900 border-l-4 border-primary-700 dark:border-primary-400 p-4 rounded transition-colors'>
						<p className='text-sm text-gray-700 dark:text-primary-100'>
							<strong>✨ Tip:</strong> Completa todos los campos para que podamos conocer mejor tu emprendimiento y
							conectarte con oportunidades relevantes.
						</p>
					</div>

					{/* Registration Form Component */}
					<RegistrationForm />

					{/* Additional Info */}
					<div className='mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 transition-colors'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
							<div className='flex items-start space-x-3'>
								<div className='flex-shrink-0 text-2xl'>🔒</div>
								<div>
									<h3 className='font-semibold text-gray-900 dark:text-white'>Datos Seguros</h3>
									<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
										Tu información está protegida y solo será utilizada para conectarte con oportunidades.
									</p>
								</div>
							</div>
							<div className='flex items-start space-x-3'>
								<div className='flex-shrink-0 text-2xl'>⚡</div>
								<div>
									<h3 className='font-semibold text-gray-900 dark:text-white'>Registro Rápido</h3>
									<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
										Tarda menos de 5 minutos completar el formulario y unirse a nuestra comunidad.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Questions Section */}
				<div className='mt-12 text-center'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>¿Preguntas?</h2>
					<p className='text-gray-600 dark:text-gray-300 mb-4'>
						Si tienes dudas sobre el registro, no dudes en contactarnos
					</p>
					<a
						href='mailto:emprendedoresanonimos.hmo@gmail.com'
						className='inline-flex items-center px-6 py-3 bg-primary-700 dark:bg-primary-600 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-semibold rounded-lg transition'>
						✉️ Envíanos un Email
					</a>
				</div>
			</div>
		</div>
	);
}
