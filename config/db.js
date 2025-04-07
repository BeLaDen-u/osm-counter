const { Pool } = require('pg');

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'osm',  // Nombre de la base de datos
  password: 'password', 
  port: 5432,
});

// Verificar conexión
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos establecida:', res.rows[0].now);
  }
});

module.exports = pool;