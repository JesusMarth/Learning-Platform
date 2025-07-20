# 🎓 Aprende+

Una aplicación educativa interactiva diseñada para hacer el aprendizaje divertido y accesible. Aprende+ combina minijuegos educativos con un sistema de logros y estadísticas para motivar el aprendizaje continuo.

## ✨ Características

### 🎮 Minijuegos Educativos
- **Matemáticas**: Operaciones básicas, secuencias numéricas y completar resultados
- **Idiomas**: Traducción directa, ordenar letras y opciones múltiples
- **Historia**: Verdadero/Falso, ordenar eventos y opciones múltiples

### 🏆 Sistema de Logros
- Logros desbloqueables por completar minijuegos
- Estadísticas detalladas del progreso
- Sistema de puntos y rachas

### 🌍 Internacionalización
- Soporte completo para español e inglés
- Interfaz adaptativa según el idioma seleccionado

### 🎨 Diseño Moderno
- Interfaz responsive y accesible
- Modo oscuro/claro
- Diseño intuitivo y atractivo

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18 + Vite
- **Routing**: React Router DOM
- **Estilos**: CSS3 + Bootstrap 5
- **Internacionalización**: i18next
- **Estado**: React Context API
- **Iconos**: Bootstrap Icons

## 📦 Opciones de Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/aprende-plus.git
   cd aprende-plus
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Ejecuta el proyecto:**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador en:**
   ```
   http://localhost:5173
   ```

## 🎯 Cómo Jugar

### Registro e Inicio de Sesión
- Crea una cuenta o inicia sesión para guardar tu progreso
- Tu perfil mantendrá todas tus estadísticas y logros

### Explorando los Minijuegos
1. **Navega** por las diferentes categorías desde el menú principal
2. **Selecciona** un minijuego que te interese
3. **Juega** y responde las preguntas correctamente
4. **Gana puntos** y desbloquea logros

### Sistema de Puntos
- Respuestas correctas: +10 puntos
- Respuestas incorrectas: +0 puntos
- Rachas consecutivas otorgan bonificaciones

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Auth/           # Autenticación
│   ├── Games/          # Minijuegos por categoría
│   ├── Layout/         # Componentes de diseño
│   └── Profile/        # Perfil de usuario
├── context/            # Contextos de React
├── pages/              # Páginas principales
├── locales/            # Archivos de traducción
├── assets/             # Recursos estáticos
└── utils/              # Utilidades
```

## 🎨 Personalización

### Temas de Colores
- **Matemáticas**: Verde (#28a745)
- **Idiomas**: Azul (#007bff)
- **Historia**: Púrpura (#6f42c1)

### Modo Oscuro
La aplicación se adapta automáticamente a las preferencias del sistema o puede ser configurada manualmente.

## 🌐 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura el build command: `npm run build`
3. Configura el output directory: `dist`

### Netlify
1. Conecta tu repositorio a Netlify
2. Configura el build command: `npm run build`
3. Configura el publish directory: `dist`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Tu Nombre** - [@tu-usuario](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- Bootstrap por el framework CSS
- React por la librería de interfaz
- i18next por la internacionalización
- Todos los contribuidores que han ayudado con el proyecto

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
