document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.lesson-list li');
    const lessonContentSections = document.querySelectorAll('.lesson-content');

    // Variable global para el intervalo de rotación
    let rotationInterval;
    let currentRotationDemo = null;

    // =======================================================
    // FUNCIONES DE INTERACTIVIDAD MEJORADAS
    // =======================================================

    function initializeDirectionDemo() {
        const demoBox = document.getElementById('direction-demo-box');
        const directionDisplay = document.getElementById('current-direction');
        const directionButtons = document.querySelectorAll('#lesson-content-2 .btn-direction');
        const directionCode = document.getElementById('direction-code');

        directionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const direction = this.dataset.direction;
                
                // Remover activo de todos los botones
                directionButtons.forEach(btn => btn.classList.remove('active'));
                // Activar botón clickeado
                this.classList.add('active');
                
                // Actualizar demo y código
                demoBox.style.background = `linear-gradient(${direction}, #4ecdc4, #764ba2)`;
                directionDisplay.textContent = direction;
                if (directionCode) {
                    directionCode.textContent = direction;
                }
            });
        });
    }

    // Función para el demo de rotación MEJORADA
    function initializeRotationDemo() {
        console.log('🔧 Inicializando demo de rotación...');
        
        // Elementos básicos
        const rotationBox = document.getElementById('rotation-demo-box');
        const startBtn = document.getElementById('start-rotation-btn');
        const stopBtn = document.getElementById('stop-rotation-btn');
        const resetBtn = document.getElementById('reset-rotation-btn');
        const currentAngleDisplay = document.getElementById('current-angle');
        
        // Elementos de control
        const speedRange = document.getElementById('speed-range');
        const speedValue = document.getElementById('speed-value');
        const colorPicker1 = document.getElementById('color-picker-1');
        const colorPicker2 = document.getElementById('color-picker-2');
        const colorValue1 = document.getElementById('color-value-1');
        const colorValue2 = document.getElementById('color-value-2');
        const animationStatus = document.getElementById('animation-status');
        
        // Elementos del código en el panel
        const codeAngle = document.getElementById('code-angle');
        const codeGradientAngle = document.getElementById('code-gradient-angle');
        const codeColor1 = document.getElementById('code-color-1');
        const codeColor2 = document.getElementById('code-color-2');
        const codeInterval = document.getElementById('code-interval');

        // Verificar que los elementos existan
        if (!rotationBox || !startBtn || !stopBtn) {
            console.error('❌ Elementos esenciales no encontrados');
            return;
        }

        console.log('✅ Elementos encontrados:', {
            speedRange: !!speedRange,
            colorPicker1: !!colorPicker1,
            colorPicker2: !!colorPicker2,
            codeAngle: !!codeAngle,
            codeColor1: !!codeColor1
        });

        // Variables de estado
        let angle = 0;
        let speed = speedRange ? parseInt(speedRange.value) : 50;
        let color1 = '#93C5FD';
        let color2 = '#38BDF8';

        // Función para actualizar la rotación
        function updateRotation() {
            // Actualizar el gradiente visual
            rotationBox.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
            
            // Actualizar displays
            if (currentAngleDisplay) currentAngleDisplay.textContent = `${angle}deg`;
            const angleIndicator = rotationBox.querySelector('.angle-indicator');
            if (angleIndicator) angleIndicator.textContent = `${angle}°`;

            // ✅ ACTUALIZAR CÓDIGO EN EL PANEL
            if (codeAngle) codeAngle.textContent = angle;
            if (codeGradientAngle) codeGradientAngle.textContent = angle;
            if (codeColor1) codeColor1.textContent = color1;
            if (codeColor2) codeColor2.textContent = color2;

            console.log('🔄 Ángulo actualizado:', angle, 'Colores:', color1, color2);
        }

        function highlightCodeUpdate() {
            if (codeAngle && codeGradientAngle) {
                codeAngle.classList.remove('code-update-highlight');
                codeGradientAngle.classList.remove('code-update-highlight');
                
                // Forzar reflow
                void codeAngle.offsetWidth;
                
                codeAngle.classList.add('code-update-highlight');
                codeGradientAngle.classList.add('code-update-highlight');
                
                setTimeout(() => {
                    codeAngle.classList.remove('code-update-highlight');
                    codeGradientAngle.classList.remove('code-update-highlight');
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

        function startRotation() {
            console.log('▶️ Iniciando rotación, velocidad:', speed);
            
            if (rotationInterval) {
                clearInterval(rotationInterval);
            }

            rotationInterval = setInterval(() => {
                angle = (angle + 2) % 360;
                updateRotation();
                highlightCodeUpdate();
            }, speed);

            if (animationStatus) {
                animationStatus.textContent = '▶️ Ejecutándose';
                animationStatus.style.background = 'rgba(76, 175, 80, 0.2)';
                animationStatus.style.color = '#4caf50';
                animationStatus.classList.add('active');
            }
        }

        function stopRotation() {
            console.log('⏸️ Deteniendo rotación');
            
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

        function resetRotation() {
            console.log('🔄 Reiniciando rotación');
            stopRotation();
            angle = 0;
            updateRotation();
            if (animationStatus) {
                animationStatus.classList.remove('active');
            }
        }

        // ✅ FUNCIÓN CORREGIDA: Actualizar velocidad
        function updateSpeed() {
            if (speedRange && speedValue) {
                speed = parseInt(speedRange.value);
                speedValue.textContent = `${speed}ms`;
                
                // ✅ ACTUALIZAR CÓDIGO EN EL PANEL
                if (codeInterval) {
                    codeInterval.textContent = speed;
                }
                
                console.log('🎚️ Velocidad actualizada:', speed);
                
                // Si la animación está corriendo, reiniciar con nueva velocidad
                if (rotationInterval) {
                    startRotation();
                }
            }
        }

        // ✅ FUNCIÓN CORREGIDA: Actualizar color 1
        function updateColor1() {
            if (colorPicker1 && colorValue1) {
                color1 = colorPicker1.value.toUpperCase();
                colorValue1.textContent = color1;
                
                // ✅ ACTUALIZAR CÓDIGO EN EL PANEL
                if (codeColor1) {
                    codeColor1.textContent = color1;
                }
                
                console.log('🎨 Color 1 actualizado:', color1);
                highlightColorUpdate();
                updateRotation();
            }
        }

        // ✅ FUNCIÓN CORREGIDA: Actualizar color 2
        function updateColor2() {
            if (colorPicker2 && colorValue2) {
                color2 = colorPicker2.value.toUpperCase();
                colorValue2.textContent = color2;
                
                // ✅ ACTUALIZAR CÓDIGO EN EL PANEL
                if (codeColor2) {
                    codeColor2.textContent = color2;
                }
                
                console.log('🎨 Color 2 actualizado:', color2);
                highlightColorUpdate();
                updateRotation();
            }
        }

        // ✅ CONFIGURAR EVENT LISTENERS CORRECTAMENTE
        function setupEventListeners() {
            // Limpiar eventos anteriores
            startBtn.replaceWith(startBtn.cloneNode(true));
            stopBtn.replaceWith(stopBtn.cloneNode(true));
            resetBtn.replaceWith(resetBtn.cloneNode(true));
            if (speedRange) speedRange.replaceWith(speedRange.cloneNode(true));
            if (colorPicker1) colorPicker1.replaceWith(colorPicker1.cloneNode(true));
            if (colorPicker2) colorPicker2.replaceWith(colorPicker2.cloneNode(true));

            // Re-seleccionar elementos frescos
            const freshStartBtn = document.getElementById('start-rotation-btn');
            const freshStopBtn = document.getElementById('stop-rotation-btn');
            const freshResetBtn = document.getElementById('reset-rotation-btn');
            const freshSpeedRange = document.getElementById('speed-range');
            const freshColorPicker1 = document.getElementById('color-picker-1');
            const freshColorPicker2 = document.getElementById('color-picker-2');
            const freshSpeedValue = document.getElementById('speed-value');

            // Agregar event listeners
            freshStartBtn.addEventListener('click', startRotation);
            freshStopBtn.addEventListener('click', stopRotation);
            freshResetBtn.addEventListener('click', resetRotation);
            
            if (freshSpeedRange) {
                freshSpeedRange.addEventListener('input', updateSpeed);
            }
            
            if (freshColorPicker1) {
                freshColorPicker1.addEventListener('input', updateColor1);
            }
            
            if (freshColorPicker2) {
                freshColorPicker2.addEventListener('input', updateColor2);
            }

            console.log('✅ Event listeners configurados');
        }

        // Control con barra espaciadora
        function handleSpaceKey(e) {
            if (e.code === 'Space' && e.target === document.body) {
                e.preventDefault();
                if (rotationInterval) {
                    stopRotation();
                } else {
                    startRotation();
                }
            }
        }

        // Inicializar
        setupEventListeners();
        updateSpeed(); // Configurar velocidad inicial
        updateColor1(); // Configurar color 1 inicial
        updateColor2(); // Configurar color 2 inicial
        updateRotation(); // Actualizar visualización inicial
        
        document.addEventListener('keydown', handleSpaceKey);

        console.log('🎉 Demo de rotación inicializado correctamente');

        // Guardar referencia para limpieza
        currentRotationDemo = {
            stop: stopRotation,
            cleanup: () => {
                document.removeEventListener('keydown', handleSpaceKey);
                stopRotation();
            }
        };
    }

    // Función de limpieza para detener animaciones al cambiar de lección
    function cleanupDemos() {
        console.log('🧹 Limpiando demos...');
        if (rotationInterval) {
            clearInterval(rotationInterval);
            rotationInterval = null;
        }
        if (currentRotationDemo) {
            currentRotationDemo.cleanup();
            currentRotationDemo = null;
        }
    }

    // =======================================================
    // LÓGICA DE CARGA DINÁMICA DE LECCIONES
    // =======================================================

    function loadLesson(lessonNum) {
        console.log(`📖 Cargando lección ${lessonNum}`);
        
        // Detiene cualquier demo activa antes de cambiar
        cleanupDemos();

        // 1. Oculta TODAS las secciones de contenido
        lessonContentSections.forEach(section => {
            section.classList.add('hidden-lesson');
        });

        // 2. Muestra SOLAMENTE la sección activa
        const activeLesson = document.getElementById(`lesson-content-${lessonNum}`);
        if (activeLesson) {
            activeLesson.classList.remove('hidden-lesson');

            // 3. Inicializa la interactividad de la lección cargada
            if (lessonNum === '2') {
                console.log('🚀 Inicializando lección 2...');
                // Pequeño delay para asegurar que el DOM esté listo
                setTimeout(() => {
                    initializeDirectionDemo();
                    initializeRotationDemo();
                }, 50);
            }
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