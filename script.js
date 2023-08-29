// Definición del array de letras de la palabra en mayúsculas
let word = "texto";
let resultElement = document.querySelector(".result");
let wordArray = word.toUpperCase().split("");
let mainContainer = document.querySelector(".main-container");
let rowId = 1;
console.log(wordArray);

// Seleccionar el contenedor donde se agregarán los inputs
let actualRow = document.querySelector(".row");

drawSquares(actualRow);
listenInput(actualRow);

// Enfocar en el primer input
addFocus(actualRow)

function listenInput(actualRow) {
    // Seleccionar todos los inputs y convertirlos en un array
    let squares = actualRow.querySelectorAll(".square");
    squares = [...squares];

    // Array para almacenar las letras ingresadas por el usuario
    let userInput = [];

    // Agregar un evento de escucha para cada input
    squares.forEach((element, index) => {
        element.addEventListener("input", (event) => {
        // Almacenar la letra ingresada por el usuario en mayúsculas
        userInput.push(event.target.value.toUpperCase());
        console.log(userInput);

        // Cambiar el enfoque al siguiente input si existe
        if (event.target.nextElementSibling) {
            event.target.nextElementSibling.focus();
        } else {
            // Comparar las letras ingresadas con las letras de la palabra original
            let rightIndex = compareArrays(wordArray, userInput);
            console.log(rightIndex);

            // Resaltar los inputs correctos en verde
            rightIndex.forEach((element) => {
            squares[element].classList.add("green");
            });

            // si los arreglos son iguales
            if (rightIndex.length == wordArray.length) {
            resultElement.innerHTML = `<p>Ganaste!</p>
                    <button class="button">Reiniciar</button>`;
                    let resetBtn = document.querySelector('.button')
                    resetBtn.addEventListener('click', () =>{
                        location.reload();
                    }); 
                    return;
            }
            //cambiar estilos si existe la letra pero no esta en la posicion correcta
            let existIndexArray = existLetter(wordArray, userInput);
            existIndexArray.forEach((element) => {
            squares[element].classList.add("gold");
            });

            //crear una nueva fila
            let actualRow = createRow()
            drawSquares(actualRow)
            listenInput(actualRow)
            addFocus(actualRow)

        }
        });
    });
    }

//FUNCIONES

// Función para comparar las letras ingresadas por el usuario con las de la palabra original
function compareArrays(array1, array2) {
  let equalsIndex = [];
  array1.forEach((element, index) => {
    if (element === array2[index]) {
      console.log(`en la posicion ${index} si son iguales`);
      equalsIndex.push(index);
    } else {
      console.log(`en la posicion ${index} no son iguales`);
    }
  });
  return equalsIndex;
}

function existLetter(array1, array2) {
  let existIndexArray = [];
  array2.forEach((element, index) => {
    if (array1.includes(element)) {
      existIndexArray.push(index);
    }
  });
  return existIndexArray;
}
function createRow() {
  rowId++;
  if (rowId <= 5) { 
    let newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.setAttribute("id", rowId);
    ainContainer.appendChild(newRow);
    return newRow;
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

function addFocus(actualRow){
    let focusElement = actualRow.querySelector(".focus");
    console.log("focusElement");
    focusElement.focus();
}