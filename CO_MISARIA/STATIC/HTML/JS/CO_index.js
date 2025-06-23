// CARRUSEL ACTUALIDAD

const carrusel = document.getElementById('carrusel');
let visibles = window.innerWidth < 900 ? 1 : 3;
let posicion = visibles;
let anchoNoticia = 0;
let totalItems = carrusel.children.length;

function actualizarAncho() {
    visibles = window.innerWidth < 900 ? 1 : 3;
    anchoNoticia = carrusel.querySelector('.noticia').offsetWidth;
    carrusel.style.transition = 'none';
    carrusel.style.transform = `translateX(-${posicion * anchoNoticia}px)`;
}

function moverDerecha() {
    posicion++;
    mover();
}

function moverIzquierda() {
    posicion--;
    mover();
}

function mover() {
    carrusel.style.transition = 'transform 0.5s ease';
    carrusel.style.transform = `translateX(-${posicion * anchoNoticia}px)`;

    carrusel.addEventListener('transitionend', () => {
        // IR AL PRINCIPIO REAL
        if (posicion >= totalItems - visibles) {
            posicion = visibles;
            sinTransicion(() => {
                carrusel.style.transform = `translateX(-${posicion * anchoNoticia}px)`;
            });
        }

        // IR AL FINAL REAL
        if (posicion < visibles) {
            posicion = totalItems - (2 * visibles);
            sinTransicion(() => {
                carrusel.style.transform = `translateX(-${posicion * anchoNoticia}px)`;
            });
        }
    }, { once: true });
}

function sinTransicion(callback) {
    // Elimina transición y aplica el cambio tras un doble frame
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            carrusel.style.transition = 'none';
            callback();
        });
    });
}

window.addEventListener('load', actualizarAncho);
window.addEventListener('resize', actualizarAncho);

const gap = 10; // coincide con el CSS

function actualizarAncho() {
  visibles = window.innerWidth < 900 ? 1 : 3;
  const noticia = carrusel.querySelector('.noticia');
  const noticiaWidth = noticia.offsetWidth;
  anchoNoticia = noticiaWidth + gap;
  posicion = visibles;
  carrusel.style.transition = 'none';
  carrusel.style.transform = `translateX(-${posicion * anchoNoticia}px)`;
}

//-----MENÚ RESPONSIVE------//

    // --- Menú móvil (hamburguesa)
    function myFunction() {
        const menu = document.getElementById("myLinks");
        if (menu.style.display === "flex") {
            menu.style.display = "none";
        } else {
            menu.style.display = "flex";
        }
    }

    // --- BUSCADOR INPUT (MÓVIL) ---
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
            resultados.innerHTML = '<li>No se encontraron resultados.</li>';
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

    //--- NAVEGACIÓN PARA ESCRITORIO ---
    
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
