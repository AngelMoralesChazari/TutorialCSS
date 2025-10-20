// Playground dinámico para Gradiente Lineal
document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('css-editor');
  const preview = document.getElementById('preview-box');
  const exampleBtns = document.querySelectorAll('.btn-play');
  const resetBtn = document.querySelector('.btn-reset');

  if (!editor || !preview) return;

  const aplicarEstilo = () => {
    preview.style = editor.value;
    preview.classList.add('highlight');
    setTimeout(() => preview.classList.remove('highlight'), 500);
  };

  editor.addEventListener('input', aplicarEstilo);

  exampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const example = btn.dataset.example;
      editor.value = `background: linear-gradient(${example});`;
      aplicarEstilo();
    });
  });

  resetBtn.addEventListener('click', () => {
    editor.value = `background: linear-gradient(to right, #ff6a00, #ffaa00);`;
    aplicarEstilo();
  });

  aplicarEstilo();
});