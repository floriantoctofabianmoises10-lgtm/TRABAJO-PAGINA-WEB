// EVENTO PRINCIPAL: DOMContentLoaded
// Se asegura de que el navegador lea todo el archivo HTML antes de intentar ejecutar el JavaScript.
// Si no ponemos esto, el JS intentaría buscar los botones antes de que existan y daría error.
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CAPTURA DE ELEMENTOS DEL HTML
    // Buscamos todas las etiquetas <a> que tengan la clase '.filter-link' (Las pestañas: Entradas, Postres...)
    // querySelectorAll nos devuelve una lista o "NodeList" con todos ellos.
    const links = document.querySelectorAll('.filter-link');
    
    // Buscamos todos los contenedores que tienen la clase '.menu-category' (Las secciones que agrupan los platos).
    const categories = document.querySelectorAll('.menu-category');

    // 2. ASIGNACIÓN DE EVENTOS
    // Recorremos la lista de enlaces uno por uno usando forEach. 'link' es el enlace actual del ciclo.
    links.forEach(link => {
        
        // A cada enlace le decimos: "Presta atención a cuando te hagan 'click'"
        link.addEventListener('click', (e) => {
            
            // PREVENIR COMPORTAMIENTO POR DEFECTO
            // Normalmente, un enlace con href="#entradas" hace que la pantalla salte bruscamente.
            // e.preventDefault() cancela ese salto. Nosotros controlaremos qué pasa a continuación.
            e.preventDefault();

            // 3. CAMBIO VISUAL DE LA PESTAÑA ACTIVA
            // Recorremos nuevamente todos los enlaces y les quitamos la clase 'active-category'
            // Esto "apaga" visualmente cualquier pestaña que estuviera encendida antes.
            links.forEach(l => l.classList.remove('active-category'));
            
            // "Encendemos" únicamente el enlace al que el usuario le acaba de dar clic
            // añadiéndole la clase que tiene los estilos de subrayado y color Oro Champagne.
            link.classList.add('active-category');

            // 4. IDENTIFICAR QUÉ CATEGORÍA MOSTRAR
            // getAttribute('href') nos devuelve el texto del enlace (ej: "#postres").
            // .substring(1) recorta el texto a partir de la posición 1, eliminando el "#",
            // por lo que targetId se convierte simplemente en "postres".
            const targetId = link.getAttribute('href').substring(1);
            
            // 5. LÓGICA DE MOSTRAR Y OCULTAR CONTENIDO
            // Recorremos todos los contenedores de platos (Entradas, Platos de fondo, etc.)
            categories.forEach(cat => {
                // Comparamos el ID del contenedor (cat.id) con la palabra que obtuvimos (targetId)
                if (cat.id === targetId) {
                    // Si coinciden (ej. "postres" === "postres"), le quitamos la clase "hidden" de CSS
                    // Esto hace que el navegador dibuje esa sección en pantalla.
                    cat.classList.remove('hidden');
                } else {
                    // Si no coinciden, le añadimos la clase "hidden" (que en el CSS tiene "display: none;")
                    // Esto hace que la sección desaparezca completamente.
                    cat.classList.add('hidden');
                }
            });

            // 6. SCROLL SUAVE (Mejora de UX)
            // Calculamos la altura de la cabecera (.hero) para saber a qué altura de la página debe 
            // desplazarse la pantalla para que el usuario vea los productos inmediatamente.
            const heroHeight = document.querySelector('.hero').offsetHeight;
            
            // Ejecutamos el scroll con comportamiento 'smooth' (suave en lugar de un salto instantáneo).
            window.scrollTo({
                top: heroHeight, 
                behavior: 'smooth'
            });
        });
    });
});