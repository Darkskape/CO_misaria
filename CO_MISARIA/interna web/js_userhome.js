console.log("JS cargado correctamente");

//SALUDO BIENVENIDA
//Recuperar datos del usuario entrar en Área personal
document.addEventListener("DOMContentLoaded", () => {
  const nombre = localStorage.getItem("usuarioNombre");
  const cargo = localStorage.getItem("usuarioCargo");

  const saludo = document.getElementById("bienvenida");
  if (saludo && nombre && cargo) {
    saludo.textContent = `¡Bienvenido/a, ${cargo} ${nombre} !`;
  }
});

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
        let texto = `Quedan ${diff.días} días, ${diff.meses} meses y ${diff.años} años para renovar el CARNET DE `;
        if (id === "restantea") texto += "ARMAS.";
        if (id === "restanteb") texto += "COCHE.";
        if (id === "restantec") texto += "MOTO.";
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

// SCRIPT PARA CUANDO SE SELECIONA UNA SECCIÓN DEL NAV

function mostrarSeccion(id) {
  // Ocultar todas las cajas
  const secciones = document.querySelectorAll('.caja_1');
  secciones.forEach(seccion => seccion.style.display = 'none');

  // Mostrar la sección seleccionada
  const activa = document.getElementById(id);
  if (activa) {
    activa.style.display = 'block';
  }
}

//SCRIPT PARA SECCIÓN TAREAS (CHECKBOX)

// Función que aplica o quita la clase "completed" y guarda el estado
function toggleCompleted(checkbox) {
  const label = checkbox.parentElement;
  const id = checkbox.dataset.id;
  const isChecked = checkbox.checked;

  if (isChecked) {
    label.classList.add('completed');
  } else {
    label.classList.remove('completed');
  }

  // Guardar el estado en localStorage
  localStorage.setItem(id, isChecked ? '1' : '0');
}

// Al cargar la página, restaurar el estado de los checks
window.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    const id = checkbox.dataset.id;
    const savedState = localStorage.getItem(id);

    if (savedState === '1') {
      checkbox.checked = true;
      checkbox.parentElement.classList.add('completed');
    }

    // Escuchar cambios
    checkbox.addEventListener('change', () => toggleCompleted(checkbox));
  });
});

//Para el abrir y cerrar el apartado de MENSAJES

const icono = document.getElementById("Mensajes");
const menu = document.getElementById("myLinks");

// Alternar visibilidad al hacer clic en el icono
icono.addEventListener("click", function (e) {
  e.stopPropagation(); // evita que se cierre al hacer clic en el icono
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
});

// Cerrar si haces clic fuera del desplegable
window.addEventListener("click", function (e) {
  const dropdown = document.getElementById("mensajeDesplegable");
  if (!dropdown.contains(e.target)) {
    menu.style.display = "none";
  }
});

//Eliminar un mensaje

function eliminarMensaje(elemento) {
  const mensaje = elemento.parentElement;
  mensaje.classList.add("eliminando");

  // Espera a que termine la animación antes de eliminar del DOM
  mensaje.addEventListener("animationend", () => {
    mensaje.remove();
  });
}

//SECCIÓN: NÓMINAS

//Para que al pulsar el año se despligue la lista de nóminas        
const años = document.querySelectorAll('.año');

document.addEventListener('click', (event) => {
  let clickedAño = false;

  años.forEach((año) => {
    const lista = año.nextElementSibling;

    if (año.contains(event.target)) {
      clickedAño = true;

      // Cierra todas las listas menos la clicada
      document.querySelectorAll('.lista-nominas').forEach((l) => {
        if (l !== lista) l.classList.remove('activa');
      });

      // Toggle de la lista clicada
      lista.classList.toggle('activa');
    }
  });

  // Cierra todas si haces clic fuera
  if (!clickedAño) {
    document.querySelectorAll('.lista-nominas').forEach((l) => {
      l.classList.remove('activa');
    });
  }
});

//SECCION LICENCIAS

   document.addEventListener("DOMContentLoaded", function () {
    const desplegables = document.querySelectorAll('.desplegable-licen');

    desplegables.forEach(desplegable => {
        const boton = desplegable.querySelector('.licencia');

        boton.addEventListener('click', function (e) {
            e.stopPropagation();

            // Cerrar los demás
            desplegables.forEach(d => {
                if (d !== desplegable) {
                    d.classList.remove('activo');
                }
            });

            // Alternar el actual
            desplegable.classList.toggle('activo');
        });
    });

    // Cerrar si se hace clic fuera de todos
    document.addEventListener('click', function () {
        desplegables.forEach(d => d.classList.remove('activo'));
    });
});

//SECCIÓN: K-9
//Script para que se rellenen los datos del perro con la base de datos
document.addEventListener("DOMContentLoaded", () => {
  fetch("perritos_k9.json")
    .then(res => res.json())
    .then(json => {
      const tabla = json.find(obj => obj.type === "table" && obj.name === "perritos_k9");
      const perros = tabla?.data || [];

      const idUsuario = localStorage.getItem("usuarioID"); // <- ID del usuario que inició sesión

      const k9 = perros.find(perro => perro.id_user === idUsuario); // <- Ahora sí buscamos

      if (k9) {
        document.getElementById("nombre-k9").textContent = k9.nombre;
        document.getElementById("id-k9").textContent = k9.id_user;
        document.getElementById("raza-k9").textContent = k9.raza;
        document.getElementById("edad-k9").textContent = k9.edad;
        document.getElementById("peso-k9").textContent = k9.peso + " kg";
        document.getElementById("ingreso-k9").textContent = k9.ingreso;
        document.getElementById("activo-k9").textContent = k9.años_activo;
        document.getElementById("especialidad-k9").textContent = k9.especialidad;
        document.getElementById("estado-k9").textContent = k9.estado_fisico;

        const foto = document.getElementById("foto-k9");
        if (foto) {
          foto.src = `IMG/perro${k9.id_canino}.jpg`;
          foto.alt = `Foto de ${k9.nombre}`;
        }

        
      } else {
        console.warn("No se encontró K-9 para el usuario:", idUsuario);
      }
    })
    .catch(err => console.error("Error cargando JSON:", err));
});