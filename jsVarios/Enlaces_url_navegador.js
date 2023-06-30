// manejo de parametros de una url con js
function obtenerValorParametro(url, parametro){
    parametro = parametro.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + parametro + "=([^&#]*)");
    let results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
