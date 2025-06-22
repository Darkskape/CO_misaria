
//----------------- BARRAS DESPLEGABLES---------------
const barras = document.querySelectorAll('.barra-desplegable, .barra-desplegable-subcontenido'); 

barras.forEach(barra=> {
    const cabecera = barra.querySelector('.cabecera, .subcabecera');
    const contenido = barra.querySelector('.contenido');
    const flecha = barra.querySelector('.flecha');

    cabecera.addEventListener('click', () => {
        barra.classList.toggle('abierto');

        if (barra.classList.contains('abierto')) {
            contenido.style.maxHeight = contenido.scrollHeight + "px";
            flecha.style.transform = "rotate(90deg)";
        } else {
            contenido.style.maxHeight = null;
            flecha.style.transform = "rotate(0deg)";
        }
    });
        });
