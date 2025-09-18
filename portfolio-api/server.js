// server.js (CommonJS)
const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

// === 1) CORS: limita a tus orígenes (ajusto tras desplegar en Vercel) ===
const ALLOWED_ORIGINS = [
  'http://localhost:4200',
  'https://TU-APP.vercel.app' // <-- cámbialo por tu dominio real de Vercel
];
app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true); // permite curl/postman
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error('CORS: origin not allowed'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// === 2) Seguridad + compresión ===
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(compression());
app.use(express.json());

// === 3) Rutas estáticas con cache ===
const STATIC_MAX_AGE = '7d';
const staticOpts = { maxAge: STATIC_MAX_AGE, etag: true, fallthrough: true };

// __dirname apunta a la carpeta donde está server.js
app.use('/images', express.static(path.join(__dirname, 'images'), staticOpts));
app.use('/icons',  express.static(path.join(__dirname, 'icons'), staticOpts));
app.use('/public', express.static(path.join(__dirname, 'public'), staticOpts));
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico'), staticOpts));

// === 4) Endpoints mínimos ===
app.get('/health', (_, res) => res.json({ ok: true }));
app.get('/', (_, res) => res.send('API de imágenes funcionando'));

// (ejemplo) endpoint de contacto
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  // TODO: nodemailer / DB / lo que quieras
  res.json({ ok: true });
});

// === 5) Arranque ===
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
