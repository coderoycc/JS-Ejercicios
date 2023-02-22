function esPalindromo(cad){
   let nuevo = cad.split('').reverse().join('')
   if(cad == nuevo){
      console.log('Es palindromo')
   }else{
      console.log('No es palindromo')
   }
}

esPalindromo('oruro')
esPalindromo('betto')
esPalindromo('anitalavalatina')
esPalindromo('ese es el error')
