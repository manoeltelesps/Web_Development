// Essa função serve para mostrar o resultado na tela (na div "resultado")
function mostrarResultado(texto) {
  document.getElementById("resultado").innerText = texto;
}


// -----------------------------------------------
// Exercício 1 – Jogo: Adivinhe o número
// -----------------------------------------------
function jogoAdivinhar() {
  // Geramos um número aleatório entre 1 e 20
  var numeroSecreto = Math.floor(Math.random() * 20) + 1;
  var acertou = false;

  // O jogo continua até o usuário acertar
  while (acertou == false) {
    var tentativa = prompt("Adivinhe o número secreto (entre 1 e 20):");

    // Convertemos o que o usuário digitou para número
    tentativa = Number(tentativa);

    if (tentativa < numeroSecreto) {
      alert("Muito baixo! Tente um número maior.");
    } else if (tentativa > numeroSecreto) {
      alert("Muito alto! Tente um número menor.");
    } else {
      acertou = true;
      alert("Parabéns! Você acertou! O número era " + numeroSecreto);
      mostrarResultado("✅ Você acertou! O número secreto era " + numeroSecreto);
    }
  }
}


// -----------------------------------------------
// Exercício 2 – Pedra, Papel ou Tesoura
// -----------------------------------------------
function jogoPedraPapelTesoura() {
  // As opções que o computador pode escolher
  var opcoes = ["pedra", "papel", "tesoura"];

  // O computador escolhe uma opção aleatória
  var indiceAleatorio = Math.floor(Math.random() * 3);
  var escolhaComputador = opcoes[indiceAleatorio];

  // O usuário digita a escolha dele
  var escolhaUsuario = prompt("Digite sua escolha: pedra, papel ou tesoura");

  // Deixa tudo em minúsculo para evitar erros de digitação
  escolhaUsuario = escolhaUsuario.toLowerCase();

  var resultado = "";

  // Verifica se o que o usuário digitou é válido
  if (escolhaUsuario != "pedra" && escolhaUsuario != "papel" && escolhaUsuario != "tesoura") {
    resultado = "Opção inválida! Digite: pedra, papel ou tesoura.";
  } else if (escolhaUsuario == escolhaComputador) {
    resultado = "Empate!\nVocê: " + escolhaUsuario + "\nComputador: " + escolhaComputador;
  } else if (
    (escolhaUsuario == "pedra" && escolhaComputador == "tesoura") ||
    (escolhaUsuario == "papel" && escolhaComputador == "pedra") ||
    (escolhaUsuario == "tesoura" && escolhaComputador == "papel")
  ) {
    resultado = "Você ganhou! 🎉\nVocê: " + escolhaUsuario + "\nComputador: " + escolhaComputador;
  } else {
    resultado = "Você perdeu! 😢\nVocê: " + escolhaUsuario + "\nComputador: " + escolhaComputador;
  }

  mostrarResultado(resultado);
}


// -----------------------------------------------
// Exercício 3 – Tabuada
// -----------------------------------------------
function tabuada() {
  var numero = prompt("Digite um número para ver a tabuada:");
  numero = Number(numero);

  var texto = "Tabuada do " + numero + ":\n\n";

  // O laço for vai de 1 até 10
  for (var i = 1; i <= 10; i++) {
    texto = texto + numero + " x " + i + " = " + (numero * i) + "\n";
  }

  mostrarResultado(texto);
}


// -----------------------------------------------
// Exercício 4 – Triângulo de Asteriscos
// -----------------------------------------------
function triangulo() {
  var linhas = prompt("Quantas linhas terá o triângulo?");
  linhas = Number(linhas);

  var texto = "Triângulo com " + linhas + " linhas:\n\n";

  // O laço externo controla o número de linhas
  for (var i = 1; i <= linhas; i++) {
    var linha = "";

    // O laço interno coloca os asteriscos em cada linha
    for (var j = 1; j <= i; j++) {
      linha = linha + "*";
    }

    texto = texto + linha + "\n";
  }

  mostrarResultado(texto);
}


// -----------------------------------------------
// Exercício 5 – Soma da Série: 1 + 11 + 111 + ...
// -----------------------------------------------
function somaSerie() {
  var n = prompt("Quantos termos da série você quer somar?");
  n = Number(n);

  var soma = 0;
  var termo = 0;
  var serie = "";

  for (var i = 1; i <= n; i++) {
    // Cada termo é o anterior multiplicado por 10 e somado com 1
    // Exemplo: termo 1 = 1, termo 2 = 1*10+1 = 11, termo 3 = 11*10+1 = 111...
    termo = termo * 10 + 1;
    soma = soma + termo;

    // Montamos o texto da série para exibir
    if (i == 1) {
      serie = serie + termo;
    } else {
      serie = serie + " + " + termo;
    }
  }

  mostrarResultado(serie + "\n\nA soma é: " + soma);
}
