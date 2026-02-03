import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function LandingPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-white via-primary-50 to-white'>
			{/* Hero Section */}
			<section className='pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
					{/* Left Content */}
					<div className='space-y-6'>
						<div className='space-y-2'>
							<p className='text-primary-600 font-semibold text-sm uppercase tracking-wider'>
								Bienvenido a nuestra comunidad
							</p>
							<h1 className='text-5xl sm:text-6xl font-bold text-gray-900 leading-tight'>
								Directorio <span className='text-primary-700'>Emprendedor</span>
							</h1>
						</div>
						<p className='text-xl text-gray-600 leading-relaxed'>
							Conecta con emprendedores, expande tu red de negocios y descubre oportunidades de crecimiento junto a
							nuestra comunidad.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 pt-4'>
							<Link
								to='/registro'
								className='inline-flex items-center justify-center px-8 py-3 bg-primary-700 hover:bg-primary-800 text-white font-semibold rounded-lg transition transform hover:scale-105 shadow-lg'>
								Registra tu Emprendimiento
								<svg
									className='w-5 h-5 ml-2'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M13 7l5 5m0 0l-5 5m5-5H6'
									/>
								</svg>
							</Link>
							<a
								href='#nosotros'
								className='inline-flex items-center justify-center px-8 py-3 border-2 border-primary-700 text-primary-700 hover:bg-primary-50 font-semibold rounded-lg transition'>
								Conocer Más
							</a>
						</div>
					</div>

					{/* Right Image */}
					<div className='relative'>
						<div className='absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-3xl blur-2xl opacity-20'></div>
					<div className='relative bg-gradient-to-br from-primary-400 to-primary-700 rounded-3xl p-8 sm:p-12 flex items-center justify-center'>
						<img 
							src='/assets/logo_emprendedores anonimos.jpeg' 
							alt='Emprendedores Anónimos' 
							className='w-full h-auto rounded-2xl shadow-2xl'
						/>
						</div>
					</div>
				</div>
			</section>

			{/* Nosotros Section */}
			<section
				id='nosotros'
				className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl sm:text-5xl font-bold text-gray-900 mb-4'>¿Quiénes Somos?</h2>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
							Somos una comunidad comprometida con el crecimiento y desarrollo de emprendimientos en toda la región.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{[
							{
								icon: "🚀",
								title: "Innovación",
								description:
									"Impulsamos ideas creativas y soluciones innovadoras para resolver los desafíos del mercado.",
							},
							{
								icon: "🤝",
								title: "Colaboración",
								description:
									"Creemos en el poder del trabajo en equipo y las alianzas estratégicas entre emprendedores.",
							},
							{
								icon: "📈",
								title: "Crecimiento",
								description: "Proporcionamos recursos y conexiones para que tu negocio alcance su máximo potencial.",
							},
						].map((item, index) => (
							<div
								key={index}
								className='bg-primary-50 p-8 rounded-2xl hover:shadow-xl transition transform hover:scale-105'>
								<div className='text-4xl mb-4'>{item.icon}</div>
								<h3 className='text-xl font-semibold text-gray-900 mb-2'>{item.title}</h3>
								<p className='text-gray-600'>{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Objetivos Section */}
			<section
				id='objetivos'
				className='py-20 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl sm:text-5xl font-bold text-gray-900 mb-4'>Nuestros Objetivos</h2>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
							Trabajamos cada día para alcanzar estas metas que benefician a toda nuestra comunidad.
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{[
							{
								number: "01",
								title: "Visibilidad",
								description: "Dar visibilidad a emprendimientos locales y regionales",
							},
							{
								number: "02",
								title: "Networking",
								description: "Facilitar conexiones valiosas entre emprendedores",
							},
							{
								number: "03",
								title: "Crecimiento",
								description: "Impulsar el desarrollo económico y empresarial",
							},
							{
								number: "04",
								title: "Soporte",
								description: "Brindar herramientas y recursos para el éxito",
							},
						].map((item, index) => (
							<div
								key={index}
								className='relative group overflow-hidden rounded-2xl'>
								{/* Background gradient */}
								<div className='absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 opacity-0 group-hover:opacity-100 transition duration-300'></div>

								{/* Content */}
								<div className='relative z-10 p-8 h-full flex flex-col justify-center'>
									<div className='text-6xl font-bold text-primary-300 group-hover:text-white transition mb-4'>
										{item.number}
									</div>
									<h3 className='text-2xl font-bold text-gray-900 group-hover:text-white transition mb-2'>
										{item.title}
									</h3>
									<p className='text-gray-600 group-hover:text-white/90 transition'>{item.description}</p>

									{/* Border */}
									<div className='absolute inset-0 border-2 border-primary-200 group-hover:border-white/30 rounded-2xl transition'></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-700 to-primary-900'>
				<div className='max-w-4xl mx-auto text-center text-white'>
					<h2 className='text-4xl sm:text-5xl font-bold mb-6'>¿Listo para Comenzar?</h2>
					<p className='text-xl mb-8 opacity-90'>
						Únete a nuestra comunidad de emprendedores y haz crecer tu negocio junto a nosotros.
					</p>
					<Link
						to='/registro'
						className='inline-flex items-center px-8 py-4 bg-white text-primary-700 font-bold rounded-lg hover:bg-gray-100 transition transform hover:scale-105'>
						Registra tu Emprendimiento Ahora
						<svg
							className='w-5 h-5 ml-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M13 7l5 5m0 0l-5 5m5-5H6'
							/>
						</svg>
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className='bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
						{/* About */}
						<div>
							<h3 className='text-lg font-bold mb-4 flex items-center space-x-2'>
								<img 
									src='/assets/logo_emprendedores anonimos.jpeg' 
									alt='Emprendedores Anónimos' 
									className='h-8 w-auto'
								/>
								<span>Emprendedores Anónimos</span>
							</h3>
							<p className='text-gray-400'>Conectando emprendedores para crear oportunidades de crecimiento mutuo en Hermosillo, Sonora.</p>
						</div>

						{/* Enlaces Rápidos */}
						<div>
							<h4 className='font-semibold mb-4'>Enlaces Rápidos</h4>
							<ul className='space-y-2 text-gray-400'>
								<li>
									<Link
										to='/'
										className='hover:text-primary-400 transition'>
										Inicio
									</Link>
								</li>
								<li>
									<Link
										to='/registro'
										className='hover:text-primary-400 transition'>
										Registrarse
									</Link>
								</li>
								<li>
									<a
										href='#nosotros'
										className='hover:text-primary-400 transition'>
										Sobre Nosotros
									</a>
								</li>
							</ul>
						</div>

						{/* Redes Sociales */}
						<div>
							<h4 className='font-semibold mb-4'>Síguenos</h4>
							<div className='flex space-x-4'>
								<a
									href='https://www.instagram.com/emprendedoresanonimoshmo/'
									target='_blank'
									rel='noopener noreferrer'
									className='text-gray-400 hover:text-primary-400 transition'
									title='Instagram'>
									<FaInstagram size={24} />
								</a>
								<a
									href='https://www.facebook.com/profile.php?id=61581507025991'
									target='_blank'
									rel='noopener noreferrer'
									className='text-gray-400 hover:text-primary-400 transition'
									title='Facebook'>
									<FaFacebook size={24} />
								</a>
								<a
									href='https://wa.me/6624759454'
									target='_blank'
									rel='noopener noreferrer'
									className='text-gray-400 hover:text-primary-400 transition'
									title='WhatsApp'>
									<FaWhatsapp size={24} />
								</a>
							</div>
						</div>

						{/* Contacto */}
						<div>
							<h4 className='font-semibold mb-4'>Contacto</h4>
							<ul className='space-y-2 text-gray-400 text-sm'>
								<li>
									<a
										href='mailto:emprendedoresanonimos.hmo@gmail.com'
										className='hover:text-primary-400 transition'>
										emprendedoresanonimos.hmo@gmail.com
									</a>
								</li>
								<li>
									<a
										href='tel:662-475-9454'
										className='hover:text-primary-400 transition'>
										📱 662-475-9454
									</a>
								</li>
								<li>📍 Hermosillo, Sonora</li>
							</ul>
						</div>
					</div>

					{/* Divider */}
					<div className='border-t border-gray-800 pt-8'>
						<div className='flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm'>
							<p>&copy; 2026 Emprendedores Anónimos HMO. Todos los derechos reservados.</p>
							<div className='flex space-x-6 mt-4 sm:mt-0'>
								<Link
									to='/privacidad'
									className='hover:text-primary-400 transition'>
									Privacidad
								</Link>
								<Link
									to='/terminos'
									className='hover:text-primary-400 transition'>
									Términos
								</Link>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
