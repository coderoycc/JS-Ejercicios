/*
  Cambia el i-ésimo digito de un número por el j-ésimo digito 
*/
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


const n = readline.question('Digite NUMERO DIGITO-I DIGITO-J\nEJ:\n172528 2 4', 
(inp)=> {
  console.log(inp.split(' '))
  readline.close()
})

console.log(n)