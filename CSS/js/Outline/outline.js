// outline.js - Funcionalidad específica para la página Outline

document.addEventListener('DOMContentLoaded', function() {
    // Navegación entre lecciones del temario
    const lessonItems = document.querySelectorAll('.lesson-list li');
    const lessonContents = document.querySelectorAll('.lesson-content');
    
    // Función para cargar lección
    function loadLesson(lessonId) {
        // Actualizar estado activo
        lessonItems.forEach(li => li.classList.remove('active'));
        
        // Mostrar contenido correspondiente
        lessonContents.forEach(content => {
            content.classList.add('hidden-lesson');
        });
        
        const targetContent = document.getElementById(`lesson-content-${lessonId}`);
        const targetMenuItem = document.querySelector(`.lesson-list li[data-lesson="${lessonId}"]`);
        
        if (targetContent && targetMenuItem) {
            targetContent.classList.remove('hidden-lesson');
            targetMenuItem.classList.add('active');
        }
    }
    
    // Manejo de clics en el temario
    lessonItems.forEach(item => {
        item.addEventListener('click', function() {
            const lessonId = this.getAttribute('data-lesson');
            loadLesson(lessonId);
        });
    });
    
    // Demo interactivo de outline en botón
    const outlineDemoBtn = document.getElementById('outline-demo-btn');
    if (outlineDemoBtn) {
        outlineDemoBtn.addEventListener('click', function() {
            // Toggle de outline para demostración
            if (this.style.outline === '3px solid blue') {
                this.style.outline = '';
            } else {
                this.style.outline = '3px solid blue';
            }
        });
    }
    
    // Demo de navegación por teclado
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn, index) => {
        btn.addEventListener('focus', function() {
            // Agregar outline personalizado al enfocar
            this.style.outline = '3px solid #ff6b6b';
            this.style.outlineOffset = '1px';
        });
        
        btn.addEventListener('blur', function() {
            // Remover outline al perder foco
            this.style.outline = '';
        });
    });
    
    // Demo de formulario
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Outline ya está definido en CSS, solo agregamos clase para feedback visual
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Inicializar primera lección por defecto al iniciar
    loadLesson('1');
});