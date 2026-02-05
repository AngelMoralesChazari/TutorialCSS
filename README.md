# Tutorial CSS - Gradientes, RGBA/HSLA y Outline

Tutorial interactivo sobre CSS que cubre gradientes lineales, gradientes radiales, colores RGBA/HSLA y la propiedad outline.

## 🚀 Desplegar en Vercel

Este proyecto está configurado para desplegarse fácilmente en Vercel.

### Opción 1: Despliegue desde GitHub (Recomendado)

1. **Sube tu proyecto a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <tu-repositorio-github>
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "New Project"
   - Importa tu repositorio
   - Vercel detectará automáticamente la configuración

3. **Configuración automática:**
   - Vercel usará el archivo `vercel.json` que ya está configurado
   - El script de build se ejecutará automáticamente
   - Tu sitio estará disponible en unos minutos

### Opción 2: Despliegue desde la línea de comandos

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Despliega:**
   ```bash
   vercel
   ```

3. **Sigue las instrucciones** en la terminal

## 📁 Estructura del Proyecto

```
TutorialCSS/
├── CSS/
│   ├── html/          # Archivos HTML
│   ├── css/           # Estilos CSS
│   ├── js/            # Scripts JavaScript
│   └── recursosVisuales/  # Imágenes y recursos
├── build.js           # Script de build para Vercel
├── vercel.json        # Configuración de Vercel
├── package.json       # Configuración del proyecto
└── README.md          # Este archivo
```

## 🔧 Desarrollo Local

Para probar el build localmente:

```bash
npm run build
```

Esto creará una carpeta `dist/` con todos los archivos listos para producción.

## 📝 Notas

- El script `build.js` copia todos los archivos a `dist/` y actualiza las rutas relativas
- Las rutas `../css/`, `../js/` y `../recursosVisuales/` se convierten en `css/`, `js/` y `recursosVisuales/`
- Vercel ejecutará automáticamente el build al desplegar

## ✨ Características

- ✅ Tutorial interactivo de gradientes lineales
- ✅ Tutorial de gradientes radiales
- ✅ Explicación de RGBA y HSLA
- ✅ Guía de la propiedad outline
- ✅ Ejemplos en vivo y editables
- ✅ Diseño responsive

---

💻 Creado por Angel Morales Chazari
