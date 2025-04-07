const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas de API
app.use('/api', apiRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
  console.log(`Abre tu navegador en http://localhost:${port} para ver la interfaz`);
});