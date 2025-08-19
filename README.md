# 🎯 Wordle Game - Español

Un juego de Wordle completamente funcional en español con diseño moderno y modo nocturno.

## 🌐 **Jugar Ahora**

**🎮 [Jugar Wordle en Español](https://wordlegam3.netlify.app/)**

¡Accede directamente al juego desde cualquier dispositivo!

## ✨ Características

- **🎨 Diseño Nocturno**: Interfaz elegante con tema oscuro y efectos visuales
- **📱 Responsive**: Optimizado para dispositivos móviles y desktop
- **🎲 Palabras Aleatorias**: Longitud variable entre 4-8 letras
- **🌍 API Múltiple**: Sistema de respaldo con múltiples APIs para palabras en español
- **🎯 Lógica Precisa**: Colores correctos para letras en posición correcta (verde) y letras que existen pero están mal posicionadas (dorado)
- **📊 Estadísticas**: Contador de intentos y longitud de palabra
- **🎉 Animaciones**: Efectos visuales suaves y atractivos

## 🚀 Cómo Jugar

1. **Abre el juego**: Abre `index.html` en tu navegador
2. **Lee las estadísticas**: Observa la longitud de la palabra a adivinar
3. **Escribe letras**: Ingresa una letra por casilla
4. **Interpreta los colores**:
   - 🟢 **Verde**: Letra en posición correcta
   - 🟡 **Dorado**: Letra existe pero en posición incorrecta
   - ⚪ **Gris**: Letra no está en la palabra
5. **Tienes 5 intentos** para adivinar la palabra

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con variables CSS, gradientes y animaciones
- **JavaScript**: Lógica del juego y manejo de APIs
- **APIs**: Datamuse y Random Word API para palabras en español

## 📁 Estructura del Proyecto

```
Wordle-Game/
├── index.html          # Página principal
├── styles.css          # Estilos y animaciones
├── script.js           # Lógica del juego
├── README.md           # Documentación
└── Spinner-0.3s-291px.gif  # Imagen de carga
```

## 🎨 Características del Diseño

- **Modo Nocturno**: Fondo degradado azul-púrpura con estrellas animadas
- **Glassmorphism**: Efecto de cristal en el contenedor principal
- **Animaciones**: Transiciones suaves y efectos de hover
- **Tipografía**: Fuente Inter para mejor legibilidad
- **Colores**: Paleta profesional con verde esmeralda y dorado

## 🔧 Funcionalidades Técnicas

- **Validación de Palabras**: Filtrado de palabras válidas en español
- **Sistema de Respaldo**: Palabras locales si las APIs fallan
- **Manejo de Errores**: Recuperación automática de errores de red
- **Responsive Design**: Adaptación automática a diferentes pantallas
- **Accesibilidad**: Navegación por teclado y focus management

## 🌐 APIs Utilizadas

1. **Datamuse API**: Palabras en español con patrones específicos
2. **Random Word API**: API de respaldo para palabras aleatorias
3. **Sistema Local**: Lista de palabras comunes en español como último recurso

## 🎯 Lógica del Juego

La función `checkWord()` implementa la lógica exacta de Wordle:
- **Primera pasada**: Marca letras en posición correcta (verde)
- **Segunda pasada**: Marca letras que existen pero están mal posicionadas (dorado)
- **Conteo preciso**: Maneja correctamente letras repetidas

## 📱 Compatibilidad

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móviles

## 🚀 Instalación

### Opción 1: Jugar Online
**🎮 [Jugar directamente aquí](https://wordlegam3.netlify.app/)**

### Opción 2: Instalación Local
1. Clona el repositorio:
```bash
git clone https://github.com/Julian-Enable/Wordle-Game
cd Wordle-Game
```

2. Abre `index.html` en tu navegador

O ejecuta un servidor local:
```bash
python -m http.server 8000
# Luego ve a http://localhost:8000
```

## 🎮 Cómo Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**DonDev** - Desarrollador del juego Wordle en español

## 🌐 Enlaces

- **🎮 [Jugar Online](https://wordlegam3.netlify.app/)**
- **📁 [Repositorio GitHub](https://github.com/Julian-Enable/Wordle-Game)**

---

¡Disfruta jugando Wordle en español! 🎯✨
