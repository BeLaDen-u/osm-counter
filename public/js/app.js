// Elementos del DOM
const countAllBtn = document.getElementById('count-all-btn');
const countByHighwayBtn = document.getElementById('count-by-highway-btn');
const resultsDiv = document.getElementById('results');

// Función para mostrar mensaje de carga
function showLoading() {
  resultsDiv.innerHTML = '<div class="loading">Cargando datos</div>';
}

// Función para mostrar mensajes de error
function showError(message) {
  resultsDiv.innerHTML = `<div class="error">${message}</div>`;
}

// Función para contar todos los puntos
async function countAllPoints() {
  showLoading();
  
  try {
    const response = await fetch('/api/count-points');
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      resultsDiv.innerHTML = `
        <h3>Total de Puntos</h3>
        <p>Hay un total de <strong>${data.total_points.toLocaleString()}</strong> puntos en la tabla planet_osm_line</p>
      `;
    } else {
      showError(data.message || 'Error desconocido');
    }
  } catch (error) {
    showError(`Error al obtener datos: ${error.message}`);
    console.error('Error completo:', error);
  }
}

// Función para contar puntos por tipo de vía
async function countPointsByHighway() {
  showLoading();
  
  try {
    const response = await fetch('/api/count-points-by-highway');
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.data && data.data.length > 0) {
      let html = '<h3>Puntos por Tipo de Vía</h3>';
      html += '<table>';
      html += '<tr><th>Tipo de Vía</th><th>Número de Puntos</th></tr>';
      
      data.data.forEach(row => {
        html += `<tr>
          <td>${row.highway || 'Sin clasificar'}</td>
          <td>${parseInt(row.points).toLocaleString()}</td>
        </tr>`;
      });
      
      html += '</table>';
      resultsDiv.innerHTML = html;
    } else if (data.data && data.data.length === 0) {
      resultsDiv.innerHTML = '<p>No se encontraron datos para mostrar.</p>';
    } else {
      showError(data.message || 'Error desconocido');
    }
  } catch (error) {
    showError(`Error al obtener datos: ${error.message}`);
    console.error('Error completo:', error);
  }
}

// Agregar event listeners a los botones
countAllBtn.addEventListener('click', countAllPoints);
countByHighwayBtn.addEventListener('click', countPointsByHighway);

// Mensaje inicial
document.addEventListener('DOMContentLoaded', () => {
  resultsDiv.innerHTML = `
    <h3>Bienvenido</h3>
    <p>Esta aplicación te permite contar los puntos en la tabla planet_osm_line de OpenStreetMap.</p>
    <p>Selecciona una de las opciones de arriba para comenzar.</p>
  `;
});