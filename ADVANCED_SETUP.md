# ⚙️ Configuraciones Avanzadas - Directorio Emprendedor

Esta guía contiene configuraciones avanzadas y personalizaciones para desarrolladores.

---

## 🎨 Personalizar Paleta de Colores

### Cambiar el color primario

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',   // ← Color principal (botones, highlights)
        700: '#7e22ce',   // ← Color hover
        800: '#6b21a8',
        900: '#581c87',
      },
    },
  },
},
```

**Herramientas útiles:**

- [Tailwind Color Generator](https://www.twind.style/docs)
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- [Color Hunt](https://colorhunt.co/)

---

## 🔐 Variables de Entorno Avanzadas

### Desarrollo

```env
# Modo desarrollo
VITE_GOOGLE_APPS_SCRIPT_URL=http://localhost:3000
VITE_RECAPTCHA_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI

# Logging
DEBUG=true
```

### Producción

```env
# Modo producción
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercodeapp
VITE_RECAPTCHA_KEY=YOUR_PRODUCTION_SITE_KEY

# Logging
DEBUG=false
```

---

## 📦 Ampliaciones de Dependencias

### Añadir Nuevas Librerías

#### Notificaciones mejoradas (Toastify)

```bash
npm install react-toastify
```

Usar en `RegistrationForm.jsx`:

```javascript
import { toast } from "react-toastify";

toast.success("¡Registro exitoso!");
toast.error("Error al enviar");
```

#### Validación de formularios (React Hook Form)

```bash
npm install react-hook-form
```

#### Llamadas API mejoradas (Axios)

```bash
npm install axios
```

#### Animaciones avanzadas (Framer Motion)

```bash
npm install framer-motion
```

---

## 🚀 Optimizaciones de Rendimiento

### Code Splitting en React Router

```javascript
// src/App.jsx
import { lazy, Suspense } from "react";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

function App() {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<Routes>
				<Route
					path='/'
					element={<LandingPage />}
				/>
				<Route
					path='/registro'
					element={<RegisterPage />}
				/>
			</Routes>
		</Suspense>
	);
}
```

### Optimizar Imágenes

Usa `next-image` o comprime previamente:

```bash
npm install sharp
```

---

## 🔄 Integración con Backend Avanzada

### Manejo de Errores Global

```javascript
// src/services/api.js
export const API_ERRORS = {
	NETWORK_ERROR: "Error de conexión",
	INVALID_DATA: "Datos inválidos",
	SERVER_ERROR: "Error del servidor",
};

export async function submitForm(formData) {
	try {
		// ...
	} catch (error) {
		if (error.name === "NetworkError") {
			throw new Error(API_ERRORS.NETWORK_ERROR);
		}
		// ...
	}
}
```

### Reintentos Automáticos

```javascript
export async function submitFormWithRetry(formData, maxRetries = 3) {
	let attempts = 0;

	while (attempts < maxRetries) {
		try {
			return await submitForm(formData);
		} catch (error) {
			attempts++;
			if (attempts === maxRetries) throw error;
			await new Promise((r) => setTimeout(r, 1000 * attempts));
		}
	}
}
```

---

## 🧪 Testing

### Instalar Testing Library

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### Ejemplo de Test

```javascript
// src/components/Navbar.test.jsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
	it("renders navigation links", () => {
		render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);

		expect(screen.getByText("Inicio")).toBeInTheDocument();
		expect(screen.getByText("Regístrate")).toBeInTheDocument();
	});
});
```

---

## 📊 Analytics

### Añadir Google Analytics

```bash
npm install react-ga4
```

```javascript
// src/main.jsx
import ReactGA from "react-ga4";

ReactGA.initialize("G-XXXXXXXXXX");

ReactGA.pageview(window.location.pathname);
```

### Eventos Personalizados

```javascript
// En RegistrationForm.jsx
const handleSubmit = async (e) => {
	ReactGA.event("registro_enviado", {
		nombre_emprendimiento: formData.nombreEmprendimiento,
	});
	// ...
};
```

---

## 🔑 Autenticación (Opcional)

### Usar Firebase Auth

```bash
npm install firebase
```

```javascript
// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	// ...
});

export const auth = getAuth(firebaseApp);
```

---

## 🌐 SEO

### Meta Tags Dinámicos

```javascript
// src/utils/seo.js
export function updateMetaTags(title, description) {
	document.title = title;
	document.querySelector('meta[name="description"]').content = description;
}
```

### Usar en Páginas

```javascript
// src/pages/RegisterPage.jsx
import { updateMetaTags } from '../utils/seo'

export default function RegisterPage() {
  useEffect(() => {
    updateMetaTags(
      'Registra tu Emprendimiento',
      'Únete a nuestro directorio de emprendedores'
    )
  }, [])

  return (...)
}
```

---

## 🐳 Docker

### Dockerfile para Desarrollo

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
```

### docker-compose.yml

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - VITE_GOOGLE_APPS_SCRIPT_URL=${VITE_GOOGLE_APPS_SCRIPT_URL}
      - VITE_RECAPTCHA_KEY=${VITE_RECAPTCHA_KEY}
```

Usar con:

```bash
docker-compose up
```

---

## 🔄 CI/CD con GitHub Actions

### .github/workflows/build.yml

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build
        env:
          VITE_GOOGLE_APPS_SCRIPT_URL: ${{ secrets.GOOGLE_APPS_SCRIPT_URL }}
          VITE_RECAPTCHA_KEY: ${{ secrets.RECAPTCHA_KEY }}

      - name: Deploy to Vercel
        uses: vercel/actions/git/push@main
        with:
          token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 📝 Linting y Formatting

### ESLint

```bash
npm install --save-dev eslint eslint-plugin-react
npx eslint --init
```

### Prettier

```bash
npm install --save-dev prettier
```

Crear `.prettierrc`:

```json
{
	"semi": false,
	"singleQuote": true,
	"tabWidth": 2,
	"trailingComma": "es5"
}
```

---

## 🌍 Multiidioma (i18n)

### Instalar librería

```bash
npm install i18next react-i18next
```

### Estructura

```
src/
  ├── locales/
  │   ├── es.json
  │   └── en.json
  └── i18n.js
```

### Uso

```javascript
import { useTranslation } from "react-i18next";

export default function Navbar() {
	const { t } = useTranslation();

	return <h1>{t("navbar.title")}</h1>;
}
```

---

## 🔔 Notificaciones en Tiempo Real

### Con Socket.io

```bash
npm install socket.io-client
```

```javascript
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);

socket.on("nuevo_registro", (data) => {
	console.log("Nuevo emprendimiento registrado:", data);
});
```

---

## 🎯 Buenas Prácticas

1. **Separación de Responsabilidades**
   - Lógica en servicios/hooks
   - Estilos en componentes o archivos CSS
   - Datos en contexto o Redux

2. **Nomenclatura**
   - Componentes: PascalCase (Navbar.jsx)
   - Funciones: camelCase (submitForm)
   - Constantes: UPPER_SNAKE_CASE (API_URL)

3. **Organización de Carpetas**
   - Agrupa por funcionalidad, no por tipo
   - Mantén archivos pequeños y enfocados
   - Usa índices para exports limpios

4. **Performance**
   - Usa React.memo() para componentes puros
   - Optimiza con useMemo y useCallback
   - Lazy load rutas y componentes pesados

5. **Seguridad**
   - Nunca commits secrets
   - Valida datos en cliente y servidor
   - Usa Content Security Policy

---

## 📚 Recursos Útiles

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [reCAPTCHA Docs](https://developers.google.com/recaptcha)
- [Google Apps Script](https://developers.google.com/apps-script)

---

**Última actualización: 2 de febrero de 2026**
