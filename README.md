# 🎨 Portfolio Personal - Ana Mª Ramallo González

> Portfolio web profesional desarrollado con Angular 18 y Node.js, desplegado en Vercel y Railway con arquitectura moderna y optimizada.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://www.anaramallo.dev)
[![Angular](https://img.shields.io/badge/Angular-18-DD0031?logo=angular)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📋 Sobre el Proyecto

Portfolio web personal que muestra mis proyectos, habilidades y experiencia profesional. Diseñado con enfoque en rendimiento, accesibilidad y experiencia de usuario.

**🌐 Demo en vivo:** [www.anaramallo.dev](https://www.anaramallo.dev)

## ✨ Características Principales

- **🎯 Diseño Responsive**: Adaptado a todos los dispositivos (móvil, tablet, desktop)
- **⚡ Alto Rendimiento**: Carga optimizada con compresión y estrategias de caché
- **🔒 Seguridad**: Implementación de CORS y Helmet.js para headers seguros
- **🎨 UI/UX Moderna**: Interfaz limpia e intuitiva construida con Tailwind CSS
- **📦 Gestión Eficiente de Assets**: Estrategia de caché de 7 días para recursos estáticos

## 🛠️ Stack Tecnológico

### Frontend
- **Framework:** Angular 18.2.6
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Hosting:** Vercel (CDN Global)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Seguridad:** Helmet, CORS
- **Optimización:** Compression, Cache headers
- **Hosting:** Railway

### DevOps & Herramientas
- Git & GitHub (Control de versiones)
- Railway & Vercel (Plataformas de despliegue)

## 🚀 Arquitectura

```
┌──────────────────────┐
│    Vercel CDN        │  ← Frontend (Angular)
│ www.anaramallo.dev   │
└──────────┬───────────┘
           │ HTTPS
           ▼
┌──────────────────────┐
│   Railway API        │  ← Backend (Node.js/Express)
│   Static Assets      │
└──────────────────────┘
```

### Ventajas de la Arquitectura

- **Separación de responsabilidades**: Frontend y backend independientes
- **Escalabilidad**: Cada parte puede escalar independientemente
- **Performance**: CDN global para el frontend
- **Sin cold starts**: Backend siempre activo en Railway

## 📦 Instalación y Desarrollo

### Prerrequisitos

```bash
node >= 18.x
npm >= 9.x
```

### Clonar el repositorio

```bash
git clone https://github.com/anaramallo/Portfolio.git
cd Portfolio
```

### Frontend (Angular)

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve

# Build de producción
ng build --configuration production
```

La aplicación estará disponible en `http://localhost:4200/`

### Backend (Node.js)

```bash
# Ir a la carpeta del backend
cd portfolio-api

# Instalar dependencias
npm install

# Iniciar servidor
npm start
```

El servidor estará disponible en `http://localhost:5000/`

## 🌍 Variables de Entorno

### Frontend (`src/environments/`)

```typescript
export const environment = {
  production: true,
  API_BASE_URL: 'https://portfolio-production-f158.up.railway.app'
};
```

### Backend

```bash
PORT=5000
NODE_ENV=production
```

## 📂 Estructura del Proyecto

```
Portfolio/
├── src/                      # Código fuente Angular
│   ├── app/                  # Componentes y servicios
│   ├── assets/               # Assets estáticos
│   └── environments/         # Configuración de entornos
├── portfolio-api/            # Backend Node.js
│   ├── images/               # Imágenes del portfolio
│   ├── icons/                # Iconos y logos
│   ├── docs/                 # Documentos (CV, etc.)
│   ├── server.js             # Servidor Express
│   └── package.json
├── angular.json              # Configuración Angular
└── package.json
```

## 🔧 Scripts Disponibles

### Frontend
```bash
npm start           # Servidor de desarrollo
npm run build       # Build de producción
npm test            # Ejecutar tests
npm run lint        # Linter
```

### Backend
```bash
npm start           # Iniciar servidor
npm run dev         # Modo desarrollo con nodemon
```

## 🚀 Despliegue

### Frontend (Vercel)
```bash
# Conectar con Vercel
vercel login

# Deploy
vercel --prod
```

### Backend (Railway)
```bash
# El despliegue es automático desde GitHub
# Configurar Root Directory: portfolio-api
# Start Command: node server.js
```

## 📊 Rendimiento

- **Lighthouse Score**: 95+ en todas las métricas
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Compresión Gzip**: Habilitada
- **Cache Strategy**: 7 días para assets estáticos

## 🔒 Seguridad

- **Protección CORS**: Configurado con orígenes específicos permitidos
- **Helmet.js**: Headers HTTP de seguridad para prevenir vulnerabilidades comunes
- **HTTPS**: Forzado en ambientes de producción
- **Variables de Entorno**: Datos sensibles protegidos mediante configuración de entorno

## 📝 Roadmap

- [ ] Añadir meta tags SEO y optimización Open Graph
- [ ] Implementar modo oscuro
- [ ] Añadir características de accesibilidad (cumplimiento WCAG)
- [ ] Integrar analytics web
- [ ] Soporte multi-idioma (ES/EN)
- [ ] Dashboard de monitoreo de rendimiento

## 📧 Contacto

**Ana Ramallo**
- Portfolio: [www.anaramallo.dev](https://www.anaramallo.dev)
- LinkedIn: [Ana Mª Ramallo González](www.linkedin.com/in/anamramallogonzalez)
- Email: anaramallogonzalez@gmail.com
- GitHub: [@anaramallo](https://github.com/anaramallo)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

⭐ Si este proyecto te resultó útil o inspirador, ¡déjame una estrella en GitHub!

**Hecho con ❤️ y ☕ por Ana Ramallo**
