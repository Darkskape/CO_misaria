// BOTÓN SCROLL UP

// Mostrar el botón al hacer scroll hacia abajo
  window.addEventListener("scroll", function() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (window.scrollY > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  // Scroll suave hacia arriba
  document.getElementById("scrollToTopBtn").addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  

//SCRIPT PARA DESPLEGABLES REQUISITOS
  
function toggleContent(clickedElement) {
  const content = clickedElement.nextElementSibling;

  if (content.classList.contains('open')) {
    // Forzar su altura actual antes de animar a 0
    content.style.maxHeight = content.scrollHeight + 'px';
    content.offsetHeight; // Forzar reflow
    content.style.maxHeight = '0px';
    content.classList.remove('open');
  } else {
    content.classList.add('open');
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}

//-----MENÚ RESPONSIVE------//

 
    // --- Menú móvil (hamburguesa) ---
    function myFunction() {
        const menu = document.getElementById("myLinks");
        if (menu.style.display === "flex") {
            menu.style.display = "none";
        } else {
            menu.style.display = "flex";
        }
    }

    // --- Elementos DOM ---
    const abrirBuscador = document.getElementById("abrirBuscador");
    const cerrarBuscador = document.getElementById("cerrarBuscador");
    const buscadorMovil = document.getElementById("buscadorMovil");
    const input = document.getElementById('buscadorInput');
    const resultados = document.getElementById('resultados');

    const inputDesktop = document.getElementById('buscadorInputDesktop');
    const resultadosDesktop = document.getElementById('resultados-desktop');
    const resetDesktop = document.querySelector('.form .reset');

    // --- LISTADO EDITABLE (OPCIONES DEL BUSCADOR) ---
    const tramites = [
    { nombre: "Tasas de extranjería", url: "CO_index_tramites_tasasextranjería.html" },
    { nombre: "Certificado de residente", url: "CO_index_tramites_certificadoresidente.html" },
    { nombre: "Renovación del DNI", url: "CO_index_tramites.html#DNI-Y-PASAPORTE" },
    { nombre: "Tarjeta de estudiante", url: "CO_index_tramites_tarjetaestudiante.html" },
    { nombre: "Teléfono de emergencias", url: "CO_index_emergencias.html" },
    { nombre: "Adopta un K-9", url: "CO_index_tupolicia.html" },
    { nombre: "Origen", url: "CO_index_tupolicia_conocenos.html" },
    { nombre: "Competencias", url: "CO_index_tupolicia_conocenos.html" },
    { nombre: "Normativa", url: "CO_index_tupolicia_conocenos.html" },
    { nombre: "Estructura", url: "CO_index_tupolicia_conocenos.html" },
    { nombre: "Distintivos de cargos y divisas", url: "CO_index_tupolicia_conocenos.html" },
    { nombre: "Historia de la policia", url: "CO_index_tupolicia_historia.html" },
    { nombre: "Historia del uniforme", url: "CO_index_tupolicia_uniforme.html" },
    { nombre: "Himno", url: "CO_index_tupolicia_himno.html" },
    { nombre: "Web infantil", url: "CO_index_tupolicia_webinfantil.html" },
    { nombre: "Dibujos", url: "CO_index_tupolicia_webinfantil.html" },
    { nombre: "Juegos", url: "CO_index_tupolicia_webinfantil.html" },
    { nombre: "Acceso a oposiciones y convocatorias", url: "CO_index_tupolicia_acceso_oposiciones.html" },
    { nombre: "Noticias de acceso a oposiciones", url: "CO_index_tupolicia_acceso_oposiciones.html" },
    { nombre: " Procesos de selección a la Policia Nacional", url: "CO_index_tupolicia_acceso_oposiciones_policia.html" },
    { nombre: "Procesos selectivos seguridad privada", url: "CO_index_tupolicia_acceso_oposiciones_seguridad.html" },
    { nombre: "Procesos selectivos facultativos y técnicos", url: "CO_index_tupolicia_acceso_oposiciones_facultativos.html" },
    { nombre: "Personal no policial ", url: "CO_index_tupolicia_personal_no_policial.html" },
    { nombre: "Trámites de seguridad privada", url: "CO_index_tupolicia_jefes_y_directorres.html" },
    { nombre: "Denuncias", url: "CO_index_denuncias.html" },
    { nombre: "Mapa", url: "#CO_index_denuncias.html" },
    { nombre: "Denuncia", url: "CO_index_contacto_formulario.html" },
    { nombre: "Desaparecidos", url: "CO_index_denuncias_desaparecidos.html" },
    { nombre: "Buscados", url: "CO_index_denuncias_buscados.html" },
    { nombre: "Ciberseguridad", url: "CO_index_denuncias_ciberseguridad.html" },
];



    // --- Mostrar/ocultar buscador móvil al hacer clic en la lupa ---
    abrirBuscador.addEventListener("click", () => {
        if (buscadorMovil.style.display === "flex") {
            buscadorMovil.style.display = "none";
        } else {
            buscadorMovil.style.display = "flex";
        }
    });

    // --- Cerrar buscador móvil con botón (X) ---
    cerrarBuscador.addEventListener("click", () => {
        buscadorMovil.style.display = "none";
        resultados.innerHTML = '';
        input.value = '';
    });

    // --- Buscador funcional móvil ---
    input.addEventListener('input', () => {
        const texto = input.value.toLowerCase().trim();
        const filtrados = tramites.filter(t =>
            t.nombre.toLowerCase().includes(texto)
        );

        resultados.innerHTML = '';

        if (texto === '') return;

        if (filtrados.length === 0) {
            resultados.innerHTML = '<li class="not-found">No se encontraron resultados.</li>';
        } else {
            filtrados.forEach(t => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = t.nombre;
                a.href = t.url;
                li.appendChild(a);
                resultados.appendChild(li);
            });
        }
    });

    // --- Buscador funcional desktop ---
    inputDesktop.addEventListener('input', () => {
        const texto = inputDesktop.value.toLowerCase().trim();
        resultadosDesktop.innerHTML = '';

        if (texto === '') {
            resultadosDesktop.style.display = 'none';
            return;
        }

        const filtrados = tramites.filter(t =>
            t.nombre.toLowerCase().includes(texto)
        );

        if (filtrados.length === 0) {
            resultadosDesktop.innerHTML = '<li>No se encontraron resultados.</li>';
        } else {
            filtrados.forEach(t => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = t.nombre;
                a.href = t.url;
                li.appendChild(a);
                resultadosDesktop.appendChild(li);
            });
        }

        resultadosDesktop.style.display = 'block';
    });

    // --- Reset buscador desktop ---
    resetDesktop.addEventListener('click', () => {
        resultadosDesktop.innerHTML = '';
        resultadosDesktop.style.display = 'none';
        inputDesktop.value = '';
    });

    // --- Ocultar menús y buscadores al cambiar tamaño de pantalla ---
    window.addEventListener('resize', () => {
        const menu = document.getElementById("myLinks");
        if (window.innerWidth > 900 && menu.style.display === "flex") {
            menu.style.display = "none";
        }

        // Oculta buscadores y limpia resultados
        buscadorMovil.style.display = "none";
        resultados.innerHTML = '';
        input.value = '';

        resultadosDesktop.innerHTML = '';
        resultadosDesktop.style.display = 'none';
        inputDesktop.value = '';
    });

    // --- Al cargar la página ---
    document.addEventListener("DOMContentLoaded", () => {
        // Oculta buscador móvil
        buscadorMovil.style.display = "none";

        // Color rojo para enlaces visitados del footer
        const enlaces = document.querySelectorAll(".enlace");
        enlaces.forEach(enlace => {
            const href = enlace.getAttribute("href");
            if (sessionStorage.getItem(href)) {
                enlace.style.color = "red";
            }

            enlace.addEventListener("click", () => {
                sessionStorage.setItem(href, "visited");
                enlace.style.color = "red";
            });
        });
    });

