// js/nav.js
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.site-nav a');
  const here = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('badge');
  });
});