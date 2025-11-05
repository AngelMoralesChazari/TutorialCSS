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

    // === Sección 2: Mini-Lab Outline vs Border ===
    (function setupOutlineVsBorderLab() {
        const borderWidth = document.getElementById('lab-border-width');
        const outlineWidth = document.getElementById('lab-outline-width');
        const outlineOffset = document.getElementById('lab-outline-offset');

        const soloBorder = document.getElementById('lab-solo-border');
        const borderOutline = document.getElementById('lab-border-outline');
        const soloOutline = document.getElementById('lab-solo-outline');

        if (!borderWidth || !outlineWidth || !outlineOffset) return; // aún no estás en la sección visible

        const update = () => {
            // Solo Border
            soloBorder.style.borderWidth = `${borderWidth.value}px`;

            // Border + Outline
            borderOutline.style.borderWidth = `${Math.max(1, +borderWidth.value - 2)}px`;
            borderOutline.style.outlineWidth = `${outlineWidth.value}px`;
            borderOutline.style.outlineOffset = `${outlineOffset.value}px`;

            // Solo Outline
            soloOutline.style.outlineWidth = `${outlineWidth.value}px`;
            soloOutline.style.outlineOffset = `${outlineOffset.value}px`;
        };

        borderWidth.addEventListener('input', update);
        outlineWidth.addEventListener('input', update);
        outlineOffset.addEventListener('input', update);

        // Inicial
        update();
    })();

    // === Sección 3: Mini‑Lab Estilos y Colores ===
    (function setupStylesColorsLab() {
        const styleSel = document.getElementById('style-select');
        const widthR = document.getElementById('width-range');
        const offsetR = document.getElementById('offset-range');
        const colorInp = document.getElementById('color-input');
        const preview = document.getElementById('lab-preview');
        const cssText = document.getElementById('lab-css');

        if (!styleSel || !widthR || !offsetR || !colorInp || !preview) return;

        const update = () => {
            const style = styleSel.value;
            const width = `${widthR.value}px`;
            const offset = `${offsetR.value}px`;
            const color = colorInp.value;

            preview.style.outlineStyle = style;
            preview.style.outlineWidth = width;
            preview.style.outlineColor = color;
            preview.style.outlineOffset = offset;

            cssText.textContent = `outline: ${width} ${style} ${color}; outline-offset: ${offset};`;
        };

        styleSel.addEventListener('change', update);
        widthR.addEventListener('input', update);
        offsetR.addEventListener('input', update);
        colorInp.addEventListener('input', update);

        update();
    })();

    // === Sección 4: Mini‑Lab Outline Offset ===
    (function setupOutlineOffsetLab() {
        const w = document.getElementById('offlab-width');
        const o = document.getElementById('offlab-offset');
        const c = document.getElementById('offlab-color');
        const r = document.getElementById('offlab-radius');
        const preview = document.getElementById('offlab-preview');
        const cssOut = document.getElementById('offlab-css');
        if (!w || !o || !c || !r || !preview) return;

        const update = () => {
            const width = `${w.value}px`;
            const offset = `${o.value}px`;
            const color = c.value;
            const radius = `${r.value}px`;

            preview.style.outlineWidth = width;
            preview.style.outlineColor = color;
            preview.style.outlineOffset = offset;
            preview.style.borderRadius = radius;

            cssOut.textContent = `outline: ${width} solid ${color}; outline-offset: ${offset}; border-radius: ${radius};`;
        };

        [w, o, c, r].forEach(el => el.addEventListener('input', update));
        update();
    })();

    // === Sección 5: Accesibilidad (demos focus) ===
    (function setupA11yDemos() {
        const defaultBtn = document.getElementById('a11y-default');
        const customBtn = document.getElementById('a11y-custom');
        const kbdBtn = document.getElementById('a11y-kbd');
        const input = document.getElementById('a11y-input');

        if (!defaultBtn || !customBtn || !kbdBtn || !input) return;

        // Botón para mostrar rápidamente el foco con teclado
        [defaultBtn, customBtn, kbdBtn, input].forEach(el => {
            el.addEventListener('click', () => {
                // Mueve el foco a sí mismo para que el usuario vea el estado
                el.focus();
            });
        });

        // Accesibilidad menor: Enter activa botones cuando es el foco
        [defaultBtn, customBtn, kbdBtn].forEach(el => {
            el.setAttribute('tabindex', '0');
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    el.click();
                }
            });
        });
    })();

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