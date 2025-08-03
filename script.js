// Configuración de rango y días
const horaInicio = "07:30";
const horaFin = "23:15";
const intervaloMinutos = 45;
const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const horario = document.getElementById("horario");
const desde = document.getElementById("desde");
const hasta = document.getElementById("hasta");

// Generar las opciones de horas en los select
function generarOpcionesHoras() {
  const opciones = [];
  let actual = convertirAHora(horaInicio);
  const fin = convertirAHora(horaFin);

  while (actual < fin) {
    const siguiente = new Date(actual);
    siguiente.setMinutes(actual.getMinutes() + intervaloMinutos);
    opciones.push(`${formatear(actual)} - ${formatear(siguiente)}`);
    actual = siguiente;
  }

  opciones.forEach((bloque) => {
    const option1 = document.createElement("option");
    option1.textContent = bloque;
    const option2 = option1.cloneNode(true);
    desde.appendChild(option1);
    hasta.appendChild(option2);
  });

  return opciones;
}

// Construir la grilla de horarios
function construirTabla(bloques) {
  // Cabecera
  const cabecera = document.createElement("tr");
  cabecera.innerHTML = `<th>Hora</th>${dias.map(d => `<th>${d}</th>`).join("")}`;
  horario.appendChild(cabecera);

  // Filas
  bloques.forEach(bloque => {
    const fila = document.createElement("tr");
    const celdaHora = document.createElement("td");
    celdaHora.textContent = bloque;
    fila.appendChild(celdaHora);

    dias.forEach(dia => {
      const celda = document.createElement("td");
      celda.dataset.dia = dia;
      celda.dataset.bloque = bloque;
      celda.addEventListener("click", () => {
        if (celda.textContent) {
          const confirmacion = confirm("¿Deseas eliminar este curso?");
          if (confirmacion) {
            celda.textContent = "";
            celda.style.backgroundColor = "";
          }
        }
      });
      fila.appendChild(celda);
    });

    horario.appendChild(fila);
  });
}

// Convertir string a objeto Date
function convertirAHora(str) {
  const [h, m] = str.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

// Dar formato a la hora
function formatear(date) {
  return date.toTimeString().slice(0, 5);
}

// Obtener todos los días seleccionados
function obtenerDiasSeleccionados() {
  return Array.from(document.querySelectorAll('input[name="dias"]:checked')).map(cb => cb.value);
}

// Buscar celdas entre horas dadas
function obtenerBloquesEntre(desde, hasta) {
  const opciones = Array.from(document.querySelectorAll("#desde option")).map(o => o.textContent);
  const inicioIndex = opciones.indexOf(desde);
  const finIndex = opciones.indexOf(hasta);
  return opciones.slice(inicioIndex, finIndex + 1);
}

// Agregar curso
document.getElementById("agregar").addEventListener("click", () => {
  const nombre = document.getElementById("curso").value;
  const color = document.getElementById("color").value;
  const diaSeleccionados = obtenerDiasSeleccionados();
  const desdeHora = desde.value;
  const hastaHora = hasta.value;

  if (!nombre || !diaSeleccionados.length || !desdeHora || !hastaHora) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const bloquesSeleccionados = obtenerBloquesEntre(desdeHora, hastaHora);
  bloquesSeleccionados.forEach(bloque => {
    diaSeleccionados.forEach(dia => {
      const celda = document.querySelector(`td[data-dia="${dia}"][data-bloque="${bloque}"]`);
      if (celda) {
        celda.textContent = nombre;
        celda.style.backgroundColor = color;
      }
    });
  });
});

// Inicialización
const bloques = generarOpcionesHoras();
construirTabla(bloques);
