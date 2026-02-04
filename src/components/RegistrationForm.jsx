import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import imageCompression from "browser-image-compression";
import { submitForm, validateFormData } from "../services/api";
import { validateFile, validatePhone } from "../utils/validators";
import { IMAGE_CONFIG } from "../constants";
import { logger } from "../utils/logger";
import SuccessModal from "./SuccessModal";

export default function RegistrationForm() {
	const [formData, setFormData] = useState({
		nombreResponsable: "",
		whatsapp: "",
		nombreEmprendimiento: "",
		instagram: "",
		facebook: "",
		descripcion: "",
		archivoLogo: null,
		fotoProducto: null,
		fotoProducto2: null,
		captchaToken: null,
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [fileName, setFileName] = useState("");
	const [productFileName, setProductFileName] = useState("");
	const [secondProductFileName, setSecondProductFileName] = useState("");
	const [logoPreview, setLogoPreview] = useState("");
	const [productPreview, setProductPreview] = useState("");
	const [secondProductPreview, setSecondProductPreview] = useState("");
	const fileInputRef = useRef(null);
	const productFileInputRef = useRef(null);
	const secondProductFileInputRef = useRef(null);
	const recaptchaRef = useRef(null);

	const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_KEY;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setError("");

		// Validación en tiempo real para descripción mínima
		if (name === "descripcion") {
			if (value && value.trim().length < 10) {
				// No mostrar error en tiempo real, solo validar al enviar
			}
		}
	};

	const handlePhoneBlur = (e) => {
		const value = e.target.value;
		const normalizedValue = value.replace(/\s/g, "");
		if (normalizedValue && !validatePhone(normalizedValue)) {
			toast.error("Por favor, ingresa un n?mero de tel?fono v?lido (ej: +1-555-123-4567 o 5551234567)");
		}
	};

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		try {
			setError("");
			setLoading(true);

			// Validar tipo de archivo
			if (!file.type.startsWith("image/")) {
				logger.warn("Tipo de archivo inválido", { fileType: file.type });
				toast.error("Por favor, selecciona un archivo de imagen (PNG, JPG, GIF)");
				fileInputRef.current.value = "";
				setLoading(false);
				return;
			}

			// VALIDAR TAMAÑO ANTES DE COMPRIMIR
			const maxSizeMB = IMAGE_CONFIG.MAX_SIZE_MB || 5;
			const validation = validateFile(file, maxSizeMB);

			if (!validation.valid) {
				logger.error("Archivo rechazado", {
					fileName: file.name,
					fileSize: file.size,
					maxSize: maxSizeMB * 1024 * 1024,
				});
				toast.error(validation.error);
				fileInputRef.current.value = "";
				setLoading(false);
				return;
			}

			// Comprimir imagen
			const options = {
				maxSizeMB: IMAGE_CONFIG.MAX_SIZE_MB || 1,
				maxWidthOrHeight: IMAGE_CONFIG.MAX_WIDTH_OR_HEIGHT || 1920,
				useWebWorker: true,
			};

			logger.info("Iniciando compresión de imagen", {
				fileName: file.name,
				originalSize: file.size,
				maxSize: options.maxSizeMB * 1024 * 1024,
			});

			const compressedFile = await imageCompression(file, options);
			const reader = new FileReader();

			reader.onload = (event) => {
				const base64String = event.target.result.split(",")[1];
				setFormData((prev) => ({
					...prev,
					archivoLogo: {
						data: base64String,
						mime: compressedFile.type,
						name: file.name,
					},
				}));
				setFileName(file.name);
				setLogoPreview(event.target.result);
				logger.info("Imagen comprimida y cargada", {
					fileName: file.name,
					compressedSize: compressedFile.size,
				});
				toast.success("Logo cargado exitosamente");
				setLoading(false);
			};

			reader.onerror = () => {
				logger.error("Error al leer archivo", { fileName: file.name });
				toast.error("Error al procesar la imagen");
				setLoading(false);
			};

			reader.readAsDataURL(compressedFile);
		} catch (err) {
			toast.error("Error al procesar la imagen: " + err.message);
			fileInputRef.current.value = "";
			setLoading(false);
		}
	};

	const handleProductFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		try {
			setError("");
			setLoading(true);

			// Check file type
			if (!file.type.startsWith("image/")) {
				toast.error("Por favor, selecciona un archivo de imagen (PNG, JPG, GIF)");
				productFileInputRef.current.value = "";
				setLoading(false);
				return;
			}

			// Compress image
			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 1920,
				useWebWorker: true,
			};

			const compressedFile = await imageCompression(file, options);
			const reader = new FileReader();

			reader.onload = (event) => {
				const base64String = event.target.result.split(",")[1];
				setFormData((prev) => ({
					...prev,
					fotoProducto: {
						data: base64String,
						mime: compressedFile.type,
						name: file.name,
					},
				}));
				setProductFileName(file.name);
				setProductPreview(event.target.result);
				logger.info("Foto del producto comprimida y cargada", {
					fileName: file.name,
					compressedSize: compressedFile.size,
				});
				toast.success("Foto del producto cargada exitosamente");
				setLoading(false);
			};

			reader.readAsDataURL(compressedFile);
		} catch (err) {
			toast.error("Error al procesar la imagen: " + err.message);
			productFileInputRef.current.value = "";
			setLoading(false);
		}
	};

	const handleSecondProductFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		try {
			setError("");
			setLoading(true);

			// Check file type
			if (!file.type.startsWith("image/")) {
				toast.error("Por favor, selecciona un archivo de imagen (PNG, JPG, GIF)");
				secondProductFileInputRef.current.value = "";
				setLoading(false);
				return;
			}

			// Compress image
			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 1920,
				useWebWorker: true,
			};

			const compressedFile = await imageCompression(file, options);
			const reader = new FileReader();

			reader.onload = (event) => {
				const base64String = event.target.result.split(",")[1];
				setFormData((prev) => ({
					...prev,
					fotoProducto2: {
						data: base64String,
						mime: compressedFile.type,
						name: file.name,
					},
				}));
				setSecondProductFileName(file.name);
				setSecondProductPreview(event.target.result);
				logger.info("Segunda foto del producto comprimida y cargada", {
					fileName: file.name,
					compressedSize: compressedFile.size,
				});
				toast.success("Segunda foto del producto cargada exitosamente");
				setLoading(false);
			};

			reader.readAsDataURL(compressedFile);
		} catch (err) {
			toast.error("Error al procesar la imagen: " + err.message);
			secondProductFileInputRef.current.value = "";
			setLoading(false);
		}
	};

	const handleRecaptcha = (token) => {
		// reCAPTCHA v2 devuelve un token o null
		if (token) {
			setFormData((prev) => ({
				...prev,
				captchaToken: token,
			}));
			setError("");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		try {
			// Validar nombre del responsable
			if (!formData.nombreResponsable.trim()) {
				toast.error("Por favor, ingresa el nombre del responsable");
				return;
			}
			if (!formData.whatsapp.trim()) {
				toast.error("Por favor, ingresa un número de WhatsApp");
				return;
			}
			const normalizedWhatsapp = formData.whatsapp.replace(/\s/g, "");
			if (!validatePhone(normalizedWhatsapp)) {
				toast.error("Por favor, ingresa un n?mero de tel?fono v?lido (ej: +1-555-123-4567 o 5551234567)");
				return;
			}

			// Validar nombre del emprendimiento
			if (!formData.nombreEmprendimiento.trim()) {
				toast.error("Por favor, ingresa el nombre del emprendimiento");
				return;
			}

			// Validar descripción (mínimo 10 caracteres)
			if (!formData.descripcion.trim()) {
				toast.error("Por favor, ingresa una descripción del emprendimiento");
				return;
			}
			if (formData.descripcion.trim().length < 10) {
				toast.error("La descripción debe tener al menos 10 caracteres");
				return;
			}

			// Validate form data
			const validation = validateFormData(formData);
			if (!validation.isValid) {
				validation.errors.forEach((error) => toast.error(error));
				return;
			}

			if (!formData.captchaToken) {
				toast.error("Por favor, completa la verificación reCAPTCHA");
				return;
			}

			setLoading(true);

			// Submit form
			await submitForm(formData);

			// Success - mostrar modal
			setShowModal(true);

			// Limpiar formulario
			setSuccess(true);
			setFormData({
				nombreResponsable: "",
				whatsapp: "",
				nombreEmprendimiento: "",
				instagram: "",
				facebook: "",
				descripcion: "",
				archivoLogo: null,
				fotoProducto: null,
				fotoProducto2: null,
				captchaToken: null,
			});
			setFileName("");
			setProductFileName("");
			setSecondProductFileName(\"\");
			setLogoPreview("");
			setProductPreview("");
			setSecondProductPreview(\"\");
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
			if (productFileInputRef.current) {
				productFileInputRef.current.value = "";
			}
			if (secondProductFileInputRef.current) {
				secondProductFileInputRef.current.value = "";
			}
			if (recaptchaRef.current) {
				recaptchaRef.current.reset();
			}
			setLoading(false);
		} catch (err) {
			toast.error(err.message || "Error al enviar el formulario");
			setLoading(false);
		}
	};

	const isFormValid = () => {
		return (
			formData.nombreResponsable.trim() &&
			formData.whatsapp.trim() &&
			formData.nombreEmprendimiento.trim() &&
			formData.descripcion.trim() &&
			formData.archivoLogo &&
			formData.fotoProducto &&
			formData.fotoProducto2 &&
			formData.captchaToken &&
			!loading
		);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-6'>
			{/* Toaster para notificaciones */}
			<Toaster
				position='top-right'
				reverseOrder={false}
				toastOptions={{
					duration: 4000,
					style: {
						background: "#363636",
						color: "#fff",
					},
					success: {
						duration: 3000,
						style: {
							background: "#10b981",
						},
					},
					error: {
						duration: 4000,
						style: {
							background: "#ef4444",
						},
					},
				}}
			/>

			{/* Advertencia de WhatsApp */}
			<div className='bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 mb-6 rounded'>
				<div className='flex'>
					<div className='flex-shrink-0'>
						<span className='text-yellow-400 dark:text-yellow-300 text-2xl'>⚠️</span>
					</div>
					<div className='ml-3'>
						<p className='text-sm text-yellow-800 dark:text-yellow-200'>
							<strong>Importante:</strong> La participación en el grupo de WhatsApp de Emprendedores Anónimos es{" "}
							<strong>obligatoria</strong> para mantener tu registro en el directorio. Si abandona el grupo, serás
							removido automáticamente del directorio.
						</p>
					</div>
				</div>
			</div>

			{/* Modal de éxito */}
			<SuccessModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				nombreEmprendimiento={formData.nombreEmprendimiento}
			/>

			{/* Nombre del Responsable */}
			<div>
				<label
					htmlFor='nombreResponsable'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					Nombre del Responsable *
				</label>
				<input
					type='text'
					id='nombreResponsable'
					name='nombreResponsable'
					value={formData.nombreResponsable}
					onChange={handleChange}
					placeholder='Tu nombre completo'
					required
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
				/>
			</div>

			{/* WhatsApp */}
			<div>
				<label
					htmlFor='whatsapp'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					WhatsApp *
				</label>
				<input
					type='tel'
					id='whatsapp'
					name='whatsapp'
					value={formData.whatsapp}
					onChange={handleChange}
				onBlur={handlePhoneBlur}
					placeholder='+1234567890 o 1234567890'
					required
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
				/>
			</div>

			{/* Nombre del Emprendimiento */}
			<div>
				<label
					htmlFor='nombreEmprendimiento'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					Nombre del Emprendimiento *
				</label>
				<input
					type='text'
					id='nombreEmprendimiento'
					name='nombreEmprendimiento'
					value={formData.nombreEmprendimiento}
					onChange={handleChange}
					placeholder='Nombre de tu negocio'
					required
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
				/>
			</div>

			{/* Instagram */}
			<div>
				<label
					htmlFor='instagram'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					Instagram
				</label>
				<input
					type='text'
					id='instagram'
					name='instagram'
					value={formData.instagram}
					onChange={handleChange}
					placeholder='@tu_cuenta'
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
				/>
			</div>

			{/* Facebook */}
			<div>
				<label
					htmlFor='facebook'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					Facebook
				</label>
				<input
					type='text'
					id='facebook'
					name='facebook'
					value={formData.facebook}
					onChange={handleChange}
					placeholder='Tu página de Facebook'
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition'
				/>
			</div>

			{/* Descripción */}
			<div>
				<label
					htmlFor='descripcion'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					Descripción del Emprendimiento *
				</label>
				<textarea
					id='descripcion'
					name='descripcion'
					value={formData.descripcion}
					onChange={handleChange}
					placeholder='Cuéntanos qué haces, a quién sirves y qué te diferencia. Este contenido se utilizará en nuestras publicaciones de redes sociales.'
					rows='5'
					required
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none'></textarea>
			</div>

			{/* File Upload - Logo */}
			<div>
				<label
					htmlFor='archivoLogo'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					Logo o Imagen del Emprendimiento *
				</label>
				<div className='relative'>
					<input
						type='file'
						id='archivoLogo'
						name='archivoLogo'
						ref={fileInputRef}
						onChange={handleFileChange}
						accept='image/*'
						required
						className='hidden'
					/>
					<label
						htmlFor='archivoLogo'
						className='flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-lg bg-primary-50 dark:bg-primary-900 hover:bg-primary-100 dark:hover:bg-primary-800 cursor-pointer transition'>
						<div className='text-center'>
							<svg
								className='w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 4v16m8-8H4'
								/>
							</svg>
							<p className='text-sm font-medium text-primary-700 dark:text-primary-300'>
								{fileName ? `✓ ${fileName}` : "Haz clic o arrastra una imagen"}
							</p>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>PNG, JPG, GIF (máx. 1MB)</p>
						</div>
					</label>
				</div>
				{logoPreview && (
					<div className='mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg'>
						<p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Vista previa:</p>
						<img
							src={logoPreview}
							alt='Logo preview'
							className='max-w-full h-auto max-h-48 rounded-lg mx-auto object-contain'
						/>
					</div>
				)}
			</div>

			{/* File Upload - Foto del Producto */}
			<div>
				<label
					htmlFor='fotoProducto'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					Foto del Producto del Negocio *
				</label>
				<div className='relative'>
					<input
						type='file'
						id='fotoProducto'
						name='fotoProducto'
						ref={productFileInputRef}
						onChange={handleProductFileChange}
						accept='image/*'
						required
						className='hidden'
					/>
					<label
						htmlFor='fotoProducto'
						className='flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-lg bg-primary-50 dark:bg-primary-900 hover:bg-primary-100 dark:hover:bg-primary-800 cursor-pointer transition'>
						<div className='text-center'>
							<svg
								className='w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 4v16m8-8H4'
								/>
							</svg>
							<p className='text-sm font-medium text-primary-700 dark:text-primary-300'>
								{productFileName ? `✓ ${productFileName}` : "Haz clic o arrastra una imagen"}
							</p>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>PNG, JPG, GIF (máx. 1MB)</p>
						</div>
					</label>
				</div>
				{productPreview && (
					<div className='mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg'>
						<p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Vista previa:</p>
						<img
							src={productPreview}
							alt='Producto preview'
							className='max-w-full h-auto max-h-48 rounded-lg mx-auto object-contain'
						/>
					</div>
				)}
			</div>

			{/* File Upload - Segunda Foto del Producto */}
			<div>
				<label
					htmlFor='fotoProducto2'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					Segunda Foto del Producto del Negocio *
				</label>
				<div className='relative'>
					<input
						type='file'
						id='fotoProducto2'
						name='fotoProducto2'
						ref={secondProductFileInputRef}
						onChange={handleSecondProductFileChange}
						accept='image/*'
						required
						className='hidden'
					/>
					<label
						htmlFor='fotoProducto2'
						className='flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-lg bg-primary-50 dark:bg-primary-900 hover:bg-primary-100 dark:hover:bg-primary-800 cursor-pointer transition'>
						<div className='text-center'>
							<svg
								className='w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 4v16m8-8H4'
								/>
							</svg>
							<p className='text-sm font-medium text-primary-700 dark:text-primary-300'>
								{secondProductFileName ? `? ${secondProductFileName}` : 'Haz clic o arrastra una imagen'}
							</p>
							<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>PNG, JPG, GIF (max. 1MB)</p>
						</div>
					</label>
				</div>
				{secondProductPreview && (
					<div className='mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg'>
						<p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Vista previa:</p>
						<img
							src={secondProductPreview}
							alt='Segunda foto del producto preview'
							className='max-w-full h-auto max-h-48 rounded-lg mx-auto object-contain'
						/>
					</div>
				)}
			</div>

			{/* reCAPTCHA */}
			<div className='flex justify-center'>
				{RECAPTCHA_KEY && (
					<ReCAPTCHA
						ref={recaptchaRef}
						sitekey={RECAPTCHA_KEY}
						onChange={handleRecaptcha}
					/>
				)}
			</div>

			{/* Submit Button */}
			<button
				type='submit'
				disabled={!isFormValid()}
				className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 ${
					isFormValid()
						? "bg-primary-600 hover:bg-primary-700 text-white cursor-pointer shadow-md hover:shadow-lg"
						: "bg-gray-300 text-gray-500 cursor-not-allowed"
				}`}>
				{loading ? "Enviando..." : "Registrar Emprendimiento"}
			</button>
		</form>
	);
}
