// ------------Sincronizar la altura de card-front y card-back-------------
window.addEventListener("load", () => {//fotos
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const front = card.querySelector(".card-front");
        const back = card.querySelector(".card-back");

        // Ajustar la altura de card-back según la altura de card-front
        const adjustHeight = () => {
            const frontHeight = front.offsetHeight;
            back.style.height = `${frontHeight}px`;
        };

        // Ajustar la altura al cargar y al redimensionar la ventana
        adjustHeight();
        window.addEventListener("resize", adjustHeight);
    });
});