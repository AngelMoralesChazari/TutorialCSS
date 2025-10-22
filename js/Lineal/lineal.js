document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.lesson-list li');
    const mainLessonContainer = document.getElementById('main-lesson-container'); // 🔹 Nuevo ID

    // Contenido de cada sección del temario
    const secciones = {
        1: {
            titulo: '1️⃣ ¿Qué es un Gradiente Lineal?',
            teoria: `
                <p>
                    Un <strong>gradiente lineal</strong> es una <strong>transición progresiva</strong> entre dos o más colores a lo largo de una linea recta. 
                    Esto crea una transición suave lo cual resulta muy útil para diseñar fondos con un efecto visual de profundidad o tambien para destacar secciones con un toque moderno.
                </p>
                <p><b>Características Principales</b></p>
                <p><b>Sintaxis básica:</b></p>
                <pre><code>background: linear-gradient(to right, red, blue);</code></pre>
                <p>
                    En este ejemplo el color <span style="color:red;">rojo</span> comienza a la izquierda y se convierte gradualmente en 
                    <span style="color:skyblue;">azul</span> a la derecha.
                </p>
            `,
            ejemplo: `
                <div class="demo-box" style="background:linear-gradient(to right, red, blue);"></div>
            `
        },
        2: {
            titulo: '2️⃣ Direcciones y Ángulos',
            teoria: `
                <p>
                    Puedes controlar la dirección del gradiente mediante palabras clave o ángulos en grados.
                </p>
                <pre><code>background: linear-gradient(45deg, #38bdf8, #818cf8);</code></pre>
                <p>En este ejemplo, el gradiente corre en un ángulo de <b>45 grados</b>.</p>
            `,
            ejemplo: `
                <div class="demo-box" style="background:linear-gradient(45deg, #38bdf8, #818cf8);"></div>
            `
        },
        3: {
            titulo: '3️⃣ Múltiples Colores y Stops',
            teoria: `
                <p>
                    Puedes usar tres o más colores en un gradiente lineal, indicando qué parte ocupará cada uno.
                </p>
                <pre><code>background: linear-gradient(to right, #ff512f 0%, #ff9966 50%, #38bdf8 100%);</code></pre>
                <p>En este ejemplo se mezclan tonos cálidos y fríos en una transición suave.</p>
            `,
            ejemplo: `
                <div class="demo-box" style="background:linear-gradient(to right, #ff512f, #ff9966, #38bdf8);"></div>
            `
        },
        4: {
            titulo: '4️⃣ Uso Creativo',
            teoria: `
                <p>
                    Los gradientes lineales también pueden aplicarse con transparencia o para elementos como botones, bordes y texto.
                </p>
                <pre><code>background: linear-gradient(90deg, rgba(255,105,180,0.8), rgba(0,191,255,0.8));</code></pre>
                <p>En este ejemplo, los colores tienen transparencia (alfa) para lograr un efecto más suave.</p>
            `,
            ejemplo: `
                <div class="demo-box" style="background:linear-gradient(90deg, rgba(255,105,180,0.8), rgba(0,191,255,0.8));"></div>
            `
        }
    };

    // Función para cargar el contenido de la lección
    function loadLesson(lessonNum) {
        const lesson = secciones[lessonNum];
        if (lesson) {
            mainLessonContainer.innerHTML = `
                <section class="lesson-theory card">
                    <h2>${lesson.titulo}</h2>
                    ${lesson.teoria}
                </section>
                <section class="lesson-example card">
                    <h2>Ejemplo</h2> <!-- 🔹 Añadimos un título para el panel de ejemplo -->
                    ${lesson.ejemplo}
                </section>
            `;
        } else {
            mainLessonContainer.innerHTML = '<p>Contenido no disponible.</p>';
        }
    }

    // Manejo de clics en el temario
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const num = item.dataset.lesson;
            loadLesson(num);
        });
    });

    // Cargar primer tema por defecto loadLesson(1);
    
});