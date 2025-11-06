// radial.js - Funcionalidad completa para gradientes radiales
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.lesson-list li');
    const lessonContentSections = document.querySelectorAll('.lesson-content');

    // Variable global para el intervalo de rotación
    let rotationInterval = null;
    let currentRotationDemo = null;
    let isRunning = false;

    // demo de formas radiales 
    function initializeShapesDemo() {
        const demoBox = document.getElementById('shapes-demo-box');
        const shapeDisplay = document.getElementById('current-shape');
        const shapeButtons = document.querySelectorAll('#lesson-content-2 .btn-shape');
        const shapeCode = document.getElementById('shape-code');

        if (!demoBox || !shapeButtons.length) return;

        shapeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const shape = this.dataset.shape;

                shapeButtons.forEach(btn => btn.classList.remove('active'));

                this.classList.add('active');

                demoBox.style.background = `radial-gradient(${shape}, #4ecdc4, #764ba2)`;
                if (shapeDisplay) shapeDisplay.textContent = shape;
                if (shapeCode) shapeCode.textContent = shape;
            });
        });
    }

    // demo de posicionamiento radial
    function initializePositionDemo() {
        console.log('🔧 Inicializando demo de posicionamiento radial...');

        // Limpiar intervalo anterior
        if (rotationInterval) {
            clearInterval(rotationInterval);
            rotationInterval = null;
        }

        // Elementos básicos
        const positionBox = document.getElementById('position-demo-box');
        const startBtn = document.getElementById('start-position-btn');
        const stopBtn = document.getElementById('stop-position-btn');
        const resetBtn = document.getElementById('reset-position-btn');
        const currentPositionDisplay = document.getElementById('current-position');

        // Elementos de control
        const speedRange = document.getElementById('speed-range');
        const speedValue = document.getElementById('speed-value');
        const colorPicker1 = document.getElementById('color-picker-1');
        const colorPicker2 = document.getElementById('color-picker-2');
        const colorValue1 = document.getElementById('color-value-1');
        const colorValue2 = document.getElementById('color-value-2');
        const animationStatus = document.getElementById('animation-status');

        // Elementos del código en el panel
        const codePosition = document.getElementById('code-position');
        const codeGradientPosition = document.getElementById('code-gradient-position');
        const codeColor1 = document.getElementById('code-color-1');
        const codeColor2 = document.getElementById('code-color-2');
        const codeInterval = document.getElementById('code-interval');

        // Verificar que los elementos existan
        if (!positionBox || !startBtn || !stopBtn) {
            console.error('❌ Elementos esenciales no encontrados');
            return;
        }


        // Variables de estado para posición radial
        let posX = 50;
        let posY = 50;
        let speed = speedRange ? parseInt(speedRange.value) : 50;
        let color1 = '#93C5FD';
        let color2 = '#38BDF8';
        isRunning = false;

        // Actualizar todo el display
        function updateAllDisplays() {
            console.log('🔄 Actualizando displays - Posición:', posX, posY, 'Colores:', color1, color2);

            // gradiente visual
            positionBox.style.background = `radial-gradient(circle at ${posX}% ${posY}%, ${color1}, ${color2})`;

            // indicadores de posición
            if (currentPositionDisplay) currentPositionDisplay.textContent = `${posX}% ${posY}%`;
            const positionIndicator = positionBox.querySelector('.position-indicator');
            if (positionIndicator) positionIndicator.textContent = `${posX}%, ${posY}%`;

            // codigo del panel
            if (codePosition) codePosition.textContent = `${posX}% ${posY}%`;
            if (codeGradientPosition) codeGradientPosition.textContent = `${posX}% ${posY}%`;
            if (codeColor1) codeColor1.textContent = color1;
            if (codeColor2) codeColor2.textContent = color2;
            if (codeInterval) codeInterval.textContent = speed;
        }

        function highlightCodeUpdate() {
            if (codePosition && codeGradientPosition) {
                codePosition.classList.remove('code-update-highlight');
                codeGradientPosition.classList.remove('code-update-highlight');

                // Forzar reflow
                void codePosition.offsetWidth;

                codePosition.classList.add('code-update-highlight');
                codeGradientPosition.classList.add('code-update-highlight');

                setTimeout(() => {
                    codePosition.classList.remove('code-update-highlight');
                    codeGradientPosition.classList.remove('code-update-highlight');
                }, 300);
            }
        }

        function highlightColorUpdate() {
            if (codeColor1 && codeColor2) {
                codeColor1.classList.remove('code-update-highlight');
                codeColor2.classList.remove('code-update-highlight');

                void codeColor1.offsetWidth;

                codeColor1.classList.add('code-update-highlight');
                codeColor2.classList.add('code-update-highlight');

                setTimeout(() => {
                    codeColor1.classList.remove('code-update-highlight');
                    codeColor2.classList.remove('code-update-highlight');
                }, 500);
            }
        }

        function startMovement() {

            if (rotationInterval) {
                clearInterval(rotationInterval);
                rotationInterval = null;
            }

            isRunning = true;
            rotationInterval = setInterval(() => {
                posX = 50 + 40 * Math.cos(Date.now() / 1000);
                posY = 50 + 40 * Math.sin(Date.now() / 1000);

                updateAllDisplays();
                highlightCodeUpdate();
            }, speed);

            if (animationStatus) {
                animationStatus.textContent = '▶️ Ejecutándose';
                animationStatus.style.background = 'rgba(76, 175, 80, 0.2)';
                animationStatus.style.color = '#4caf50';
            }
        }

        function stopMovement() {
            isRunning = false;
            if (rotationInterval) {
                clearInterval(rotationInterval);
                rotationInterval = null;
            }

            if (animationStatus) {
                animationStatus.textContent = '⏸️ Pausado';
                animationStatus.style.background = 'rgba(255, 193, 7, 0.2)';
                animationStatus.style.color = '#ffc107';
            }
        }

        function resetMovement() {
            stopMovement();
            posX = 50;
            posY = 50;
            updateAllDisplays();
        }

        function updateSpeed() {
            if (speedRange && speedValue) {
                speed = parseInt(speedRange.value);
                speedValue.textContent = `${speed}ms`;

                if (codeInterval) {
                    codeInterval.textContent = speed;
                }

                if (isRunning) {
                    startMovement();
                }

                highlightCodeUpdate();
            }
        }

        function updateColor1() {
            if (colorPicker1 && colorValue1) {
                color1 = colorPicker1.value.toUpperCase();
                colorValue1.textContent = color1;

                if (codeColor1) {
                    codeColor1.textContent = color1;
                }

                updateAllDisplays();
                highlightColorUpdate();
            }
        }

        function updateColor2() {
            if (colorPicker2 && colorValue2) {
                color2 = colorPicker2.value.toUpperCase();
                colorValue2.textContent = color2;

                if (codeColor2) {
                    codeColor2.textContent = color2;
                }

                updateAllDisplays();
                highlightColorUpdate();
            }
        }

        // configuracion de events listeners 
        function setupEventListeners() {
            console.log('🔌 Configurando event listeners...');

            // eventos
            if (startBtn) {
                startBtn.addEventListener('click', startMovement);
            }
            if (stopBtn) {
                stopBtn.addEventListener('click', stopMovement);
            }
            if (resetBtn) {
                resetBtn.addEventListener('click', resetMovement);
            }
            if (speedRange) {
                speedRange.addEventListener('input', updateSpeed);
            }
            if (colorPicker1) {
                colorPicker1.addEventListener('input', updateColor1);
            }
            if (colorPicker2) {
                colorPicker2.addEventListener('input', updateColor2);
            }
        }

        // Control con barra espaciadora
        function handleSpaceKey(e) {
            if (e.code === 'Space' && e.target === document.body) {
                e.preventDefault();
                if (isRunning) {
                    stopMovement();
                } else {
                    startMovement();
                }
            }
        }

        function initialize() {
            console.log('🚀 Inicializando demo de posición radial...');

            setupEventListeners();

            // Configurar valores iniciales
            if (speedRange) speedRange.value = speed;
            if (speedValue) speedValue.textContent = `${speed}ms`;
            if (colorPicker1) colorPicker1.value = color1.toLowerCase();
            if (colorPicker2) colorPicker2.value = color2.toLowerCase();
            if (colorValue1) colorValue1.textContent = color1;
            if (colorValue2) colorValue2.textContent = color2;

            // Actualizar displays iniciales
            updateAllDisplays();

            // Configurar evento de teclado
            document.addEventListener('keydown', handleSpaceKey);
        }

        initialize();

        currentRotationDemo = {
            stop: stopMovement,
            cleanup: () => {
                document.removeEventListener('keydown', handleSpaceKey);
                stopMovement();
            }
        };
    }

    // detener animaciones al cambiar de lección
    function cleanupDemos() {
        if (rotationInterval) {
            clearInterval(rotationInterval);
            rotationInterval = null;
        }
        if (currentRotationDemo) {
            currentRotationDemo.cleanup();
            currentRotationDemo = null;
        }
        isRunning = false;
    }


    // seccion 4

    function initializeMultiColorRadialDemo() {
        console.log('🎨 Inicializando demo de múltiples colores radiales...');

        // Elementos del DOM
        const colorStopsContainer = document.getElementById('color-stops-container');
        const multiColorDemoBox = document.getElementById('multi-color-demo-box');
        const multiColorCode = document.getElementById('multi-color-code');
        const multiColorExplanation = document.getElementById('multi-color-explanation');
        const colorStopsOverlay = document.getElementById('color-stops-overlay');

        // Botones de control
        const addColorBtn = document.getElementById('add-color-btn');
        const removeColorBtn = document.getElementById('remove-color-btn');
        const resetColorsBtn = document.getElementById('reset-colors-btn');
        const presetButtons = document.querySelectorAll('.preset-btn');

        // Verificar elementos
        if (!colorStopsContainer || !multiColorDemoBox) {
            return;
        }

        let colorStops = [
            { color: '#ff6b6b', position: 0 },
            { color: '#ffe66d', position: 50 },
            { color: '#4ecdc4', position: 100 }
        ];

        // Gradientes radiales predefinidos
        const presets = {
            sunset: [
                { color: '#ff6b6b', position: 0 },
                { color: '#ff8e6b', position: 25 },
                { color: '#ffe66d', position: 50 },
                { color: '#4ecdc4', position: 75 },
                { color: '#1a535c', position: 100 }
            ],
            ocean: [
                { color: '#667eea', position: 0 },
                { color: '#764ba2', position: 33 },
                { color: '#f093fb', position: 66 },
                { color: '#f5576c', position: 100 }
            ],
            forest: [
                { color: '#0fa36b', position: 0 },
                { color: '#1eb2a6', position: 33 },
                { color: '#4ecdc4', position: 66 },
                { color: '#96ceb4', position: 100 }
            ],
            rainbow: [
                { color: '#ff6b6b', position: 0 },
                { color: '#ffe66d', position: 20 },
                { color: '#4ecdc4', position: 40 },
                { color: '#45b7d1', position: 60 },
                { color: '#96ceb4', position: 80 },
                { color: '#764ba2', position: 100 }
            ],
            neon: [
                { color: '#ff6b6b', position: 0 },
                { color: '#ffe66d', position: 25 },
                { color: '#4ecdc4', position: 50 },
                { color: '#45b7d1', position: 75 },
                { color: '#f093fb', position: 100 }
            ]
        };

        // renderizar los controles de color
        function renderColorStops() {
            colorStopsContainer.innerHTML = '';

            colorStops.forEach((stop, index) => {
                const colorStopElement = document.createElement('div');
                colorStopElement.className = 'color-stop';
                colorStopElement.innerHTML = `
                <input type="color" class="color-preview" value="${stop.color}" data-index="${index}">
                <div class="color-stop-controls">
                    <div class="stop-position">
                        <input type="number" class="position-input" value="${stop.position}" 
                               min="0" max="100" data-index="${index}">
                        <span>%</span>
                    </div>
                    <span class="color-value-display">${stop.color.toUpperCase()}</span>
                    ${index > 0 && index < colorStops.length - 1 ?
                        `<button class="remove-stop" data-index="${index}">🗑️ Eliminar</button>` : ''}
                </div>
            `;
                colorStopsContainer.appendChild(colorStopElement);
            });

            // Agregar event listeners a los nuevos elementos
            attachColorStopEvents();
            updateDemo();
        }

        // agregar event listeners
        function attachColorStopEvents() {
            document.querySelectorAll('.color-preview').forEach(input => {
                input.addEventListener('input', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    colorStops[index].color = e.target.value;
                    updateColorValueDisplay(index);
                    updateDemo();
                });
            });

            // inputs de posición
            document.querySelectorAll('.position-input').forEach(input => {
                input.addEventListener('input', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    let position = parseInt(e.target.value);

                    // Validar límites
                    if (position < 0) position = 0;
                    if (position > 100) position = 100;

                    // Asegurar orden correcto
                    if (index > 0 && position <= colorStops[index - 1].position) {
                        position = colorStops[index - 1].position + 1;
                    }
                    if (index < colorStops.length - 1 && position >= colorStops[index + 1].position) {
                        position = colorStops[index + 1].position - 1;
                    }

                    colorStops[index].position = position;
                    e.target.value = position;
                    updateDemo();
                });
            });

            // Eventos para botones de eliminar
            document.querySelectorAll('.remove-stop').forEach(button => {
                button.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    if (colorStops.length > 2) {
                        colorStops.splice(index, 1);
                        renderColorStops();
                    }
                });
            });
        }

        // actualizar la visualización del valor del color
        function updateColorValueDisplay(index) {
            const display = document.querySelector(`.color-value-display:nth-child(${index + 1})`);
            if (display) {
                display.textContent = colorStops[index].color.toUpperCase();
            }
        }

        // actualizar el demo RADIAL
        function updateDemo() {
            colorStops.sort((a, b) => a.position - b.position);

            // Generar cadena de gradiente RADIAL
            const gradientStops = colorStops.map(stop =>
                `${stop.color} ${stop.position}%`
            ).join(', ');

            const gradientString = `radial-gradient(circle, ${gradientStops})`;

            multiColorDemoBox.style.background = gradientString;

            updateCodeDisplay(gradientStops);

            updateExplanation();

            updatePositionMarkers();
        }

        function updateCodeDisplay(gradientStops) {
            const codeLines = gradientStops.split(', ')
                .map(stop => `    ${stop}`)
                .join(',\n');

            multiColorCode.innerHTML =
                `<code><span class="css-property">background</span>: <span class="css-function">radial-gradient</span>(<span class="css-value">circle</span>,
${codeLines});</code>`;
        }

        // actualizar la explicación
        function updateExplanation() {
            const explanation = colorStops.map((stop, index) => {
                const colorName = getColorName(stop.color);
                return `${colorName} (${stop.position}%)`;
            }).join(' → ');

            multiColorExplanation.textContent =
                `${colorStops.length} colores: ${explanation}`;
        }

        // obtener nombre aproximado del color
        function getColorName(hexColor) {
            const colorMap = {
                '#ff6b6b': 'Rojo',
                '#ffe66d': 'Amarillo',
                '#4ecdc4': 'Verde azulado',
                '#1a535c': 'Azul oscuro',
                '#667eea': 'Azul',
                '#764ba2': 'Morado',
                '#f093fb': 'Rosa',
                '#f5576c': 'Rojo coral',
                '#0fa36b': 'Verde',
                '#1eb2a6': 'Verde azulado',
                '#96ceb4': 'Verde menta',
                '#45b7d1': 'Azul claro'
            };

            return colorMap[hexColor.toLowerCase()] || hexColor.toUpperCase();
        }

        // actualizar marcadores de posición
        function updatePositionMarkers() {
            if (!colorStopsOverlay) return;

            colorStopsOverlay.innerHTML = '';

            colorStops.forEach(stop => {
                const marker = document.createElement('div');
                marker.className = 'stop-marker';
                marker.style.left = `${stop.position}%`;
                marker.style.position = 'absolute';
                marker.style.transform = 'translateX(-50%)';

                marker.innerHTML = `
                <div class="marker-dot" style="color: ${stop.color}"></div>
                <div class="marker-label">${stop.position}%</div>
            `;

                colorStopsOverlay.appendChild(marker);
            });
        }

        // agregar un nuevo color
        function addColorStop() {
            if (colorStops.length >= 6) {
                alert('Máximo 6 colores permitidos');
                return;
            }

            // Encontrar la posición más grande para insertar
            const lastPosition = colorStops[colorStops.length - 2].position;
            const newPosition = Math.min(lastPosition + 10, 90);

            // Color intermedio
            const newColor = '#45b7d1';

            // Insertar nuevo stop
            colorStops.splice(colorStops.length - 1, 0, {
                color: newColor,
                position: newPosition
            });

            renderColorStops();
        }

        // quitar un color
        function removeColorStop() {
            if (colorStops.length > 2) {
                colorStops.splice(colorStops.length - 2, 1);
                renderColorStops();
            }
        }

        // reiniciar
        function resetColorStops() {
            colorStops = [
                { color: '#ff6b6b', position: 0 },
                { color: '#ffe66d', position: 50 },
                { color: '#4ecdc4', position: 100 }
            ];
            renderColorStops();
        }

        // aplicar preset
        function applyPreset(presetName) {
            if (presets[presetName]) {
                colorStops = JSON.parse(JSON.stringify(presets[presetName]));
                renderColorStops();
            }
        }

        // event listeners
        if (addColorBtn) addColorBtn.addEventListener('click', addColorStop);
        if (removeColorBtn) removeColorBtn.addEventListener('click', removeColorStop);
        if (resetColorsBtn) resetColorsBtn.addEventListener('click', resetColorStops);

        if (presetButtons.length) {
            presetButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const presetName = e.target.dataset.preset;
                    applyPreset(presetName);
                });
            });
        }

        // Inicializar
        renderColorStops();
    }

    // seccion 5

    function initializePracticeSection() {

        const cssEditor = document.getElementById('css-practice-editor');
        const applyBtn = document.getElementById('apply-css-btn');
        const resetBtn = document.getElementById('reset-practice-btn');
        const previewElement = document.querySelector('.mi-gradiente');
        const exampleButtons = document.querySelectorAll('.example-btn');

        // Verificar si estamos en la sección de práctica
        if (!cssEditor || !previewElement) {
            return;
        }

        // Código inicial por defecto para RADIAL
        const defaultCode = `.mi-gradiente {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, #667eea, #764ba2);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}`;

        function applyCSS() {
            const cssCode = cssEditor.value;
            console.log('🎨 Aplicando CSS:', cssCode);

            try {
                const cssContent = extractCSSProperties(cssCode);

                if (cssContent) {
                    Object.keys(cssContent).forEach(property => {
                        previewElement.style[property] = cssContent[property];
                    });

                    // Efecto visual de éxito
                    previewElement.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        previewElement.style.transform = 'scale(1)';
                    }, 200);

                } else {
                    throw new Error('No se pudieron extraer propiedades CSS válidas');
                }

            } catch (error) {
                previewElement.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.5)';
                setTimeout(() => {
                    previewElement.style.boxShadow = '';
                }, 1000);
            }
        }

        function extractCSSProperties(cssCode) {
            const match = cssCode.match(/\.mi-gradiente\s*\{([^}]+)\}/i);

            if (!match || !match[1]) {
                return parseCSSProperties(cssCode);
            }

            const cssContent = match[1].trim();
            return parseCSSProperties(cssContent);
        }

        function parseCSSProperties(cssContent) {
            const properties = {};
            const declarations = cssContent.split(';');

            declarations.forEach(declaration => {
                const trimmed = declaration.trim();
                if (trimmed) {
                    const [property, value] = trimmed.split(':').map(part => part.trim());
                    if (property && value) {
                        const camelCaseProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                        properties[camelCaseProperty] = value;
                    }
                }
            });

            return properties;
        }

        // reiniciar
        function resetPractice() {
            cssEditor.value = defaultCode;
            applyCSS();
        }

        // cargar ejemplo
        function loadExample(gradientCode) {
            const newCode = `.mi-gradiente {
    width: 100%;
    height: 100%;
    background: ${gradientCode};
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}`;

            cssEditor.value = newCode;
            applyCSS();

            cssEditor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        //  event listeners
        if (applyBtn) applyBtn.addEventListener('click', applyCSS);
        if (resetBtn) resetBtn.addEventListener('click', resetPractice);

        if (cssEditor) {
            cssEditor.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                    e.preventDefault();
                    applyCSS();
                }
            });
        }

        // event listeners para botones de ejemplo
        exampleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const gradientCode = button.dataset.code;
                loadExample(gradientCode);
            });
        });

        resetPractice();

    }

    // carga dinamica de lecciones

    function loadLesson(lessonNum) {
        cleanupDemos();

        // oculta las secciones de contenido
        lessonContentSections.forEach(section => {
            section.style.display = 'none';
        });

        // muestra la sección activa
        const activeLesson = document.getElementById(`lesson-content-${lessonNum}`);
        if (activeLesson) {
            activeLesson.style.display = 'block';

            // interactividad de la lección cargada
            setTimeout(() => {
                if (lessonNum === '2') {
                    initializeShapesDemo();
                    initializePositionDemo();
                } else if (lessonNum === '3') {

                } else if (lessonNum === '4') {
                    initializeMultiColorRadialDemo();

                } else if (lessonNum === '5') {
                    initializePracticeSection();
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