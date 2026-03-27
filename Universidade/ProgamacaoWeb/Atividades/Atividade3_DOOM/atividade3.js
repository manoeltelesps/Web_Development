//MARK: - Questao 1

const btnContador = document.getElementById('contador');
const btnRedutor = document.getElementById('redutor');
const clickCounts = document.getElementById('clickCounts');

let contador = 0;

btnContador.addEventListener('click', function() {
    contador++;
    clickCounts.textContent = `${contador}`;
});

btnRedutor.addEventListener('click', function() {
    if (contador === 0) {
        alert('O contador não pode ser negativo!');
    } else {
        contador--;
        clickCounts.textContent = `${contador}`;
    }
});

clickCounts.textContent = `${contador}`;

//MARK: - Questao 2

const inputText = document.getElementById('inputText');
const displayButton = document.getElementById('displayButton');
const displayText = document.getElementById('displayText');

function exibirTexto() {
    if (inputText.value.trim() === '') return;

    const novoItem = document.createElement('p');
    novoItem.textContent = inputText.value;
    displayText.appendChild(novoItem);
    inputText.value = '';
}

displayButton.addEventListener('click', exibirTexto);

inputText.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        exibirTexto();
    }
});

//MARK: - Questao 3
const inputNumber = document.getElementById('charInput');

inputNumber.addEventListener('input', function() {
    const charCount = inputNumber.value.replaceAll(' ', '').length;
    document.getElementById('charCount').textContent = `${charCount}`;
});

//MARK: - Questao 4

const itemInput = document.getElementById('itemInput');
const listType = document.getElementById('listType');
const addItemBtn = document.getElementById('addItemBtn');
const listContainer = document.getElementById('listContainer');

let currentList = null;
let currentType = null;

addItemBtn.addEventListener('click', function() {
    if (itemInput.value.trim() === '') return;

    const selectedType = listType.value;

    if (currentList === null || currentType !== selectedType) {
        currentList = document.createElement(selectedType);
        currentType = selectedType;
        listContainer.appendChild(currentList);
    }

    const item = document.createElement('li');
    item.textContent = itemInput.value;
    currentList.appendChild(item);
    itemInput.value = '';
});

//MARK: - Questao 5

document.getElementById('resetBtn').addEventListener('click', function() {
    contador = 0;
    clickCounts.textContent = `${contador}`;

    displayText.innerHTML = '';

    listContainer.innerHTML = '';
    currentList = null;
    currentType = null;
});

