// server.js (CommonJS)
const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

//CORS: limita a mis orígenes (ajustar tras desplegar en Vercel)
const ALLOWED_ORIGINS = [
  'https://www.anaramallo.dev',   // dominio principal
  'https://anaramallo.dev',       // apex (redirige a www)
  'http://localhost:4200',        // dev local
  'https://portfolio-omega-two-9ib5v0fkcf.vercel.app',
  'https://portfolio-production-f158.up.railway.app' // temporal
];

app.use(cors({
  origin: (origin, cb) => {
    // peticiones sin Origin (curl/Postman/healthchecks)
    if (!origin) return cb(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    console.error('CORS blocked origin:', origin);
    return cb(new Error('CORS: origin not allowed'));
  },
  // habilitar si uso cookies o Authorization con credenciales en el front:
  // credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Preflights
app.options('*', cors());

//Seguridad + compresión
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(compression());
app.use(express.json());

//Rutas estáticas con cache
const STATIC_MAX_AGE = '7d';
const staticOpts = { maxAge: STATIC_MAX_AGE, etag: true, fallthrough: true };

//dirname apunta a la carpeta donde está server.js
app.use('/images', express.static(path.join(__dirname, 'images'), staticOpts));
app.use('/icons',  express.static(path.join(__dirname, 'icons'), staticOpts));
app.use('/public', express.static(path.join(__dirname, 'public'), staticOpts));
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico'), staticOpts));
app.use('/docs', express.static(path.join(__dirname,'docs'), staticOpts));

//Endpoints mínimos
app.get('/health', (_, res) => res.json({ ok: true }));
app.get('/', (_, res) => res.send('API de imágenes funcionando'));

// (ejemplo) endpoint de contacto
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  // TODO: nodemailer / DB / lo que quieras
  res.json({ ok: true });
});

// Descarga forzada del cv
app.get('/cv/download', (_req, res) => {
  const file = path.join(__dirname, 'docs', 'anacv.pdf');
  res.download(file, 'anacv.pdf');
});


//5) Arranque
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

