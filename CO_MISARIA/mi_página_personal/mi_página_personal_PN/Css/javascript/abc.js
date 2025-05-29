console.log("JS cargado correctamente");

function actReloj() {

   function actualizarReloj() {
      let hhmmss = new Date();
      let horas = hhmmss.getHours();
      let minutos = hhmmss.getMinutes();
      let segundos = hhmmss.getSeconds();
      let lahora = "";

      // Convertimos los números a dos dígitos
      horas = (horas <= 9) ? ("0" + horas) : horas;
      minutos = (minutos <= 9) ? ("0" + minutos) : minutos;
      segundos = (segundos <= 9) ? ("0" + segundos) : segundos;

      // Construimos la cadena de texto HTML con la hora
      lahora = horas + ":" + minutos + ":" + segundos;
      let reloj = document.getElementById('reloj');
      if (reloj) {
         reloj.innerHTML = lahora;
      }

      // Ejecuta la función cada segundo
      setTimeout(actualizarReloj, 1000);
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

   function actualizarRestantes() {
      const hoy = new Date();

      const fechas = {
         restantea: new Date('2025-07-01'), // Armas
         restanteb: new Date('2025-07-10'), // Coche
         restantec: new Date('2025-07-20')  // Moto
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

   // Iniciar funciones
   actualizarReloj();
   actualizarRestantes();
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', actReloj);
