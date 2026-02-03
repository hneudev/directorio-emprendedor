# 📚 Documentación - Emprendedores Anónimos

Esta carpeta contiene toda la documentación para desarrolladores y contribuidores del proyecto.

## 📖 Documentación Principal

### [SECURITY.md](./SECURITY.md)

Política de seguridad, mejores prácticas y guía de implementación de seguridad.

- Reporte de vulnerabilidades
- Mejores prácticas de seguridad
- Validación de datos
- Protección de credenciales

### [CODE_REVIEW.md](./CODE_REVIEW.md)

Revisión completa del código a nivel profesional senior.

- Análisis de seguridad
- Recomendaciones de mejora
- Inconsistencias de código
- Puntos de atención críticos

### [CONTRIBUTING.md](./CONTRIBUTING.md)

Guía para contribuidores del proyecto.

- Cómo reportar bugs
- Cómo proponer features
- Guía de estilo de código
- Proceso de pull requests

### [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

Código de conducta de la comunidad.

- Valores del proyecto
- Comportamiento esperado
- Proceso de resolución de conflictos

### [GITHUB_PUBLICATION_CHECKLIST.md](./GITHUB_PUBLICATION_CHECKLIST.md)

Checklist completo antes de publicar en GitHub.

- Requisitos de seguridad
- Verificaciones de código
- Documentación requerida
- Configuración de CI/CD

## 🚀 Guías Técnicas

### [README_GITHUB.md](./README_GITHUB.md)

README profesional para GitHub.

- Descripción del proyecto
- Características principales
- Instrucciones de instalación
- Cómo usar

### [TECHNICAL_SPECS.md](./TECHNICAL_SPECS.md)

Especificaciones técnicas del proyecto.

- Stack tecnológico
- Arquitectura
- Dependencias

## 📝 Resúmenes Ejecutivos

### [RESUMEN_REVISION_SENIOR.md](./RESUMEN_REVISION_SENIOR.md)

Resumen ejecutivo de la revisión de código en español.

### [REVISION_COMPLETADA.md](./REVISION_COMPLETADA.md)

Resumen de la revisión completada.

## 🔧 Configuración

- [.env.example](../.env.example) - Template de variables de entorno (sin credenciales)
- [.github/workflows/ci.yml](../.github/workflows/ci.yml) - Pipeline de CI/CD

## 📋 Estructura del Proyecto

```
emprendedores-anonimos/
├── docs/                    # Documentación (esta carpeta)
├── src/
│   ├── components/         # Componentes React
│   │   ├── common/        # Componentes compartidos
│   │   ├── form/          # Componentes de formularios
│   │   └── layout/        # Componentes de layout
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utilidades
│   ├── pages/             # Páginas
│   ├── services/          # Servicios API
│   ├── context/           # Context API
│   ├── App.jsx
│   ├── main.jsx
│   └── constants.js       # Constantes centralizadas
├── public/                # Archivos estáticos
├── .github/               # GitHub Actions
├── package.json
└── vite.config.js
```

## ✅ Checklist de Revisión Antes de Publicar

- [ ] ✅ Revisar [SECURITY.md](./SECURITY.md)
- [ ] ✅ Completar [GITHUB_PUBLICATION_CHECKLIST.md](./GITHUB_PUBLICATION_CHECKLIST.md)
- [ ] ✅ Remover credenciales del historial de Git
- [ ] ✅ Regenerar claves de API
- [ ] ✅ Ejecutar tests
- [ ] ✅ Verificar dark mode en todos los componentes
- [ ] ✅ Probar formularios con validación
- [ ] ✅ Verificar compatibility en diferentes navegadores

## 🤝 Contacto y Soporte

- 📧 Issues en GitHub: [GitHub Issues](https://github.com)
- 📖 Documentación: Ver archivos en esta carpeta
- 🐛 Bugs: Usar template en [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Última actualización:** {{ date }}
**Versión del proyecto:** 1.0.0
