const horaInicio = "07:30";
const horaFin = "23:15";
const intervaloMinutos = 45;
const dias = ["Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const horario = document.getElementById("horario");

function generarBloques() {
  const bloques = [];
  const inicio = convertirAHoras(horaInicio);
  const fin = convertirAHoras(horaFin);

  for (let h = new Date(inicio); h < fin; h.setMinutes(h.getMinutes() + intervaloMinutos)) {
    const siguiente = new Date(h);
    siguiente.setMinutes(h.getMinutes() + intervaloMinutos);
    bloques.push(`${formatearHora(h)} - ${formatearHora(siguiente)}`);
  }
  return bloques;
}

function convertirAHoras(horaStr) {
  const [h, m] = horaStr.split(":").map(Number);
  const hoy = new Date();
  hoy.setHours(h, m, 0, 0);
  return hoy;
}

function formatearHora(date) {
  return date.toTimeString().slice(0, 5);
}

function construirTabla() {
  console.log("Construyendo horario con", horaInicio, horaFin, intervaloMinutos);
  const bloques = generarBloques();
  horario.innerHTML = "";
  ...
}
  // Setear el número correcto de columnas dinámicamente
  horario.style.gridTemplateColumns = `repeat(${totalColumnas}, 1fr)`;
  horario.innerHTML = "";

  // Primera fila: cabecera con los días
  dias.forEach(dia => {
    const celda = document.createElement("div");
    celda.className = "celda cabecera";
    celda.textContent = dia;
    horario.appendChild(celda);
  });

  // Resto de filas
  bloques.forEach(bloque => {
    dias.forEach((dia, i) => {
      const celda = document.createElement("div");
      celda.className = "celda";

      if (i === 0) {
        celda.classList.add("titulo-dia");
        celda.textContent = bloque;
      } else {
        celda.dataset.dia = dia;
        celda.dataset.hora = bloque;
        celda.onclick = () => {
          const texto = prompt("¿Nombre del curso o taller?");
          if (texto) celda.textContent = texto;
        };
      }

      horario.appendChild(celda);
    });
  });
}

construirTabla();
