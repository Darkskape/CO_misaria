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

// --- Trámites ---
const tramites = [
    { nombre: "Denuncias por robo", url: "#" },
    { nombre: "Solicitud de pasaporte", url: "#" },
    { nombre: "Renovación del DNI", url: "#" },
    { nombre: "Antecedentes penales", url: "#" },
    { nombre: "Permiso de armas", url: "#" }
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

//--------------------BOTON DE SCROLL--------------------
// Mostrar el botón cuando el usuario haga scroll hacia abajo
window.onscroll = function () {
var boton = document.getElementById("boton-arriba");
if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
boton.style.display = "block"; // Muestra el botón
} else {
boton.style.display = "none"; // Oculta el botón cuando se está en la parte superior
}
};

// Función para volver al principio de la página
function volverArriba() {
window.scrollTo({
top: 0,
behavior: "smooth"
});
}

//----------------CARRUSEL-------------------
const carrusel = document.getElementById('carrusel');
let visibles = window.innerWidth < 900 ? 1 : 3; // Cambia el número de noticias visibles según el ancho de la pantalla
let posicion = visibles; // Ajusta la posición inicial
let anchoNoticia = 0;

function actualizarAncho() {
    visibles = window.innerWidth < 900 ? 1 : 3; // Actualiza el número de noticias visibles
    anchoNoticia = carrusel.querySelector('.noticia').offsetWidth;
    carrusel.style.transition = 'none';
    carrusel.style.transform = `translateX(-${posicion * anchoNoticia}px)`;
}

window.addEventListener('load', actualizarAncho);
window.addEventListener('resize', actualizarAncho);

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
        carrusel.style.transition = 'none';

        // Si estamos al final duplicado
        if (posicion >= 8) {
            posicion = visibles; // Vuelve a la posición real
            carrusel.style.transform = `translateX(-${posicion * anchoNoticia}px)`;
        }

        // Si estamos al principio duplicado
        if (posicion <= visibles - 1) {
            posicion = 7; // Vuelve a la posición real
            carrusel.style.transform = `translateX(-${posicion * anchoNoticia}px)`;
        }
    }, { once: true });
}