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

    // === Sección 5: Mini‑Lab - Modos de foco en tiempo real ===
    (function setupA11yLiveModes() {
        const btnDefault = document.getElementById('a11y-default');
        const btnCustom = document.getElementById('a11y-custom');
        const btnKbd = document.getElementById('a11y-kbd');
        const input = document.getElementById('a11y-input');

        if (!btnDefault || !btnCustom || !btnKbd || !input) return;

        // Marca visual del botón activo
        const buttons = [btnDefault, btnCustom, btnKbd];
        buttons.forEach(b => b.classList.add('lab-mode-btn'));

        function setActiveButton(active) {
            buttons.forEach(b => b.classList.toggle('active', b === active));
        }

        // Limpia clases de modo en un elemento
        function clearModes(el) {
            el.classList.remove('focus-ring', 'kbd-ring', 'focus-none');
        }

        // Aplica un modo a un conjunto de elementos interactivos del lab
        function applyMode(mode) {
            // El lab afecta a los tres botones + el input del lab:
            const targets = [btnDefault, btnCustom, btnKbd, input];
            targets.forEach(t => {
                clearModes(t);
                t.classList.add(mode);
            });
        }

        // Forzar a que se “vea” el estado inmediatamente
        function previewFocus(el) {
            // Quita el foco actual y vuelve a enfocarlo para refrescar estilos
            el.blur();
            requestAnimationFrame(() => el.focus());
        }

        // Modo: Default (estilo del navegador)
        btnDefault.addEventListener('click', () => {
            applyMode('focus-none');
            setActiveButton(btnDefault);
            previewFocus(input);
        });

        // Modo: Personalizado (focus-ring visible en focus/focus-visible)
        btnCustom.addEventListener('click', () => {
            applyMode('focus-ring');
            setActiveButton(btnCustom);
            previewFocus(input);
        });

        // Modo: Solo teclado (usa :focus-visible)
        btnKbd.addEventListener('click', () => {
            applyMode('kbd-ring');
            setActiveButton(btnKbd);

            // Para demostrar focus-visible: si haces click no se verá, con Tab sí.
            // Previsualizamos con teclado simulando un enfoque sin mouse:
            previewFocus(input);
        });

        // Estado inicial: personalizado
        btnCustom.click();
    })();

    // === Sección 6 (Outline): Práctica con panel de código + preview ===
    // === PRACTICA OUTLINE ===
    (function () {
        const ta = document.getElementById('outline-css-practice-editor');
        const preview = document.querySelector('#outline-practice-preview .mi-outline');
        const btnApply = document.getElementById('outline-apply-css-btn');
        const btnReset = document.getElementById('outline-reset-practice-btn');

        const DEFAULT_CSS = `.mi-outline {
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.06);
  border-radius: 12px;

  /* Ajusta aquí tu práctica */
  border: 2px solid #59e0d6;
  outline: 8px solid #ff7b86;
  outline-offset: 12px;

  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
}`;

        function applyUserCSS() {
            if (!preview || !ta) return;

            // Garantiza un contenedor único para scoping y más especificidad
            const scope = document.getElementById('outline-practice-preview');

            // Crea o reutiliza el <style> y colócalo al final del <head>
            let styleEl = document.getElementById('outline-practice-style');
            if (!styleEl) {
                styleEl = document.createElement('style');
                styleEl.id = 'outline-practice-style';
                document.head.appendChild(styleEl);
            } else {
                // Re-append para dejarlo al final del head y ganar precedencia
                document.head.appendChild(styleEl);
            }

            // Aumenta especificidad y scopea las reglas del usuario al preview
            // 1) parse simple: si el usuario pega ".mi-outline { ... }",
            // la convertimos a "#outline-practice-preview .mi-outline { ... }"
            const raw = ta.value;
            const scoped = raw.replace(/(^|\s)\.mi-outline\s*(?=\{)/g, ' #outline-practice-preview .mi-outline');

            // 2) Añade !important a propiedades conflictivas de outline/border para asegurar override
            const boosted = scoped.replace(/(outline(?:-offset|-width|-color)?\s*:\s*[^;]+;)/g, (m) => {
                return m.includes('!important') ? m : m.replace(/;$/, ' !important;');
            }).replace(/(border(?:-width|-color|-style)?\s*:\s*[^;]+;)/g, (m) => {
                return m.includes('!important') ? m : m.replace(/;$/, ' !important;');
            });

            styleEl.textContent = boosted;

            // Accesibilidad
            preview.setAttribute('tabindex', '0');
        }

        function resetCSS() {
            if (!ta) return;
            ta.value = DEFAULT_CSS;
            applyUserCSS();
        }

        if (btnApply) btnApply.addEventListener('click', applyUserCSS);
        if (btnReset) btnReset.addEventListener('click', resetCSS);

        if (ta) {
            ta.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'enter') {
                    e.preventDefault();
                    applyUserCSS();
                }
            });
        }

        // Primera carga
        applyUserCSS();
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