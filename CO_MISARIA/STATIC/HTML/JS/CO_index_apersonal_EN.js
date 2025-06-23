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
document.addEventListener("DOMContentLoaded", function() {
    console.log("JS cargado correctamente");
    iniciarRelojYCuentaAtras();
});

function iniciarRelojYCuentaAtras() {
    actualizarReloj();
    actualizarCuentaAtras();

    // Reloj: actualiza cada segundo
    setInterval(actualizarReloj, 1000);

    // Cuenta atrás: actualiza cada minuto (o pon 1000 si quieres más frecuencia)
    setInterval(actualizarCuentaAtras, 60000);
}

function actualizarReloj() {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    const reloj = document.getElementById('reloj');
    if (reloj) {
        reloj.innerText = `${horas}:${minutos}:${segundos}`;
    }
}

function actualizarCuentaAtras() {
    const hoy = new Date();

    const fechas = {
        restantea: new Date('2025-07-01T00:00:00'),
        restanteb: new Date('2025-07-10T00:00:00'),
        restantec: new Date('2025-07-20T00:00:00')
    };

    Object.entries(fechas).forEach(([id, fecha]) => {
        const el = document.getElementById(id);
        if (!el) return;

        const diffMs = fecha - hoy;
        if (diffMs <= 0) {
            el.innerText = `El CARNET DE ${id === "restantea" ? "ARMAS" : id === "restanteb" ? "COCHE" : "MOTO"} ha expirado.`;
            return;
        }

        const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffMeses = Math.floor(diffDias / 30);
        const diffAnios = Math.floor(diffDias / 365);
        const restanteMeses = diffMeses % 12;
        const restanteDias = diffDias % 30;

        el.innerText = `Quedan ${restanteDias} días, ${restanteMeses} meses y ${diffAnios} años para renovar el CARNET DE ${id === "restantea" ? "ARMAS" : id === "restanteb" ? "COCHE" : "MOTO"}.`;
    });
}


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
        const enlacesNominas = document.querySelectorAll(".celda-nomina a");

        enlacesNominas.forEach(enlace => {
          enlace.href = `FILES/NOMINAS/${usuarioActual.nomina}`;
        });

        console.log(`Nómina asignada a todos los enlaces: FILES/NOMINAS/${usuarioActual.nomina}`);
      } else {
        console.warn("No se encontró el usuario o la nómina para ID:", idUsuario);
      }
    })
    .catch(err => console.error("Error cargando JSON de nómina:", err));
});

//PARA SINCRONIZAR LICENCIA SEGÚN USUARIO
document.addEventListener("DOMContentLoaded", () => {
  const idUsuario = localStorage.getItem("usuarioID");

  fetch("usuarios_convertidos.json")
    .then(res => res.json())
    .then(json => {
      const tabla = json.find(obj => obj.type === "table" && obj.name === "ueser_co");
      const usuarios = tabla?.data || [];

      const usuarioActual = usuarios.find(u => u.id_user === idUsuario);

      if (usuarioActual && usuarioActual.licencia) {
        const imgLicencia = document.querySelector(".mostrar-licen img");
        imgLicencia.src = `FILES/LICENCIAS/${usuarioActual.licencia}`;
        imgLicencia.alt = `Licencia de ${usuarioActual.name} ${usuarioActual.lastname}`;

        console.log(`Licencia mostrada: FILES/LICENCIAS/${usuarioActual.licencia}`);
      } else {
        console.warn("No se encontró el usuario o la licencia para ID:", idUsuario);
      }
    })
    .catch(err => console.error("Error cargando JSON de licencias:", err));
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

//EQUIPAMIENTO

//ARMAS
document.addEventListener("DOMContentLoaded", () => {
    const idUsuario = localStorage.getItem("usuarioID"); // ID del usuario logueado

    fetch("armas.json") // Cambia por el nombre real de tu archivo JSON
        .then(res => res.json())
        .then(data => {
            const arma = data.find(a => a["id.user"] === idUsuario);

            if (arma) {
                // Encuentra el <ul> y actualiza los <li>
                const box = document.querySelector(".box2 ul");
                if (box) {
                    box.innerHTML = `
                        <li><strong>ID:</strong> ${arma["id.arma"]}</li>
                        <li><strong>TIPO DE ARMA:</strong> ${arma["tipo.arma"]}</li>
                        <li><strong>TIPO DE MUNICIÓN:</strong> ${arma["tipo.municionprimaria"]}${arma["tipo.municionsegundaria"] ? " / " + arma["tipo.municionsegundaria"] : ""}</li>
                        <li><strong>FECHA DE ÚLTIMO MANTENIMIENTO:</strong> ${arma["fecha.ultimomantenimiento"]}</li>
                    `;
                }
            } else {
                console.warn("No se encontró arma para el usuario ID:", idUsuario);
                const box = document.querySelector(".box2 ul");
                if (box) {
                    box.innerHTML = `<li>No se encontró arma asignada.</li>`;
                }
            }
        })
        .catch(err => {
            console.error("Error al cargar armas.json:", err);
        });
});

//CABALLOS
document.addEventListener("DOMContentLoaded", () => {
    // Obtener el ID del usuario desde localStorage (o donde lo tengas guardado)
    const idUsuario = localStorage.getItem("usuarioID");

    // Cargar el JSON de caballos
    fetch("caballos.json") // Cambia la ruta si el archivo está en otro sitio
        .then(res => res.json())
        .then(json => {
            // Encontrar la tabla caballos_co
            const tabla = json.find(obj => obj.type === "table" && obj.name === "caballos");
            const caballos = tabla?.data || [];

            // Buscar el caballo de este usuario
            const miCaballo = caballos.find(c => c.id_user === idUsuario);

            if (miCaballo) {
                // Llenar el contenido de la lista
                const ul = document.querySelector(".box-caballo ul");
                ul.innerHTML = `
                    <li>ID: ${miCaballo.id_caballo}</li>
                    <li>NOMBRE: ${miCaballo.nombre}</li>
                    <li>EDAD: ${miCaballo.edad}</li>
                    <li>INGRESO: ${miCaballo.ingreso}</li>
                    <li>JUBILACIÓN: ${miCaballo.jubilacion ?? "N/A"}</li>
                    <li>RAZA: ${miCaballo.raza}</li>
                    <li>PESO: ${miCaballo.peso} kg</li>
                    <li>AÑOS ACTIVO: ${miCaballo.años}</li>
                `;
            } else {
                console.warn("No se encontró caballo asignado al usuario:", idUsuario);
                const ul = document.querySelector(".box-caballo ul");
                ul.innerHTML = `<li>No hay caballo asignado a este usuario.</li>`;
            }
        })
        .catch(err => console.error("Error cargando JSON de caballos:", err));
});

//COCHES Y MOTOS

document.addEventListener("DOMContentLoaded", () => {
    const idUsuario = localStorage.getItem("usuarioID");

    fetch("transportes.json")
        .then(res => res.json())
        .then(json => {
            const tabla = json.find(obj => obj.type === "table" && obj.name === "transportes");
            if (!tabla) {
                console.error("No se encontró la tabla 'transportes'.");
                return;
            }

            const vehiculos = tabla.data || [];

            // Buscamos primero coche, si no hay, moto
            let vehiculo = vehiculos.find(v => v.id_user === idUsuario && v.tipo_transporte === "Coche");
            if (!vehiculo) {
                vehiculo = vehiculos.find(v => v.id_user === idUsuario && v.tipo_transporte === "Moto");
            }

            const box = document.querySelector('.box ul').querySelectorAll('li');

            if (vehiculo) {
                box[0].innerHTML = `TIPO: ${vehiculo.tipo_transporte}`;
                box[1].innerHTML = `ID: ${vehiculo.id_vehiculo}`;
                box[2].innerHTML = `MATRÍCULA: ${vehiculo.matricula}`;
                box[3].innerHTML = `MODELO: ${vehiculo.modelo}`;
                box[4].innerHTML = `MARCA: ${vehiculo.marca}`;
                box[5].innerHTML = `AÑO: ${vehiculo.anio}`;
                box[6].innerHTML = `ESTADO: ${vehiculo.estado}`;
                box[7].innerHTML = `OBSERVACIONES: ${vehiculo.observaciones || 'Ninguna'}`;
            } else {
                // Si no hay ningún vehículo asignado
                box[0].innerHTML = `TIPO: No asignado`;
                box[1].innerHTML = `ID: No asignado`;
                box[2].innerHTML = `MATRÍCULA: No asignado`;
                box[3].innerHTML = `MODELO: No asignado`;
                box[4].innerHTML = `MARCA: No asignado`;
                box[5].innerHTML = `AÑO: No asignado`;
                box[6].innerHTML = `ESTADO: No asignado`;
                box[7].innerHTML = `OBSERVACIONES: No asignado`;
            }
        })
        .catch(err => console.error("Error al cargar transportes.json:", err));
});

//contadores
   document.addEventListener("DOMContentLoaded", function () {
      iniciarCuentaAtras("2027-06-01", "licencia-armas", "LICENCIA DE ARMAS");
      iniciarCuentaAtras("2026-04-15", "licencia-coche", "LICENCIA DE COCHE");
      iniciarCuentaAtras("2025-12-20", "licencia-moto", "LICENCIA DE MOTO");
    });

    function iniciarCuentaAtras(fechaObjetivo, idContenedor, tipoLicencia) {
      const contenedor = document.getElementById(idContenedor);
      const fin = new Date(fechaObjetivo);

      // Llamada inicial
      actualizar();

      // Refrescar cada día
      const intervalo = setInterval(actualizar, 1000 * 60 * 60 * 24);

      function actualizar() {
        const ahora = new Date();

        if (ahora >= fin) {
          clearInterval(intervalo);
          contenedor.innerHTML = `¡La ${tipoLicencia} ya ha vencido!`;
          return;
        }

        let anios = fin.getFullYear() - ahora.getFullYear();
        let meses = fin.getMonth() - ahora.getMonth();
        let dias = fin.getDate() - ahora.getDate();

        if (dias < 0) {
          meses--;
          const ultimoMes = new Date(fin.getFullYear(), fin.getMonth(), 0);
          dias += ultimoMes.getDate();
        }

        if (meses < 0) {
          anios--;
          meses += 12;
        }

        contenedor.innerHTML = 
          `Quedan ${anios} año(s), ${meses} mes(es) y ${dias} día(s) para renovar tu ${tipoLicencia}.`;
      }
    }