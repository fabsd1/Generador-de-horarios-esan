// Configuración de horas y bloques
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
  const bloques = generarBloques();
  horario.innerHTML = "";

  bloques.forEach((bloque, filaIndex) => {
    dias.forEach((dia, colIndex) => {
      const celda = document.createElement("div");
      celda.classList.add("celda");

      if (filaIndex === 0 && colIndex === 0) {
        celda.classList.add("cabecera");
        celda.textContent = "Hora";
      } else if (filaIndex === 0) {
        celda.classList.add("cabecera");
        celda.textContent = dia;
      } else if (colIndex === 0) {
        celda.classList.add("titulo-dia");
        celda.textContent = bloque;
      } else {
        celda.dataset.dia = dia;
        celda.dataset.hora = bloque;
        celda.onclick = () => {
          const texto = prompt("¿Nombre del curso o taller?");
          if (texto) celda.textContent = texto;
        };
        celda.ondblclick = () => {
          celda.textContent = "";
        };
      }
      horario.appendChild(celda);
    });
  });
}

construirTabla();
