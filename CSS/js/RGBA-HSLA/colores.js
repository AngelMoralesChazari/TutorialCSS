// rgba-hsla.js - Funcionalidad para colores con transparencia
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.lesson-list li');
    const lessonContentSections = document.querySelectorAll('.lesson-content');

    // =======================================================
    // FUNCIONALIDAD PARA DEMOS INTERACTIVOS
    // =======================================================

    function initializeRgbaDemo() {
        const rSlider = document.getElementById('rgba-r');
        const gSlider = document.getElementById('rgba-g');
        const bSlider = document.getElementById('rgba-b');
        const aSlider = document.getElementById('rgba-a');
        
        const rValue = document.getElementById('rgba-r-value');
        const gValue = document.getElementById('rgba-g-value');
        const bValue = document.getElementById('rgba-b-value');
        const aValue = document.getElementById('rgba-a-value');
        
        const demoBox = document.getElementById('rgba-demo-box');
        const codeElement = document.getElementById('rgba-code');
        const valuesElement = document.getElementById('rgba-values');

        if (!rSlider || !demoBox) return;

        function updateRgbaDemo() {
            const r = parseInt(rSlider.value);
            const g = parseInt(gSlider.value);
            const b = parseInt(bSlider.value);
            const a = parseInt(aSlider.value) / 100;

            // Actualizar valores mostrados
            rValue.textContent = r;
            gValue.textContent = g;
            bValue.textContent = b;
            aValue.textContent = a.toFixed(2);

            // Actualizar demo visual
            demoBox.style.background = `rgba(${r}, ${g}, ${b}, ${a})`;

            // Actualizar código
            codeElement.innerHTML = 
                `<code><span class="css-property">background</span>: <span class="css-function">rgba</span>(<span class="css-number">${r}</span>, <span class="css-number">${g}</span>, <span class="css-number">${b}</span>, <span class="css-number">${a.toFixed(2)}</span>);</code>`;

            // Actualizar valores de texto
            valuesElement.textContent = `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
        }

        // Configurar event listeners
        [rSlider, gSlider, bSlider, aSlider].forEach(slider => {
            slider.addEventListener('input', updateRgbaDemo);
        });

        // Inicializar
        updateRgbaDemo();
    }

    function initializeHslaDemo() {
        const hSlider = document.getElementById('hsla-h');
        const sSlider = document.getElementById('hsla-s');
        const lSlider = document.getElementById('hsla-l');
        const aSlider = document.getElementById('hsla-a');
        
        const hValue = document.getElementById('hsla-h-value');
        const sValue = document.getElementById('hsla-s-value');
        const lValue = document.getElementById('hsla-l-value');
        const aValue = document.getElementById('hsla-a-value');
        
        const demoBox = document.getElementById('hsla-demo-box');
        const codeElement = document.getElementById('hsla-code');
        const valuesElement = document.getElementById('hsla-values');

        if (!hSlider || !demoBox) return;

        function updateHslaDemo() {
            const h = parseInt(hSlider.value);
            const s = parseInt(sSlider.value);
            const l = parseInt(lSlider.value);
            const a = parseInt(aSlider.value) / 100;

            // Actualizar valores mostrados
            hValue.textContent = `${h}°`;
            sValue.textContent = `${s}%`;
            lValue.textContent = `${l}%`;
            aValue.textContent = a.toFixed(2);

            // Actualizar demo visual
            demoBox.style.background = `hsla(${h}, ${s}%, ${l}%, ${a})`;

            // Actualizar código
            codeElement.innerHTML = 
                `<code><span class="css-property">background</span>: <span class="css-function">hsla</span>(<span class="css-number">${h}</span>, <span class="css-number">${s}</span><span class="css-unit">%</span>, <span class="css-number">${l}</span><span class="css-unit">%</span>, <span class="css-number">${a.toFixed(2)}</span>);</code>`;

            // Actualizar valores de texto
            valuesElement.textContent = `hsla(${h}, ${s}%, ${l}%, ${a.toFixed(2)})`;
        }

        // Configurar event listeners
        [hSlider, sSlider, lSlider, aSlider].forEach(slider => {
            slider.addEventListener('input', updateHslaDemo);
        });

        // Inicializar
        updateHslaDemo();
    }

    // =======================================================
    // LÓGICA DE CARGA DINÁMICA DE LECCIONES
    // =======================================================

    function loadLesson(lessonNum) {
        console.log(`📖 Cargando lección ${lessonNum}`);

        // 1. Oculta TODAS las secciones de contenido
        lessonContentSections.forEach(section => {
            section.style.display = 'none';
        });

        // 2. Muestra SOLAMENTE la sección activa
        const activeLesson = document.getElementById(`lesson-content-${lessonNum}`);
        if (activeLesson) {
            activeLesson.style.display = 'block';

            // 3. Inicializa la interactividad de la lección cargada
            setTimeout(() => {
                if (lessonNum === '2') {
                    console.log('🚀 Inicializando lección 2...');
                    initializeRgbaDemo();
                    initializeHslaDemo();
                }
                // Aquí puedes agregar inicializaciones para otras lecciones
            }, 100);
        }
    }

    // Manejo de clics en el temario
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remueve la clase 'active' del menú anterior
            menuItems.forEach(i => i.classList.remove('active'));

            // Añade 'active' al elemento clickeado
            item.classList.add('active');

            // Obtiene el número de lección y la carga
            const num = item.dataset.lesson;
            loadLesson(num);
        });
    });

    // Cargar la primera lección por defecto al iniciar
    loadLesson('1');
});