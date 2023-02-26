const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})
// Funcion recursiva como evento
readline.on("line", (line) => {
    console.log(line.toUpperCase())
})


