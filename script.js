let word = 'texto';
let wordArray = word.split('');
console.log(wordArray);

let actualRow = document.querySelector('.row');

wordArray.forEach((item) => {
    actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`;
});

let squares = document.querySelectorAll('.square');
squares = [...squares];

squares.forEach(element => {
    element.addEventListener('input', () => {
        console.log('se hizo click')
    });
});