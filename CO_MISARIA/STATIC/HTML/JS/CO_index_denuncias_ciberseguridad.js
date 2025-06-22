

//------FUNCIÓN PARA FAQ-QUIESTION-------
function toggleFaq(button) {
    const answer = button.nextElementSibling;
    if (answer.style.display === "block") {
        answer.style.display = "none";
    } else {
        answer.style.display = "block";
    }
}

//------FUNCIÓN PARA AJUSTAR LA ALTURA DE CARDS-------
function igualarAlturaPorFila() {
    const grid = document.querySelector('.main-grid');
    const cards = Array.from(grid.querySelectorAll('.card'));

    // Reset heights
    cards.forEach(card => {
        card.style.height = 'auto';
        card.querySelector('.card-inner').style.height = 'auto';
        card.querySelector('.card-front').style.height = 'auto';
        card.querySelector('.card-back').style.height = 'auto';
    });

    const columns = 2; // Ajusta si cambias el número de columnas
    for (let i = 0; i < cards.length; i += columns) {
        const row = cards.slice(i, i + columns);
        let maxHeight = 0;

        row.forEach(card => {
            const back = card.querySelector('.card-back');
            const height = back.scrollHeight;
            maxHeight = Math.max(maxHeight, height);
        });

        row.forEach(card => {
            card.style.height = `${maxHeight}px`;
            card.querySelector('.card-inner').style.height = `${maxHeight}px`;
            card.querySelector('.card-front').style.height = `${maxHeight}px`;
            card.querySelector('.card-back').style.height = `${maxHeight}px`;
        });
    }
}

// Espera a que todo se cargue bien, incluidas imágenes
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(igualarAlturaPorFila, 100); // pequeña pausa para que se rendericen imágenes
});

window.addEventListener('resize', igualarAlturaPorFila);
