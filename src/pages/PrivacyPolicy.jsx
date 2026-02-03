export default function PrivacyPolicy() {
	return (
		<div className='min-h-screen bg-white dark:bg-gray-900 transition-colors'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
				<h1 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8'>Política de Privacidad</h1>
				<p className='text-gray-600 dark:text-gray-400 mb-8 italic'>Última actualización: Febrero 2026</p>

				<div className='prose prose-lg dark:prose-invert max-w-none'>
					<section className='mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>1. Introducción</h2>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>
							En Emprendedores Anónimos HMO, protegemos tu privacidad y nos comprometemos a ser transparentes sobre cómo
							recopilamos, usamos y procesamos tu información personal. Esta Política de Privacidad explica nuestras
							prácticas de privacidad.
						</p>
					</section>

					<section className='mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>2. Información que Recopilamos</h2>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>
							Cuando te registras en nuestro directorio, recopilamos la siguiente información:
						</p>
						<ul className='list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2'>
							<li>Nombre del responsable del emprendimiento</li>
							<li>Número de teléfono WhatsApp</li>
							<li>Nombre del emprendimiento</li>
							<li>Descripción del negocio</li>
							<li>Usuario de Instagram (si lo proporcionas)</li>
							<li>Enlace de Facebook (si lo proporcionas)</li>
							<li>Logo del negocio (imagen)</li>
							<li>Foto del producto (imagen)</li>
						</ul>
					</section>

					<section className='mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>3. Cómo Usamos Tu Información</h2>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>Usamos tu información para:</p>
						<ul className='list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2'>
							<li>Registrarte en nuestro directorio de emprendedores</li>
							<li>Facilitar conexiones entre emprendedores</li>
							<li>Mostrarte en el directorio público de búsqueda</li>
							<li>Contactarte con actualizaciones importantes</li>
							<li>Mejorar nuestros servicios</li>
						</ul>
					</section>

					<section className='mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>4. Almacenamiento de Datos</h2>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>
							Tu información se almacena en los servicios de Google (Google Sheets y Google Drive) de manera segura. Las
							imágenes se guardan en carpetas privadas de Google Drive y tu información de contacto en hojas de cálculo
							protegidas.
						</p>
					</section>

					<section className='mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>5. Anonimato</h2>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>
							Aunque recopilamos tu nombre, el objetivo de Emprendedores Anónimos es promover la colaboración sin
							prejuicios basados en identidades personales. Tu información personal no se compartirá públicamente sin tu
							consentimiento explícito.
						</p>
					</section>

					<section className='mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>6. Visibilidad Pública</h2>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>
							Cuando te registras, tu emprendimiento (nombre, descripción, logo, redes sociales) aparecerá en nuestro
							directorio público. Tu número de teléfono y email NO serán públicos y solo serán accesibles internamente.
						</p>
					</section>

					<section className='mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>7. Requerimiento de WhatsApp</h2>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>
							Para mantener una comunidad activa y comunicada, es un requisito formar parte del grupo de WhatsApp de
							Emprendedores Anónimos. Si abandonas el grupo, serás removido del directorio automáticamente.
						</p>
					</section>

					<section className='mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>8. Compartir Información</h2>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>
							No vendemos, comercializamos ni transferimos tu información personal a terceros. Solo compartimos
							información cuando es necesario para operar el directorio (p.ej., mostrar tu emprendimiento en la
							búsqueda).
						</p>
					</section>

					<section className='mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>9. Seguridad</h2>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>
							Implementamos medidas de seguridad apropiadas para proteger tu información personal contra acceso no
							autorizado, alteración, divulgación o destrucción.
						</p>
					</section>

					<section className='mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>10. Tus Derechos</h2>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>Tienes derecho a:</p>
						<ul className='list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2'>
							<li>Acceder a tu información personal</li>
							<li>Solicitar correcciones a tu información</li>
							<li>Solicitar la eliminación de tu información</li>
							<li>Retirar tu consentimiento en cualquier momento</li>
						</ul>
					</section>

					<section className='mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>11. Contacto</h2>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>
							Si tienes preguntas sobre esta Política de Privacidad, contacta a:{" "}
							<a
								href='mailto:emprendedoresanonimos.hmo@gmail.com'
								className='text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-semibold'>
								emprendedoresanonimos.hmo@gmail.com
							</a>
						</p>
					</section>

					<section className='mb-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>12. Cambios en esta Política</h2>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>
							Podemos actualizar esta Política de Privacidad de vez en cuando. Te notificaremos de cambios
							significativos publicando la nueva política en esta página.
						</p>
					</section>
				</div>

				<div className='mt-16 p-6 bg-primary-50 dark:bg-primary-900 rounded-lg border border-primary-200 dark:border-primary-700'>
					<p className='text-gray-700 dark:text-primary-100'>
						<strong>Nota:</strong> Al registrarte en Emprendedores Anónimos, aceptas esta Política de Privacidad y
						nuestros Términos y Condiciones.
					</p>
				</div>
			</div>
		</div>
	);
}
