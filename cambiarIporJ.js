/*
  Cambia el i-ésimo digito de un número por el j-ésimo digito 
*/
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


readline.question('Digite NUMERO Pos-I Pos-J\nEjemplo:\n172528 2 4\n',
  (inp) => {
    let valores = inp.split(' ').map(x => parseInt(x))
    const lon = parseInt(Math.log10(valores[0]) + 1)
    const n = valores[0]
    const i = valores[1]
    const j = valores[2]
    const digitoI = parseInt(n / Math.pow(10, lon - i)) % 10
    const digitoJ = parseInt(n / Math.pow(10, lon - j)) % 10

    let nuevo = (parseInt(n / Math.pow(10, lon - i)) - digitoI + digitoJ) * Math.pow(10, lon - i) + (n % Math.pow(10, lon - i))
    nuevo = (parseInt(nuevo / Math.pow(10, lon - j)) - digitoJ + digitoI) * Math.pow(10, lon - j) + (nuevo % Math.pow(10, lon - j))
    console.log(`Cambiamos el digito ${digitoI} por el digito ${digitoJ}`)
    console.log(`Original:\t ${n}`)
    console.log(`Cambiado:\t ${nuevo}`)
    readline.close()
    // cerramos la entrada de teclado
  })


