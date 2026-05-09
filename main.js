document.addEventListener('DOMContentLoaded', () => {
    // NAVEGACIÓN ENTRE CATEGORÍAS
    const links = document.querySelectorAll('.category-list a');
    const categories = document.querySelectorAll('.menu-category');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            links.forEach(l => l.classList.remove('active-category'));
            link.classList.add('active-category');

            const targetId = link.getAttribute('href').substring(1);

            categories.forEach(cat => {
                if (cat.id === targetId) {
                    cat.style.display = ''; // Vacío para que use el flex del CSS
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });

    // LÓGICA DEL LIGHTBOX / MODAL
    const triggers = document.querySelectorAll('.product-trigger');
    const modal = document.getElementById('editorial-modal');
    const closeBtn = document.querySelector('.modal-close-btn');

    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();

            // Intentamos buscar la tarjeta base
            const card = trigger.closest('.ref-card') || trigger.closest('.cava-hero-card') || trigger.closest('.product-trigger');

            if (card) {
                // Extracción de datos con los nuevos selectores
                const imgEl = card.querySelector('img') || trigger.querySelector('img') || card.parentElement.querySelector('img');
                const imgSrc = imgEl ? imgEl.src : '';

                const titleEl = card.querySelector('.ref-card-title');
                const title = titleEl ? titleEl.textContent : '';

                const priceEl = card.querySelector('.ref-card-price');
                const price = priceEl ? priceEl.textContent : '';

                const desc =card.dataset.descriptionLong || '';

                modalImg.src = imgSrc;
                // Si la imagen tenía filtro BW, en el modal lo quitamos
                modalImg.style.filter = 'none';
                modalTitle.textContent = title;
                modalPrice.textContent = price;
                modalDesc.textContent = desc;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ==========================================================================
    // NUEVO: LÓGICA DEL SLIDER DE PORTADA
    // Controla el cambio automático de las 4 imágenes requeridas.
    // ==========================================================================
    const sliderItems = document.querySelectorAll('.slider-item');
    let currentSlide = 0; // Inicia en la primera imagen (índice 0)

    // Función que cambia a la siguiente imagen
    const nextSlide = () => {
        // 1. Quitar la clase 'active' de la imagen actual (la oculta con CSS fade)
        sliderItems[currentSlide].classList.remove('active');

        // 2. Calcular cuál es la siguiente imagen (vuelve al inicio si llega al final)
        currentSlide = (currentSlide + 1) % sliderItems.length;

        // 3. Poner la clase 'active' a la nueva imagen (la muestra con CSS fade)
        sliderItems[currentSlide].classList.add('active');
    };

    // Ejecutar la función nextSlide cada 4000 milisegundos (4 segundos)
    setInterval(nextSlide, 4000);

});