const btn = document.getElementById('btn');
const caixa = document.getElementById('caixa');
const btn2 = document.getElementById('btn2');
const mensagem = document.getElementById('mensagem');


btn.onclick = function() {
    btn.style.backgroundColor = 'blue';
    mensagem.textContent = 'Botao foi clicado!';
};

btn.onclick = function() {
    btn.style.backgroundColor = 'red';
    mensagem.textContent = 'Botao foi clicado novamente!';
}

caixa.onmouseover = function() {
  caixa.style.backgroundColor = 'orange';
  mensagem.textContent = 'Mouse entrou na caixa!';
};

caixa.onmouseout = function() {
  caixa.style.backgroundColor = 'lightblue';
  mensagem.textContent = 'Mouse saiu da caixa.';
};

btn2.ondblclick = function() {
  btn2.style.backgroundColor = 'green';
  mensagem.textContent = 'Botao foi clicado 2 vezes!';
}

// Teclado

const input = document.getElementById('input');
const output = document.getElementById('output');

input.onkeydown = function(event) {
    if (event.key === 'Enter') {
        output.textContent = input.value;

        input.value = '';
    }

    mensagem.textContent = `Tecla pressionada: ${event.key}`;
}

//Eventos com AddEventListener

let btn3 = document.getElementById('btn3');
let mensagem1 = document.getElementById('mensagem1');
let mensagem2 = document.getElementById('mensagem2');

btn3.addEventListener('click', function() {
    mensagem1.textContent = 'Evento de clique com AddEventListener!';
});

btn3.addEventListener('click', function() {
    mensagem2.textContent = 'Outro evento de clique com AddEventListener!';
});

// Drag and Drop

const itens = document.querySelectorAll('.drag-item');
const zonaDrop = document.getElementById('zona-drop');
const mensagemDrag = document.getElementById('mensagem-drag');

let itemArrastado = null;

itens.forEach(function(item) {
    item.addEventListener('dragstart', function(event) {
        itemArrastado = item;
        item.classList.add('arrastando');
        mensagemDrag.textContent = `Arrastando: ${item.textContent}`;
    });

    item.addEventListener('dragend', function() {
        item.classList.remove('arrastando');
        itemArrastado = null;
    });
});

zonaDrop.addEventListener('dragover', function(event) {
    event.preventDefault(); // necessário para permitir o drop
    zonaDP.classList.add('sobre');
});

zonaDP.addEventListener('dragleave', function() {
    zonaDP.classList.remove('sobre');
});

zonaDP.addEventListener('drop', function(event) {
    event.preventDefault();
    zonaDP.classList.remove('sobre');
    if (itemArrastado) {
        zonaDP.textContent = '';
        zonaDP.appendChild(itemArrastado);
        mensagemDrag.textContent = `${itemArrastado.textContent} foi solto na zona!`;
    }
});