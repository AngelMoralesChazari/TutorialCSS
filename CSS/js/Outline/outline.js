// ../js/Outline/outline.js
document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.lesson-list li');
  const sections = document.querySelectorAll('.lesson-content'); // todas las secciones
  const HIDDEN_CLASS = 'hidden-lesson';
  const ACTIVE_CLASS = 'active';

  function showLessonByNumber(num) {
    // 1) Oculta todas las secciones
    sections.forEach(sec => sec.classList.add(HIDDEN_CLASS));
    // 2) Quita activo del menú
    menuItems.forEach(it => it.classList.remove(ACTIVE_CLASS));

    // 3) Muestra la sección objetivo
    const targetId = `lesson-content-${num}`;
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.remove(HIDDEN_CLASS);
      // 4) Marca activo el item correspondiente
      const currentItem = document.querySelector(`.lesson-list li[data-lesson="${num}"]`);
      if (currentItem) currentItem.classList.add(ACTIVE_CLASS);

      // 5) Actualiza el hash para enlaces compartibles
      history.replaceState(null, '', `#${targetId}`);
    } else {
      console.warn('No se encontró la sección:', targetId);
    }
  }

  // Click en el menú
  menuItems.forEach(item => {
    item.setAttribute('tabindex', '0'); // accesible con teclado
    item.addEventListener('click', () => {
      const num = item.getAttribute('data-lesson');
      if (num) showLessonByNumber(num);
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const num = item.getAttribute('data-lesson');
        if (num) showLessonByNumber(num);
      }
    });
  });

  // Soporte de hash directo (ej: ...#lesson-content-4)
  function initFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && /^lesson-content-\d+$/.test(hash)) {
      const num = hash.split('-').pop();
      showLessonByNumber(num);
      return;
    }
    // Fallback: muestra la primera (1)
    showLessonByNumber('1');
  }

  window.addEventListener('hashchange', initFromHash);
  initFromHash();
});