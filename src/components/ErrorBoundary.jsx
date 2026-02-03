/**
 * Error Boundary Component
 * Captura errores en componentes hijos y muestra UI de recuperación
 */

import React from "react";
import { logger } from "../utils/logger";

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// Log del error para debugging
		logger.error("Error capturado por ErrorBoundary", {
			error: error.toString(),
			componentStack: errorInfo.componentStack,
		});

		// Guardar detalles del error
		this.setState({
			error,
			errorInfo,
		});

		// Aquí se podría enviar a servicio de monitoreo remoto
		// sendToMonitoringService(error, errorInfo);
	}

	handleReset = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
	};

	render() {
		if (this.state.hasError) {
			return (
				<div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4'>
					<div className='max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
						<div className='flex justify-center mb-4'>
							<div className='flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900'>
								<svg
									className='h-6 w-6 text-red-600 dark:text-red-200'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
							</div>
						</div>

						<h2 className='mt-4 text-center text-lg font-medium text-gray-900 dark:text-white'>Algo salió mal</h2>

						<p className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400'>
							Disculpa, ocurrió un error inesperado. Por favor, intenta recargar la página.
						</p>

						{process.env.NODE_ENV === "development" && this.state.error && (
							<details className='mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300 overflow-auto max-h-48'>
								<summary className='cursor-pointer font-semibold mb-2'>Detalles del error (Desarrollo)</summary>
								<pre className='whitespace-pre-wrap break-words'>
									{this.state.error.toString()}
									{this.state.errorInfo && "\n\n" + this.state.errorInfo.componentStack}
								</pre>
							</details>
						)}

						<div className='mt-6 flex gap-3'>
							<button
								onClick={this.handleReset}
								className='flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition'>
								Intentar de nuevo
							</button>

							<button
								onClick={() => (window.location.href = "/")}
								className='flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-medium py-2 px-4 rounded transition'>
								Ir al inicio
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
