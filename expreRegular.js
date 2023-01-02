let cadenas = ['Buenos Aires','unica','juancarlos@gmail.es','conocedor','Copa rota','convencido','$134.43','camiones','JC21','alfredo@hotmail.com','comicionado','google','PO98','renata@gmail.com','$9823.21','Río Mamore','$176.67','Av. Palacios','Calle Rocabado','Puerto Acosta','BY67','Av. San Marcos','$8762.00','#@!><&<//>','=?)(&','RR77','$3300.99','Puente Carlona del Norte','Nueva York','Av. Nueva Generación','joelgarcia@gmail.com','IU12','*&$>?#!{-?<','Edif. Ferrondo','Calle 19','romanfer@usomin.gob.bo','OO90','FTM s.r.l.','$1900867','0x8975fba342a421abf45c127','Reus','Condominio #9879','Asturia','ercer@hotmail.com','cmendez@outlook.com','Leaños Robles','José Alberto', '$()>$<)&9%>-.¡¿','faock.reaul@outlook.com','Puente Sevilla','$786.90','GT55','PR98','PI31','OPPO','Leaños'];

// Mismos ejercicios con expresiones regulares
//NIVEL 1
console.log("\t\tExpresiones regulares");
console.log("\tNIVEL I");
console.log("2. Mostrar Palabras que no contengan caracteres especiales");

//EXPRESION REGULAR
let expr = /@+|\&+|\%+|\?+|\<+|\>+|\$+|\#+|\!+|\¡+\++/;
cadenas.forEach( x =>{
   if(!expr.test(x)){
      console.log("* ",x);
   }
});


console.log("\n3. Encontrar palabras que contengan números");
//Expresion regular
expr = /\d/;
cadenas.forEach(x => {
   if(expr.test(x)){
      console.log("* ",x);
   }
});

