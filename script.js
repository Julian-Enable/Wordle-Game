// Definición del array de letras de la palabra en mayúsculas
let word = "";  // Dejamos la palabra en blanco inicialmente
let wordArray = []; // Array para almacenar las letras de la palabra
let resultElement = document.querySelector(".result");
let mainContainer = document.querySelector(".main-container");
let rowId = 1;
let attemptsElement = document.getElementById("attempts");
let wordLengthElement = document.getElementById("wordLength");

// Seleccionar el contenedor donde se agregarán los inputs
let actualRow = document.querySelector(".row");

// Inicializar estadísticas con estado de carga
updateStats("...", 0);

// Llamada a la función para obtener la palabra aleatoria
getRandomWord();

// Función para actualizar las estadísticas de manera segura
function updateStats(length, attempts) {
  if (wordLengthElement) {
    wordLengthElement.textContent = length || "-";
  }
  if (attemptsElement) {
    attemptsElement.textContent = attempts || "0";
  }
  
  // Agregar clase de carga si es necesario
  if (length === "..." && wordLengthElement) {
    wordLengthElement.classList.add("loading");
  } else if (wordLengthElement) {
    wordLengthElement.classList.remove("loading");
  }
}

function getRandomWord() {
  // Generar una longitud aleatoria entre 4 y 8 letras
  const randomLength = Math.floor(Math.random() * 5) + 4; // 4, 5, 6, 7, u 8
  
  // Usar una API más confiable para palabras en español
  const randomWordAPIUrl = `https://api.datamuse.com/words?sp=${'?'.repeat(randomLength)}&lang=es&max=50`;

  fetch(randomWordAPIUrl)
    .then(response => response.json())
    .then(data => {
      // Filtrar palabras válidas
      const validWords = data.filter(item => isValidWord(item.word));
      
      if (validWords.length > 0) {
        // Seleccionar una palabra aleatoria de las válidas
        const randomIndex = Math.floor(Math.random() * validWords.length);
        word = validWords[randomIndex].word;
        wordArray = word.toUpperCase().split('');
        console.log("Palabra aleatoria:", word);
        console.log("Longitud:", word.length);
        console.log("Array de letras:", wordArray);
        
        // Actualizar estadísticas inmediatamente
        updateStats(word.length, 0);
        
        drawSquares(actualRow);
        listenInput(actualRow);
        addFocus(actualRow);
      } else {
        // Si no hay palabras válidas, intentar con otra API
        console.log("No se encontraron palabras válidas, intentando con API alternativa...");
        getRandomWordAlternative();
      }
    })
    .catch(error => {
      console.error("Error al obtener la palabra aleatoria:", error);
      // Intentar con API alternativa
      getRandomWordAlternative();
    });
}

// Función alternativa para obtener palabras
function getRandomWordAlternative() {
  const randomLength = Math.floor(Math.random() * 5) + 4;
  
  // API alternativa más simple
  const alternativeAPIUrl = `https://random-word-api.herokuapp.com/word?lang=es&length=${randomLength}`;
  
  fetch(alternativeAPIUrl)
    .then(response => response.json())
    .then(data => {
      let potentialWord = data[0];
      
      if (isValidWord(potentialWord)) {
        word = potentialWord;
        wordArray = word.toUpperCase().split('');
        console.log("Palabra aleatoria (API alternativa):", word);
        console.log("Longitud:", word.length);
        console.log("Array de letras:", wordArray);
        
        updateStats(word.length, 0);
        
        drawSquares(actualRow);
        listenInput(actualRow);
        addFocus(actualRow);
      } else {
        // Si la palabra no es válida, usar palabra de respaldo
        console.log("Palabra no válida, usando respaldo...");
        useBackupWord();
      }
    })
    .catch(error => {
      console.error("Error con API alternativa:", error);
      useBackupWord();
    });
}

// Función para usar palabra de respaldo
function useBackupWord() {
  word = getBackupWord();
  wordArray = word.toUpperCase().split('');
  console.log("Usando palabra de respaldo:", word);
  
  updateStats(word.length, 0);
  
  drawSquares(actualRow);
  listenInput(actualRow);
  addFocus(actualRow);
}

// Función para validar que la palabra sea correcta
function isValidWord(word) {
  // Verificar que tenga entre 4 y 8 letras
  if (word.length < 4 || word.length > 8) return false;
  
  // Verificar que solo contenga letras (sin espacios, números o caracteres especiales)
  const letterRegex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ]+$/;
  if (!letterRegex.test(word)) return false;
  
  // Verificar que no contenga espacios
  if (word.includes(' ')) return false;
  
  return true;
}

// Función para obtener una palabra de respaldo aleatoria
function getBackupWord() {
  const backupWords = [
    // Palabras de 4 letras
    "casa", "perro", "gato", "libro", "mesa", "agua", "fuego", "tierra", "aire", "sol", "luna", "mar", "río",
    // Palabras de 5 letras
    "silla", "puerta", "ventana", "coche", "árbol", "flor", "estrella", "calle", "camino", "puente", "torre",
    // Palabras de 6 letras
    "castillo", "palacio", "iglesia", "escuela", "tienda", "mercado", "hotel", "banco", "oficina", "fábrica", "granja",
    // Palabras de 7 letras
    "jardín", "parque", "bosque", "desierto", "playa", "isla", "valle", "colina",
    // Palabras de 8 letras
    "montaña", "ciudad", "pueblo", "península", "acantilado", "restaurante", "hospital"
  ];
  
  // Filtrar solo palabras de 4 a 8 letras
  const validWords = backupWords.filter(word => word.length >= 4 && word.length <= 8);
  
  // Seleccionar una palabra aleatoria
  const randomIndex = Math.floor(Math.random() * validWords.length);
  return validWords[randomIndex];
}

function listenInput(actualRow) {
  // Seleccionar todos los inputs y convertirlos en un array
  let squares = actualRow.querySelectorAll(".square");
  squares = [...squares];

  // Array para almacenar las letras ingresadas por el usuario
  let userInput = [];

  // Agregar un evento de escucha para cada input
  squares.forEach((element, index) => {
    element.addEventListener("input", (event) => {
      //Si no he borrado 
      if (event.inputType !== "deleteContentBackward") {
        // Almacenar la letra ingresada por el usuario en mayúsculas
        userInput.push(event.target.value.toUpperCase());
        console.log(userInput);

        // Cambiar el enfoque al siguiente input si existe
        if (event.target.nextElementSibling) {
          event.target.nextElementSibling.focus();
        } else {
          //crear arreglo con las letras llenas

          let squareFilled = actualRow.querySelectorAll('.square');
          squareFilled = [...squareFilled]
          let finalUserInput = [];
          squareFilled.forEach(element => {
            finalUserInput.push(element.value.toUpperCase()) 
          })

          // Comparar las letras ingresadas con las letras de la palabra original
          let result = checkWord(wordArray, finalUserInput);
          console.log("Resultado:", result);

          // Aplicar colores según el resultado
          result.forEach((status, index) => {
            if (status === 'correct') {
              squares[index].classList.add("green");
            } else if (status === 'exists') {
              squares[index].classList.add("gold");
            }
          });

          // Verificar si ganó
          if (result.every(status => status === 'correct')) {
            showResult("Ganaste");
            return;
          }

                     // Actualizar contador de intentos
           updateStats(word.length, rowId);
           
           //crear una nueva fila
           let newRow = createRow();
           if (!newRow) {
             return;
           }
           drawSquares(newRow);
           listenInput(newRow);
           addFocus(newRow);
        }
      }else{
        userInput.pop();
        console.log(userInput);
      }
    });
  });
}

//FUNCIONES

// Nueva función que maneja correctamente la lógica de colores
function checkWord(targetWord, guess) {
  const result = new Array(guess.length).fill('wrong');
  const targetCount = {};
  const guessCount = {};
  
  // Contar letras en la palabra objetivo
  targetWord.forEach(letter => {
    targetCount[letter] = (targetCount[letter] || 0) + 1;
  });
  
  // Contar letras en el intento
  guess.forEach(letter => {
    guessCount[letter] = (guessCount[letter] || 0) + 1;
  });
  
  // Primero marcar las letras correctas (verde)
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === targetWord[i]) {
      result[i] = 'correct';
      targetCount[guess[i]]--;
      guessCount[guess[i]]--;
    }
  }
  
  // Luego marcar las letras que existen pero están en posición incorrecta (dorado)
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === 'wrong' && targetCount[guess[i]] > 0) {
      result[i] = 'exists';
      targetCount[guess[i]]--;
    }
  }
  
  return result;
}

function createRow() {
  rowId++;
  if (rowId <= 5) {
    let newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.setAttribute("id", rowId);
    mainContainer.appendChild(newRow); // Corrección aquí
    return newRow;
  } else {
    showResult(
      `Intenta de nuevo, la respuesta correcta era: "${word.toUpperCase()}"`
    );
  }
}

function drawSquares(actualRow) {
  // Crear los inputs para cada letra en el array
  wordArray.forEach((item, index) => {
    if (index === 0) {
      actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">`;
    } else {
      actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`;
    }
  });
}

function addFocus(actualRow) {
  let focusElement = actualRow.querySelector(".focus");
  console.log(focusElement); // Corrección aquí
  focusElement.focus();
}

function showResult(textMsg) {
  let resultClass = textMsg.includes("Ganaste") ? "victory" : "defeat";
  resultElement.innerHTML = `
    <div class="result-content ${resultClass}">
      <p>${textMsg}</p>
      <button class="button">Jugar de nuevo</button>
    </div>
  `;

  let resetBtn = document.querySelector(".button");
  resetBtn.addEventListener("click", () => {
    location.reload();
  });
}
