// JS para página Gradiente Lineal
document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.lesson-list li');
  const content = document.getElementById('lesson-content');

  // Contenido de cada sección del temario
  const secciones = {
    1: `
      <h2>1️⃣ ¿Qué es un Gradiente Lineal?</h2>
      <div class="dual-layout">
        <div class="text-content">
          <p>
            Un <strong>gradiente lineal</strong> genera una transición suave entre dos o más colores a lo largo de una línea recta. 
            Es ideal para crear fondos elegantes y transiciones suaves entre tonos.
          </p>
          <p><b>Sintaxis básica:</b></p>
          <pre><code>background: linear-gradient(to right, red, blue);</code></pre>
          <p>
            En este ejemplo el color <span style="color:red;">rojo</span> comienza a la izquierda y se convierte gradualmente en 
            <span style="color:skyblue;">azul</span> a la derecha.
          </p>
        </div>
        <div class="demo" style="height:180px; border-radius:10px; background:linear-gradient(to right, red, blue);"></div>
      </div>
    `,

    2: `
      <h2>2️⃣ Direcciones y Ángulos</h2>
      <div class="dual-layout">
        <div class="text-content">
          <p>
            Puedes controlar la dirección del gradiente mediante palabras clave o ángulos en grados.
          </p>
          <pre><code>background: linear-gradient(45deg, #38bdf8, #818cf8);</code></pre>
          <p>En este ejemplo, el gradiente corre en un ángulo de <b>45 grados</b>.</p>
        </div>
        <div class="demo" style="height:180px; border-radius:10px; background:linear-gradient(45deg, #38bdf8, #818cf8);"></div>
      </div>
    `,

    3: `
      <h2>3️⃣ Múltiples Colores y Stops</h2>
      <div class="dual-layout">
        <div class="text-content">
          <p>
            Puedes usar tres o más colores en un gradiente lineal, indicando qué parte ocupará cada uno.
          </p>
          <pre><code>background: linear-gradient(to right, #ff512f 0%, #ff9966 50%, #38bdf8 100%);</code></pre>
          <p>En este ejemplo se mezclan tonos cálidos y fríos en una transición suave.</p>
        </div>
        <div class="demo" style="height:180px; border-radius:10px; background:linear-gradient(to right, #ff512f, #ff9966, #38bdf8);"></div>
      </div>
    `,

    4: `
      <h2>4️⃣ Uso Creativo</h2>
      <div class="dual-layout">
        <div class="text-content">
          <p>
            Los gradientes lineales también pueden aplicarse con transparencia o para elementos como botones, bordes y texto.
          </p>
          <pre><code>background: linear-gradient(90deg, rgba(255,105,180,0.8), rgba(0,191,255,0.8));</code></pre>
          <p>En este ejemplo, los colores tienen transparencia (alfa) para lograr un efecto más suave.</p>
        </div>
        <div class="demo" style="height:180px; border-radius:10px; background:linear-gradient(90deg, rgba(255,105,180,0.8), rgba(0,191,255,0.8));"></div>
      </div>
    `
  };

  // Manejo de clics en el temario
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const num = item.dataset.lesson;
      content.innerHTML = secciones[num] || '<p>Contenido no disponible.</p>';
    });
  });

  // Cargar primer tema por defecto
  content.innerHTML = secciones[1];
});