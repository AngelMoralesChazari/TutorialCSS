const fs = require('fs');
const path = require('path');

// Crear directorio dist si no existe
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copiar archivos HTML
const htmlDir = path.join(__dirname, 'CSS', 'html');
const htmlFiles = fs.readdirSync(htmlDir);
htmlFiles.forEach(file => {
  if (file.endsWith('.html')) {
    fs.copyFileSync(
      path.join(htmlDir, file),
      path.join(distDir, file)
    );
  }
});

// Copiar CSS
const cssDir = path.join(__dirname, 'CSS', 'css');
const cssDistDir = path.join(distDir, 'css');
if (!fs.existsSync(cssDistDir)) {
  fs.mkdirSync(cssDistDir, { recursive: true });
}
const cssFiles = fs.readdirSync(cssDir);
cssFiles.forEach(file => {
  fs.copyFileSync(
    path.join(cssDir, file),
    path.join(cssDistDir, file)
  );
});

// Copiar JS
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  entries.forEach(entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

const jsDir = path.join(__dirname, 'CSS', 'js');
const jsDistDir = path.join(distDir, 'js');
copyDir(jsDir, jsDistDir);

// Copiar recursos visuales
const recursosDir = path.join(__dirname, 'CSS', 'recursosVisuales');
const recursosDistDir = path.join(distDir, 'recursosVisuales');
copyDir(recursosDir, recursosDistDir);

// Actualizar rutas en archivos HTML
const htmlFilesInDist = fs.readdirSync(distDir).filter(f => f.endsWith('.html'));
htmlFilesInDist.forEach(file => {
  const filePath = path.join(distDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  // Cambiar ../css a css, ../js a js, ../recursosVisuales a recursosVisuales
  content = content.replace(/\.\.\/css\//g, 'css/');
  content = content.replace(/\.\.\/js\//g, 'js/');
  content = content.replace(/\.\.\/recursosVisuales\//g, 'recursosVisuales/');
  fs.writeFileSync(filePath, content, 'utf8');
});

// Copiar robots.txt y sitemap.xml si existen en la raíz
const robotsPath = path.join(__dirname, 'robots.txt');
const sitemapPath = path.join(__dirname, 'sitemap.xml');
if (fs.existsSync(robotsPath)) {
  fs.copyFileSync(robotsPath, path.join(distDir, 'robots.txt'));
}
if (fs.existsSync(sitemapPath)) {
  fs.copyFileSync(sitemapPath, path.join(distDir, 'sitemap.xml'));
}

console.log('✅ Build completado! Los archivos están listos en la carpeta dist/');
