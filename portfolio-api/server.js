const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
  origin: '*'//'http://localhost:4200'
}));

//Servir imágenes desde la carpeta "images"
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));
app.use('/icons', express.static(path.join(__dirname, 'icons')));
app.use('/public', express.static(path.join(__dirname, 'public')));
//Ruta base
app.get('/', (req, res) => {
  res.send('API de imágenes funcionando');
});

//app.listen(PORT, '0.0.0.0', () => {
  //console.log(`Servidor corriendo en el puerto ${PORT}`);
//});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
