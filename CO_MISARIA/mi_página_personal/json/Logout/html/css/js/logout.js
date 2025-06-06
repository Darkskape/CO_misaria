console.log("JS cargado correctamente");

let extraTimer, finalExtra;

function actReloj() {
  function actualizarReloj() {
    let hhmmss = new Date();
    let horas = hhmmss.getHours().toString().padStart(2, '0');
    let minutos = hhmmss.getMinutes().toString().padStart(2, '0');
    let segundos = hhmmss.getSeconds().toString().padStart(2, '0');
    document.getElementById('reloj').innerText = `${horas}:${minutos}:${segundos}`;
    setTimeout(actualizarReloj, 1000);
  }
  actualizarReloj();
}

function iniciarCuentaAtras() {
  const tiempoInicio = Date.now();
  const finTurno = tiempoInicio + 8 * 60 * 60 * 1000;

  function actualizarCuenta() {
    const ahora = Date.now();
    let restante = finTurno - ahora;

    if (restante > 0) {
      const h = Math.floor(restante / 3600000);
      const m = Math.floor((restante % 3600000) / 60000);
      const s = Math.floor((restante % 60000) / 1000);
      document.getElementById("countdown").innerText = `Fin del turno en: ${h}h ${m}m ${s}s`;
    } else {
      clearInterval(extraTimer);
      iniciarHorasExtra();
      return;
    }
    extraTimer = setTimeout(actualizarCuenta, 1000);
  }
  actualizarCuenta();
}

function iniciarHorasExtra() {
  const unaHora = Date.now() + 60 * 60 * 1000;
  document.getElementById("countdown").innerText = "Tiempo para las horas extra en 1h";

  function cuentaExtra() {
    const ahora = Date.now();
    const restante = unaHora - ahora;

    if (restante > 0) {
      const m = Math.floor((restante % 3600000) / 60000);
      const s = Math.floor((restante % 60000) / 1000);
      document.getElementById("countdown").innerText = `Horas extra en: ${m}m ${s}s`;
    } else {
      iniciarTiempoExtra();
    }
    extraTimer = setTimeout(cuentaExtra, 1000);
  }
  cuentaExtra();
}

function iniciarTiempoExtra() {
  finalExtra = Date.now();
  document.getElementById("countdown").innerHTML = "<strong>Tiempo extra iniciado</strong>";

  function actualizarExtra() {
    const ahora = Date.now();
    const diff = ahora - finalExtra;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById("countdown").innerHTML = `Tiempo extra total: ${h}h ${m}m ${s}s`;
    setTimeout(actualizarExtra, 1000);
  }
  actualizarExtra();
}

function calcularDiferenciaFechas(fechaFutura, fechaActual) {
  let diferenciaMilisegundos = fechaFutura - fechaActual;
  let años = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365));
  diferenciaMilisegundos %= (1000 * 60 * 60 * 24 * 365);
  let meses = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 30));
  diferenciaMilisegundos %= (1000 * 60 * 60 * 24 * 30);
  let días = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
  return { años, meses, días };
}

function actualizarRestantesConDatos(fechasBD) {
  const hoy = new Date();
  const fechas = {
    restantea: new Date(fechasBD.fecha_armas),
    restanteb: new Date(fechasBD.fecha_coche),
    restantec: new Date(fechasBD.fecha_moto)
  };
  for (const [id, fecha] of Object.entries(fechas)) {
    const diff = calcularDiferenciaFechas(fecha, hoy);
    const el = document.getElementById(id);
    if (el) {
      let texto = `Quedan ${diff.días} días, ${diff.meses} meses y ${diff.años} años para renovar el carné de `;
      if (id === "restantea") texto += "armas.";
      if (id === "restanteb") texto += "coche.";
      if (id === "restantec") texto += "moto.";
      el.innerText = texto;
    }
  }
}

function logout() {
  fetch('http://localhost:3000/api/logout', { method: 'POST' })
    .then(() => {
      alert("Desconectado, Gracias por su trabajo!!");
      window.location.href = 'login.html';
    });
}

// Ejecutar todo al cargar
window.onload = () => {
  actReloj();
  iniciarCuentaAtras();

  const userId = sessionStorage.getItem('userId');
  if (userId) {
    fetch(`http://localhost:3000/api/fechas-renovacion?userId=${userId}`)
      .then(res => res.json())
      .then(data => actualizarRestantesConDatos(data));
  }
};
