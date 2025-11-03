// Navegación del temario RGBA/HSLA
document.addEventListener('DOMContentLoaded', function() {
    const lessonItems = document.querySelectorAll('.lesson-list li');
    const lessonContents = document.querySelectorAll('.lesson-content');
    
    // Mostrar solo la primera lección al cargar
    function showLesson(lessonNumber) {
        // Ocultar todas las lecciones
        lessonContents.forEach(content => {
            content.classList.add('hidden-lesson');
        });
        
        // Mostrar la lección seleccionada
        const targetLesson = document.getElementById(`lesson-content-${lessonNumber}`);
        if (targetLesson) {
            targetLesson.classList.remove('hidden-lesson');
        }
        
        // Actualizar estado activo en el menú
        lessonItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`.lesson-list li[data-lesson="${lessonNumber}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }
    
    // Agregar event listeners a los items del menú
    lessonItems.forEach(item => {
        item.addEventListener('click', function() {
            const lessonNumber = this.getAttribute('data-lesson');
            showLesson(lessonNumber);
            
            // Scroll suave al inicio del contenido
            document.querySelector('.main-lesson-container').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Mostrar la primera lección por defecto
    showLesson(1);
    
    // Efectos de hover mejorados para las tarjetas
    const useCaseCards = document.querySelectorAll('.use-case-card');
    useCaseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Controladores para los demos interactivos (si los tienes)
    initInteractiveDemos();
});

// Función para inicializar demos interactivos
function initInteractiveDemos() {
    // Demo RGBA
    const rgbaR = document.getElementById('rgba-r');
    const rgbaG = document.getElementById('rgba-g');
    const rgbaB = document.getElementById('rgba-b');
    const rgbaA = document.getElementById('rgba-a');
    
    const rgbaRValue = document.getElementById('rgba-r-value');
    const rgbaGValue = document.getElementById('rgba-g-value');
    const rgbaBValue = document.getElementById('rgba-b-value');
    const rgbaAValue = document.getElementById('rgba-a-value');
    
    const rgbaDemoBox = document.getElementById('rgba-demo-box');
    const rgbaCode = document.getElementById('rgba-code');
    const rgbaValues = document.getElementById('rgba-values');
    
    if (rgbaR && rgbaDemoBox) {
        function updateRgbaDemo() {
            const r = rgbaR.value;
            const g = rgbaG.value;
            const b = rgbaB.value;
            const a = (rgbaA.value / 100).toFixed(2);
            
            // Actualizar valores mostrados
            rgbaRValue.textContent = r;
            rgbaGValue.textContent = g;
            rgbaBValue.textContent = b;
            rgbaAValue.textContent = a;
            
            // Actualizar demo visual
            rgbaDemoBox.style.background = `rgba(${r}, ${g}, ${b}, ${a})`;
            
            // Actualizar código
            const code = `rgba(${r}, ${g}, ${b}, ${a})`;
            rgbaCode.querySelector('code').textContent = `background: ${code};`;
            rgbaValues.textContent = code;
        }
        
        rgbaR.addEventListener('input', updateRgbaDemo);
        rgbaG.addEventListener('input', updateRgbaDemo);
        rgbaB.addEventListener('input', updateRgbaDemo);
        rgbaA.addEventListener('input', updateRgbaDemo);
        
        // Inicializar
        updateRgbaDemo();
    }
    
    // Demo HSLA (similar al RGBA)
    const hslaH = document.getElementById('hsla-h');
    const hslaS = document.getElementById('hsla-s');
    const hslaL = document.getElementById('hsla-l');
    const hslaA = document.getElementById('hsla-a');
    
    if (hslaH) {
        // ... código similar para HSLA
    }
}