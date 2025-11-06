document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.lesson-list li');
    const lessonContentSections = document.querySelectorAll('.lesson-content');


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

            hValue.textContent = `${h}°`;
            sValue.textContent = `${s}%`;
            lValue.textContent = `${l}%`;
            aValue.textContent = a.toFixed(2);

            demoBox.style.background = `hsla(${h}, ${s}%, ${l}%, ${a})`;

            codeElement.innerHTML = 
                `<code><span class="css-property">background</span>: <span class="css-function">hsla</span>(<span class="css-number">${h}</span>, <span class="css-number">${s}</span><span class="css-unit">%</span>, <span class="css-number">${l}</span><span class="css-unit">%</span>, <span class="css-number">${a.toFixed(2)}</span>);</code>`;

            valuesElement.textContent = `hsla(${h}, ${s}%, ${l}%, ${a.toFixed(2)})`;
        }

        [hSlider, sSlider, lSlider, aSlider].forEach(slider => {
            slider.addEventListener('input', updateHslaDemo);
        });

        updateHslaDemo();
    }

    // practica interactiva
    function initializePractice() {
        // Elementos del editor
        const rgbaEditor = document.getElementById('rgba-editor');
        const hslaEditor = document.getElementById('hsla-editor');
        const applyButton = document.getElementById('apply-button');
        const resetButton = document.getElementById('reset-button');
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        if (!rgbaEditor || !applyButton) return;

        // Contenido inicial para reset
        const initialRGBA = `/* Ejemplo RGBA - ¡Modifica estos valores! */
.background-box {
    background: rgba(255, 107, 107, 0.7);
    width: 200px;
    height: 150px;
    border-radius: 12px;
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.text-element {
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.shadow-box {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}`;

        const initialHSLA = `/* Ejemplo HSLA - ¡Modifica estos valores! */
.background-box {
    background: hsla(0, 100%, 70%, 0.7);
    width: 200px;
    height: 150px;
    border-radius: 12px;
    border: 2px solid hsla(0, 0%, 100%, 0.3);
}

.text-element {
    color: hsla(0, 0%, 100%, 0.9);
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.shadow-box {
    box-shadow: 0 8px 25px hsla(0, 0%, 0%, 0.2);
}`;

        // Funcionalidad de tabs
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remover activo de todos
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Activar tab actual
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Aplicar cambios
        applyButton.addEventListener('click', function() {
            const activeTab = document.querySelector('.tab-content.active');
            let cssCode = '';
            
            if (activeTab.id === 'rgba-practice') {
                cssCode = rgbaEditor.value;
            } else {
                cssCode = hslaEditor.value;
            }
            
            applyCSS(cssCode);
        });


        resetButton.addEventListener('click', function() {
            rgbaEditor.value = initialRGBA;
            hslaEditor.value = initialHSLA;
            applyCSS(initialRGBA);
        });


        function applyCSS(cssCode) {
            const oldStyle = document.getElementById('dynamic-style');
            if (oldStyle) {
                oldStyle.remove();
            }

            const style = document.createElement('style');
            style.id = 'dynamic-style';
            style.textContent = cssCode;
            document.head.appendChild(style);
        }

        applyCSS(initialRGBA);
    }

    // carga dinamica

    function loadLesson(lessonNum) {
        lessonContentSections.forEach(section => {
            section.style.display = 'none';
        });

        const activeLesson = document.getElementById(`lesson-content-${lessonNum}`);
        if (activeLesson) {
            activeLesson.style.display = 'block';

            setTimeout(() => {
                switch(lessonNum) {
                    case '2':
                        console.log('🚀 Inicializando lección 2...');
                        initializeRgbaDemo();
                        initializeHslaDemo();
                        break;
                    case '5':
                        console.log('🚀 Inicializando lección 5 (Práctica)...');
                        initializePractice();
                        break;
                }
            }, 100);
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', () => {

            menuItems.forEach(i => i.classList.remove('active'));

            item.classList.add('active');

            const num = item.dataset.lesson;
            loadLesson(num);
        });
    });

    loadLesson('1');
});