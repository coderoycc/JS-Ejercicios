/*
  Cambia el i-ésimo digito de un número por el j-ésimo digito 
*/
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


readline.question('Digite NUMERO DIGITO-I DIGITO-J\nEJ:\n172528 2 4\n', 
(inp)=> {
  let valores = inp.split(' ').map(x => parseInt(x))
  const lon = parseInt(Math.log10(valores[0])+1)
  
  readline.close()
})


