/**
 * ImageWithFallback Component
 * Maneja carga de imágenes con fallback y error handling
 */

import React, { useState } from "react";
import { logger } from "../utils/logger";

export const ImageWithFallback = ({
	src,
	fallbackSrc = "/placeholder.svg",
	alt = "Imagen",
	className = "",
	onLoad = null,
	onError = null,
	...props
}) => {
	const [imageSrc, setImageSrc] = useState(src);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const handleLoad = () => {
		setIsLoading(false);
		onLoad && onLoad();
		logger.debug("Imagen cargada exitosamente", { src: imageSrc });
	};

	const handleError = () => {
		setIsLoading(false);
		setHasError(true);

		// Si no es el fallback, intentar con el fallback
		if (imageSrc !== fallbackSrc) {
			logger.warn("Error al cargar imagen, usando fallback", {
				originalSrc: src,
				fallbackSrc,
			});
			setImageSrc(fallbackSrc);
		} else {
			logger.error("Error al cargar imagen fallback", { src: fallbackSrc });
		}

		onError && onError();
	};

	return (
		<div className={`relative overflow-hidden ${className}`}>
			{isLoading && !hasError && (
				<div className='absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
					<svg
						className='animate-spin h-8 w-8 text-gray-400 dark:text-gray-500'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'></circle>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
					</svg>
				</div>
			)}

			<img
				src={imageSrc}
				alt={alt}
				onLoad={handleLoad}
				onError={handleError}
				className={className}
				{...props}
			/>
		</div>
	);
};

/**
 * Placeholder de imagen mientras carga
 */
export const ImagePlaceholder = ({ className = "" }) => (
	<div
		className={`bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center ${className}`}>
		<svg
			className='w-1/3 h-1/3 text-gray-400 dark:text-gray-600'
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
			/>
		</svg>
	</div>
);

/**
 * Error fallback para imágenes
 */
export const ImageErrorFallback = ({ alt = "Imagen no disponible" }) => (
	<div className='w-full h-full bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center p-4'>
		<svg
			className='w-12 h-12 text-gray-400 dark:text-gray-600 mb-2'
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M12 9v2m0 4v2m0 4v2M8 19h8m-4-6l-2-2m0 4l2-2m0 4l-2-2'
			/>
		</svg>
		<p className='text-sm text-gray-500 dark:text-gray-400 text-center mt-2'>{alt}</p>
	</div>
);

export default ImageWithFallback;
