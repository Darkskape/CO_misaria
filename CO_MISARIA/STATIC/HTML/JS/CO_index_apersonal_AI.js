console.log("JS cargado correctamente");

//BUSCADOR ANTECEDENTES
let antecedentes = [];
const rutaPDFAntecedentes = "FILES/ANTECEDENTES/"; // Cambia si la carpeta de los PDF es diferente

fetch("antecedentes.json")
  .then(res => res.json())
  .then(data => {
    antecedentes = data;
    filtrarAntecedentes(); // Muestra todo al inicio si quieres
  });

document.getElementById("formAntecedentes").addEventListener("input", filtrarAntecedentes);

function filtrarAntecedentes() {
  const nombre = document.getElementById("anteNombre").value.trim().toLowerCase();
  const apellidos = document.getElementById("anteApellidos").value.trim().toLowerCase();
  const dni = document.getElementById("anteDni").value.trim().toLowerCase();
  const expediente = document.getElementById("anteExpediente").value.trim().toLowerCase();
  const estado = document.getElementById("anteEstado").value.trim().toLowerCase();
  const tipo = document.getElementById("anteTipo").value.trim().toLowerCase();

  const resultados = antecedentes.filter(a => {
    return (
      (nombre === "" || a.Nombre.toLowerCase().includes(nombre)) &&
      (apellidos === "" || a.Apellido.toLowerCase().includes(apellidos)) &&
      (dni === "" || a.DNI.toLowerCase().includes(dni)) &&
      (expediente === "" || a["Nº Expediente"].toLowerCase().includes(expediente)) &&
      (estado === "" || a.Estado.toLowerCase() === estado) &&
      (tipo === "" || a.Tipo.toLowerCase() === tipo)
    );
  });

  const contenedor = document.getElementById("resultados-antecedentes");
  contenedor.innerHTML = resultados.length === 0 
    ? "<p>No se encontraron antecedentes.</p>" 
    : resultados.map(a => `
        <div class="resultado-antecedentes">
          <p><strong>${a.Nombre} ${a.Apellido}</strong></p>
          <p><strong>DNI:</strong> ${a.DNI} | <strong>Expediente:</strong> ${a["Nº Expediente"]} | <strong>Estado:</strong> ${a.Estado} | <strong>Tipo:</strong> ${a.Tipo}</p>
          <p><strong>Observaciones:</strong> ${a.Observaciones}</p>
          <a href="${rutaPDFAntecedentes}${a.pdf}" target="_blank">Ver archivo</a>
        </div>
      `).join('');
}
//BUSCADOR DE ACCESORIOS
let accesorios = [];

// Cargar los datos del JSON
fetch("accesorios_adint.json")
  .then(res => res.json())
  .then(data => {
    accesorios = data;  // Si tu JSON es un array plano como el que muestras
    mostrarAccesorios(accesorios); // Mostrar todo al principio
  })
  .catch(err => console.error("Error al cargar el JSON", err));

// Escuchar input
document.getElementById("buscadorAccesorios").addEventListener("input", filtrarAccesorios);

function filtrarAccesorios() {
  const texto = document.getElementById("buscadorAccesorios").value.trim().toLowerCase();

  const resultados = accesorios.filter(acc =>
    acc.denominacion.toLowerCase().includes(texto)
  );

  mostrarAccesorios(resultados);
}

function mostrarAccesorios(lista) {
  const contenedor = document.getElementById("listadoAccesorios");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron accesorios.</p>";
    return;
  }

  lista.forEach(acc => {
    const div = document.createElement("div");
    div.classList.add("resultado-accesorio");
    div.innerHTML = `
      <p><strong>${acc.denominacion}</strong> (ID: ${acc["id.accesorios"]})</p>
      <p>Total: ${acc.cantidad} | Activos: ${acc.activos} | Reparación: ${acc.reparacion ?? 0} | Petición: ${acc.peticion ?? 0} | Eliminar: ${acc.eliminar ?? 0}</p>
    `;
    contenedor.appendChild(div);
  });
}


//BUSCADOR DE EXPEDIENTE
let expedientes = [];
const rutaPDFExpedientes = "FILES/EXPEDIENTES/"; // Asegúrate de que esta ruta sea correcta

// Cargar los datos del JSON
fetch("expedientes.json")
  .then(res => res.json())
  .then(data => {
    expedientes = data;
    filtrarExpedientes(); // Mostrar todos los expedientes al inicio
  });

// Detectar cambios en el formulario
document.querySelector("form").addEventListener("input", filtrarExpedientes);

function filtrarExpedientes() {
  const id = document.getElementById("nombre").value.trim().toLowerCase();
  const dni = document.getElementById("dni").value.trim().toLowerCase();
  const estado = document.getElementById("estado").value.trim().toLowerCase();
  const delito = document.getElementById("delito").value.trim().toLowerCase();
  const fecha = document.querySelector("input[type='date']").value;

  const resultados = expedientes.filter(exp => {
    return (
      (id === "" || exp.id_expediente.toLowerCase().includes(id)) &&
      (dni === "" || exp.dni.toLowerCase().includes(dni)) &&
      (estado === "" || exp.estado.toLowerCase().includes(estado)) &&
      (delito === "" || exp.delito.toLowerCase().includes(delito)) &&
      (fecha === "" || exp.fecha_inicio >= fecha)
    );
  });

  mostrarResultados(resultados);
}

function mostrarResultados(lista) {
  const contenedor = document.getElementById("resultados-expedientes");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron expedientes.</p>";
    return;
  }

  lista.forEach(exp => {
    const div = document.createElement("div");
    div.classList.add("resultado-expediente");
    div.innerHTML = `
      <p><strong>Expediente:</strong> ${exp.id_expediente} — ${exp.name}</p>
      <p><strong>DNI:</strong> ${exp.dni} | <strong>Delito:</strong> ${exp.delito} | <strong>Estado:</strong> ${exp.estado}</p>
      <a href="${rutaPDFExpedientes}${exp.pdf}" target="_blank">Ver Expediente</a>
    `;
    contenedor.appendChild(div);
  });
}
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

//Para sincronizar FOTO PERSONAL

document.addEventListener("DOMContentLoaded", () => {
  const idUsuario = localStorage.getItem("usuarioID"); // ID del usuario que ha iniciado sesión

  fetch("usuarios_convertidos.json") // tu archivo JSON real
    .then(res => res.json())
    .then(json => {
      const tabla = json.find(obj => obj.type === "table" && obj.name === "ueser_co");
      const usuarios = tabla?.data || [];

      const usuarioActual = usuarios.find(u => u.id_user === idUsuario);

      if (usuarioActual && usuarioActual.foto) {
        const foto = document.getElementById("userPhoto"); // tu <img id="userPhoto">

        if (foto) {
          foto.src = `IMG/${usuarioActual.foto}`; // o IMG/IMG_WEBPRIVADA/ si fuera necesario
          foto.alt = `Foto de ${usuarioActual.name} ${usuarioActual.lastname}`;
          console.log("Imagen cargada:", foto.src);
        }
      } else {
        console.warn("No se encontró el usuario con ID:", idUsuario);
      }
    })
    .catch(err => console.error("Error cargando JSON:", err));
});

//Para sincronizar el reloj

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

//Para DESPLEGABLE DE HORARIO DE PLANTILLA
function toggleHorario() {
  const contenido = document.getElementById('contenidoHorario');
  contenido.style.display = contenido.style.display === 'table-row-group' ? 'none' : 'table-row-group';
}

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



//Para hacer LOG OUT
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector(".log-out");
  const modal = document.getElementById("modal-logout");
  const confirmBtn = document.getElementById("confirm-logout");
  const cancelBtn = document.getElementById("cancel-logout");

  // Mostrar el modal al hacer clic en "Log Out"
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });

  // Confirmar cierre de sesión
  confirmBtn.addEventListener("click", () => {
    // Eliminar datos de sesión
    localStorage.removeItem("usuarioID");
    localStorage.removeItem("usuarioNombre");
    localStorage.removeItem("usuarioCargo");
    sessionStorage.clear();

    // Redirigir a la página inicial
    window.location.href = "CO_index.html"; // cambia si usas otra página
  });

  // Cancelar (cerrar modal)
  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar el modal si hacen clic fuera del cuadro
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// SINCRONIZAR NÓMINA SEGÚN USUARIO
document.addEventListener("DOMContentLoaded", () => {
  const idUsuario = localStorage.getItem("usuarioID");

  fetch("usuarios_convertidos.json")
    .then(res => res.json())
    .then(json => {
      const tabla = json.find(obj => obj.type === "table" && obj.name === "ueser_co");
      const usuarios = tabla?.data || [];

      const usuarioActual = usuarios.find(u => u.id_user === idUsuario);

      if (usuarioActual && usuarioActual.nomina) {
        const enlaceNomina = document.querySelector(".celda-nomina a");
        if (enlaceNomina) {
          enlaceNomina.href = `FILES/NOMINAS/${usuarioActual.nomina}`; // ajusta la ruta si tus PDFs están en otra carpeta
          console.log("Nómina enlazada:", enlaceNomina.href);
        }
      } else {
        console.warn("No se encontró el usuario o la nómina para ID:", idUsuario);
      }
    })
    .catch(err => console.error("Error cargando JSON de nómina:", err));
});

//PARA MARCAR HORA DE FICHAJE
document.addEventListener("DOMContentLoaded", () => {
  const fichaEl = document.getElementById("time");
  const usuarioID = localStorage.getItem("usuarioID");

  if (!usuarioID) {
    console.warn("No hay usuario activo para el fichaje.");
    return;
  }

  const claveFichaje = `tiempoInicioFichaje_${usuarioID}`;

  // Recuperar o establecer el tiempo de inicio del usuario
  let tiempoInicioStr = localStorage.getItem(claveFichaje);
  let tiempoInicio;
  if (tiempoInicioStr) {
    tiempoInicio = new Date(parseInt(tiempoInicioStr));
  } else {
    tiempoInicio = new Date();
    localStorage.setItem(claveFichaje, tiempoInicio.getTime());
  }

  // Marcar hora de entrada
  const horas = tiempoInicio.getHours().toString().padStart(2, '0');
  const minutos = tiempoInicio.getMinutes().toString().padStart(2, '0');
  const segundos = tiempoInicio.getSeconds().toString().padStart(2, '0');
  const horaFichaje = `${horas}:${minutos}:${segundos}`;

  if (fichaEl) {
    fichaEl.innerHTML = `Hora de entrada: ${horaFichaje}<br>Jornada laboral: 00:00:00`;
  }

  // Iniciar el minutero
  function actualizarMinutero() {
    const ahora = new Date();
    let diff = Math.floor((ahora - tiempoInicio) / 1000);

    const h = Math.floor(diff / 3600).toString().padStart(2, '0');
    diff %= 3600;
    const m = Math.floor(diff / 60).toString().padStart(2, '0');
    const s = (diff % 60).toString().padStart(2, '0');

    if (fichaEl) {
      fichaEl.innerHTML = `Hora de entrada: ${horaFichaje}<br><br>Jornada laboral: ${h}:${m}:${s}`;
    }

    setTimeout(actualizarMinutero, 1000);
  }

  actualizarMinutero();
});

