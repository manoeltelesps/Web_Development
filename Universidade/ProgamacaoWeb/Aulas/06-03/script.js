alert("Olá, seja bem-vindo à aula de JavaScript!")
console.log("Esta mensagem é exibida no console do navegador.")

// Algoritmo

var nome = window.prompt("Digite seu nome:")
console.log("Olá, " + nome + "! Seja bem-vindo à aula de JavaScript!")

// Template Literal

console.log(`Olá, ${nome}! Seja bem-vindo à aula de JavaScript!`)

//Operadores de comparação
console.log(5 == '5')
console.log(5 === '5')

// Soma de dois numeros

var num1 = window.prompt("Digite o primeiro número:")
var num2 = window.prompt("Digite o segundo número:")

var soma = Number(num1) + Number(num2)
console.log(`A soma dos números é: ${soma}`)

// Condicional
 var idade = 18

 if (idade >= 18) {
    console.log("Você é maior de idade.")
 } else {
    console.log("Você é menor de idade.")
 }