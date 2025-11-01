// radial.js - Navegación simple entre lecciones
document.addEventListener('DOMContentLoaded', function() {
    setupLessonNavigation();
});

function setupLessonNavigation() {
    const lessonItems = document.querySelectorAll('.lesson-list li');
    
    lessonItems.forEach(item => {
        item.addEventListener('click', function() {
            const lessonId = this.getAttribute('data-lesson');
            
            // Remover clase active de todos los items
            lessonItems.forEach(li => li.classList.remove('active'));
            
            // Agregar clase active al item clickeado
            this.classList.add('active');
            
            // Mostrar la lección seleccionada
            showLesson(lessonId);
        });
    });
}

function showLesson(lessonId) {
    // Ocultar todas las lecciones
    const allLessons = document.querySelectorAll('.lesson-content');
    allLessons.forEach(lesson => {
        lesson.style.display = 'none';
    });
    
    // Mostrar la lección seleccionada
    const targetLesson = document.getElementById(`lesson-content-${lessonId}`);
    if (targetLesson) {
        targetLesson.style.display = 'block';
    }
}