const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Ruta para contar todos los puntos en planet_osm_line
router.get('/count-points', async (req, res) => {
  try {
    // Esta consulta SQL cuenta los puntos totales en todas las líneas
    const query = `
      SELECT SUM(ST_NPoints(way)) as total_points
      FROM planet_osm_line;
    `;
    
    const result = await pool.query(query);
    
    res.json({
      success: true,
      total_points: parseInt(result.rows[0].total_points),
      message: 'Número total de puntos en planet_osm_line'
    });
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el conteo de puntos',
      error: error.message
    });
  }
});

// Ruta para contar puntos por tipo de vía
router.get('/count-points-by-highway', async (req, res) => {
  try {
    const query = `
      SELECT highway, SUM(ST_NPoints(way)) as points
      FROM planet_osm_line
      WHERE highway IS NOT NULL
      GROUP BY highway
      ORDER BY points DESC;
    `;
    
    const result = await pool.query(query);
    
    res.json({
      success: true,
      data: result.rows,
      message: 'Número de puntos por tipo de vía'
    });
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el conteo de puntos por tipo',
      error: error.message
    });
  }
});

module.exports = router;