/*
Dado un número N crea los N escalones de una grada con  el símbolo '#'
N = 3
#
##
###
*/
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question('Ingrese N: ', (n) => {
  if(!isNaN(n)){
    console.log('ERROR: ingrese un número válido...');
    process.exit(1)
  }
  n = Number(n)
  
})
