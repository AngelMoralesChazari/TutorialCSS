document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.lesson-list li');
    // Selecciona todas las secciones de contenido (1, 2, 3, 4)
    const lessonContentSections = document.querySelectorAll('.lesson-content');

    // Variable global para el intervalo de rotación
    let rotationInterval;

    // =======================================================
    // FUNCIONES DE INTERACTIVIDAD PARA LA LECCIÓN 2
    // =======================================================

    // Función para el demo interactivo de dirección
    function initializeDirectionDemo() {
        const demoBox = document.getElementById('direction-demo-box');
        const directionDisplay = document.getElementById('current-direction');
        const directionButtons = document.querySelectorAll('#lesson-content-2 .btn-direction');

        directionButtons.forEach(button => {
            // Se usa removeEventListener para evitar que se añadan múltiples eventos al cambiar de lección
            button.removeEventListener('click', handleDirectionClick);
            button.addEventListener('click', handleDirectionClick);
        });

        function handleDirectionClick() {
            const direction = this.dataset.direction;
            // Aplica el nuevo gradiente al DOM
            demoBox.style.background = `linear-gradient(${direction}, #4ecdc4, #764ba2)`;
            // Actualiza el texto de la dirección actual
            directionDisplay.textContent = direction;
        }
    }

    // Función para el demo de rotación (usa setInterval)
    function initializeRotationDemo() {
        const rotationBox = document.getElementById('rotation-demo-box');
        const startBtn = document.getElementById('start-rotation-btn');
        const stopBtn = document.getElementById('stop-rotation-btn');
        let currentAngle = 0;

        // Limpieza de eventos para evitar duplicados
        startBtn.removeEventListener('click', startRotation);
        stopBtn.removeEventListener('click', stopRotation);

        function startRotation() {
            // Asegura que solo un intervalo esté corriendo a la vez
            if (rotationInterval) return;

            rotationInterval = setInterval(() => {
                currentAngle = (currentAngle + 5) % 360; // Incrementa el ángulo de 5 en 5 (DOM)
                // Aplica el nuevo gradiente al DOM
                rotationBox.style.background = `linear-gradient(${currentAngle}deg, #93c5fd, #38bdf8)`;
            }, 50); // Velocidad de la animación
        }

        function stopRotation() {
            clearInterval(rotationInterval);
            rotationInterval = null;
        }

        startBtn.addEventListener('click', startRotation);
        stopBtn.addEventListener('click', stopRotation);
    }

    // Función de limpieza para detener animaciones al cambiar de lección
    function cleanupDemos() {
        if (rotationInterval) {
            clearInterval(rotationInterval);
            rotationInterval = null;
        }
    }

    // =======================================================
    // LÓGICA DE CARGA DINÁMICA DE LECCIONES
    // =======================================================

    function loadLesson(lessonNum) {
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
                initializeDirectionDemo();
                initializeRotationDemo();
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

    // Funcionalidad para la sección 2 - Direcciones y Ángulos
    function initDirectionDemo() {
        const directionButtons = document.querySelectorAll('.btn-direction');
        const demoBox = document.getElementById('direction-demo-box');
        const directionCode = document.getElementById('direction-code');
        const currentDirection = document.getElementById('current-direction');

        directionButtons.forEach(button => {
            button.addEventListener('click', function () {
                const direction = this.getAttribute('data-direction');

                // Remover activo de todos los botones
                directionButtons.forEach(btn => btn.classList.remove('active'));
                // Activar botón clickeado
                this.classList.add('active');

                // Actualizar demo
                demoBox.style.background = `linear-gradient(${direction}, #4ecdc4, #764ba2)`;
                directionCode.textContent = direction;
                currentDirection.textContent = direction;
            });
        });
    }

    function initRotationDemo() {
        const startBtn = document.getElementById('start-rotation-btn');
        const stopBtn = document.getElementById('stop-rotation-btn');
        const resetBtn = document.getElementById('reset-rotation-btn');
        const rotationBox = document.getElementById('rotation-demo-box');
        const angleIndicator = rotationBox.querySelector('.angle-indicator');
        const currentAngle = document.getElementById('current-angle');

        // Elementos del código que se actualizarán
        const codeAngle = document.getElementById('code-angle');
        const codeGradientAngle = document.getElementById('code-gradient-angle');
        const rotationCode = document.getElementById('rotation-code');

        let rotationInterval;
        let angle = 0;

        function updateRotation() {
            // Actualizar el gradiente visual
            rotationBox.style.background = `linear-gradient(${angle}deg, #93c5fd, #38bdf8)`;
            angleIndicator.textContent = `${angle}°`;
            currentAngle.textContent = `${angle}deg`;

            // Actualizar el código en tiempo real
            codeAngle.textContent = angle;
            codeGradientAngle.textContent = angle;

            // Efecto de highlight en el código
            highlightCodeUpdate();
        }

        function highlightCodeUpdate() {
            // Agregar clase de highlight temporal
            codeAngle.classList.add('code-update-highlight');
            codeGradientAngle.classList.add('code-update-highlight');

            // Remover el highlight después de la animación
            setTimeout(() => {
                codeAngle.classList.remove('code-update-highlight');
                codeGradientAngle.classList.remove('code-update-highlight');
            }, 300);
        }

        function startRotation() {
            if (rotationInterval) return;

            rotationInterval = setInterval(() => {
                angle = (angle + 2) % 360;
                updateRotation();
            }, 50);
        }

        function stopRotation() {
            if (rotationInterval) {
                clearInterval(rotationInterval);
                rotationInterval = null;
            }
        }

        function resetRotation() {
            stopRotation();
            angle = 0;
            updateRotation();
        }

        // Event listeners
        startBtn.addEventListener('click', startRotation);
        stopBtn.addEventListener('click', stopRotation);
        resetBtn.addEventListener('click', resetRotation);

        // Inicializar
        updateRotation();

        // También permitir pausar/reanudar con la barra espaciadora
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (rotationInterval) {
                    stopRotation();
                } else {
                    startRotation();
                }
            }
        });
    }

    // Inicializar cuando se muestre la sección 2
    document.addEventListener('DOMContentLoaded', function () {
        // ... tu código existente ...

        // Inicializar demos de la sección 2
        initDirectionDemo();
        initRotationDemo();
    });

    // Cargar la primera lección por defecto al iniciar
    loadLesson('1');
});