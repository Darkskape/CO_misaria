//----------------CARRUSEL-------------------

const track = document.querySelector(".carousel-track");
const container = document.querySelector(".carousel-container");
const arrows = document.querySelectorAll(".carousel-arrow");

let items = Array.from(track.children);
let index = 0;
let visibleCount = getVisibleCount();
let autoScroll;
let paused = false;
let pauseTimeout;

// 👇 Duplica los primeros y últimos visibles
function cloneItems() {
    const startClones = items.slice(0, visibleCount).map(el => el.cloneNode(true));
    const endClones = items.slice(-visibleCount).map(el => el.cloneNode(true));

    startClones.forEach(clone => track.appendChild(clone));
    endClones.forEach(clone => track.insertBefore(clone, track.firstChild));

    items = Array.from(track.children);
    index = visibleCount; // Inicia en el primer ítem real
    updateCarousel(false); // Sin animación
}

function getVisibleCount() {
    const width = window.innerWidth;
    if (width < 481) return 1;
    if (width < 769) return 2;
    return 3;
}

function updateCarousel(animate = true) {
    const itemWidth = items[0].offsetWidth + 16; // gap incluido
    if (!animate) track.style.transition = "none";
    else track.style.transition = "transform 0.6s ease-in-out";

    const offset = index * itemWidth;
    track.style.transform = `translateX(-${offset}px)`;
}

function next() {
    visibleCount = getVisibleCount();
    index++;
    updateCarousel();

    // Si llegamos al último clon de la derecha
    if (index === items.length - visibleCount) {
        setTimeout(() => {
            track.style.transition = "none";
            index = visibleCount;
            updateCarousel(false);
        }, 600);
    }
}

function prev() {
    visibleCount = getVisibleCount();
    index--;
    updateCarousel();

    // Si llegamos al primer clon a la izquierda
    if (index === 0) {
        setTimeout(() => {
            track.style.transition = "none";
            index = items.length - 2 * visibleCount;
            updateCarousel(false);
        }, 600);
    }
}

function pauseAutoScroll() {
    clearInterval(autoScroll);
    clearTimeout(pauseTimeout);
    paused = true;
    pauseTimeout = setTimeout(() => {
        paused = false;
        startAutoScroll();
    }, 30000);
}

function startAutoScroll() {
    autoScroll = setInterval(() => {
        if (!paused) next();
    }, 4000);
}

arrows[0].addEventListener("click", () => {
    prev();
    pauseAutoScroll();
});

arrows[1].addEventListener("click", () => {
    next();
    pauseAutoScroll();
});

const originalHTML = track.innerHTML;

window.addEventListener("resize", () => {
    clearTimeout(pauseTimeout);
    clearInterval(autoScroll);

    track.innerHTML = originalHTML;

    items = Array.from(track.children);
    visibleCount = getVisibleCount();
    cloneItems();
    startAutoScroll();
});


window.onload = () => {
    visibleCount = getVisibleCount();
    cloneItems();
    startAutoScroll();
};

//--------FUNCIÓN DE CARRUSEL MARCAS-------
function iniciarCarrusel() {
    const track = document.getElementById("carouselTrack2");

    // Duplica las imágenes para efecto continuo
    const images = [...track.children];
    images.forEach((img) => {
        const clone = img.cloneNode(true);
        track.appendChild(clone);
    });

    // Esperar a que todas las imágenes carguen antes de medir
    const allImages = track.querySelectorAll("img");
    let loaded = 0;
    allImages.forEach((img) => {
        if (img.complete) {
            loaded++;
        } else {
            img.onload = () => {
                loaded++;
                if (loaded === allImages.length) {
                    animarCarrusel();
                }
            };
        }
    });

    if (loaded === allImages.length) {
        animarCarrusel();
    }

    function animarCarrusel() {
        const trackWidth = track.scrollWidth / 2; // Solo la mitad (original)
        const speed = 100; // pixels per second (ajusta la velocidad aquí)
        const duration = trackWidth / speed;

        track.style.setProperty("animation-duration", `${duration}s`);
    }
}

window.addEventListener("load", iniciarCarrusel);
window.addEventListener("resize", iniciarCarrusel); // Recalcula si cambia el tamaño
