let cadenas = ['Buenos Aires','unica','juancarlos@gmail.es','conocedor','Copa rota','convencido','$134.43','camiones','JC21','alfredo@hotmail.com','comicionado','google','PO98','renata@gmail.com','$9823.21','Río Mamore','$176.67','Av. Palacios','Calle Rocabado','Puerto Acosta','BY67','Av. San Marcos','$8762.00','#@!><&<//>','=?)(&','RR77','$3300.99','Puente Carlona del Norte','Nueva York','Av. Nueva Generación','joelgarcia@gmail.com','IU12','*&$>?#!{-?<','Edif. Ferrondo','Calle 19','romanfer@usomin.gob.bo','OO90','FTM s.r.l.','$1900867','0x8975fba342a421abf45c127','Reus','Condominio #9879','Asturia','ercer@hotmail.com','cmendez@outlook.com','Leaños Robles','José Alberto', '$()>$<)&9%>-.¡¿','faock.reaul@outlook.com','Puente Sevilla','$786.90','GT55','PR98','PI31','OPPO','Leaños'];

console.log("\t\tMANEJO DE CADENAS");
console.log("\tNIVEL I");
console.log("1. Mostrar las cadenas con longitud mayor a 10 caracteres");

cadenas.forEach( x => {
   if(x.length>10){
      console.log(`* ${x}`);
   }
});

console.log("\n2. Buscar palabras que NO contengan caracteres especiales");
let carac = ['@','$','#','%', '?', '>','<', '*','!']
cadenas.forEach( x => {
   let sw = true;
   for(const c of carac){
      if(x.includes(c)){
         sw = false;
         break;
      }
   }
   if(sw){
      console.log("* ",x);
   }
});

console.log("\n3. Encontrar palabras que contengan números");
let num = ['0','1','2','3','4','5','6','7','8','9']
cadenas.forEach( x => {
   let sw = false;
   for(const c of num){
      if(x.includes(c)){
         sw = true;
         break;
      }
   }
   if(sw){
      console.log("* ",x);
   }
});