// Configuración de horas y bloques
const horaInicio = "07:00";
const horaFin = "23:00";
const intervaloMinutos = 45;

const dias = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const horario = document.getElementById("horario");

function generarBloques() {
  const filas = [];
  const inicio = convertirAHoras(horaInicio);
  const fin = convertirAHoras(horaFin);

  for (let h = new Date(inicio); h < fin; h.setMinutes(h.getMinutes() + intervaloMinutos)) {
    const siguiente = new Date(h);
    siguiente.setMinutes(h.getMinutes() + intervaloMinutos);
    filas.push(`${formatearHora(h)} - ${formatearHora(siguiente)}`);
  }
  return filas;
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
  const bloques = generarBloques();
  horario.innerHTML = "";

  bloques.forEach((bloque, i) => {
    dias.forEach((dia, j) => {
      const celda = document.createElement("div");
      celda.classList.add("celda");
      if (i === 0 && j === 0) {
        celda.classList.add("cabecera");
        celda.textContent = "Hora";
      } else if (i === 0) {
        celda.classList.add("cabecera");
        celda.textContent = dia;
      } else if (j === 0) {
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
