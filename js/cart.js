//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let costoEnvio = 1.15;

document.addEventListener("DOMContentLoaded", function(e){
    

    getJSONData(CART_INFO2_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            let articulos = resultObj.data.articles;
            BuyProducts(articulos);
        }
    });
    let articles=[];
    

    function BuyProducts(array){
        let total=0;
        let subtotal=0;
        let htmlContentToAppend = "";
    
        for(let i = 0; i < array.length; i++){
            
            articles = array[i];
            if (articles.currency == "USD"){
                subtotal= (articles.unitCost*40*articles.count)
                total+= subtotal
                htmlContentToAppend += `
            <tr><td><img src=${articles.src} class="img-fluid img-thumbnail imagen"></td><td>${articles.name}</td>
            <td> <input class="cantidad" type="number" onchange="sumar()" min="0" value="${articles.count}"></td><td>UYU</td><td class="precio">${subtotal}</td></tr>
            
            `
            } else{
                subtotal= (articles.unitCost*articles.count)
                total+= subtotal
                htmlContentToAppend += `
            <tr><td><img src=${articles.src} class="img-fluid img-thumbnail imagen"></td><td>${articles.name}</td>
            <td> <input class="cantidad" type="number" onchange="sumar()" min="0" value="${articles.count}"></td><td>${articles.currency}</td><td class="precio">${articles.unitCost}</td></tr>
            
            `
            }
            
        } 
        document.getElementById("articulos").innerHTML = htmlContentToAppend;
        document.getElementById("subtotal").innerHTML += total;
        document.getElementById("total").innerHTML = `Total en pesos: ${subtotal*costoEnvio}`;
     }

    
});

function sumar(){
    let precios = document.getElementsByClassName("precio");
    let cantidad = document.getElementsByTagName('input');

    let subtotal=0;

    for (let i = 0; i < precios.length; i++) {
    
        subtotal+= parseFloat(precios[i].innerHTML)*parseFloat(cantidad[i].value)
            
    }
    
    document.getElementById("subtotal").innerHTML = `Subtotal en pesos: ${subtotal}`;
    document.getElementById("total").innerHTML = `Total en pesos: ${subtotal*costoEnvio}`;
    
}


function envio(){
    let premium = document.getElementById("premiumradio");
    let express = document.getElementById("expressradio");
    let standard = document.getElementById("standardradio");

    if (premium.checked == true) {
        costoEnvio = 1.15;
        sumar();
    } 

    if (express.checked == true) {
        costoEnvio = 1.07;
        sumar();
    }
    if (standard.checked == true) {
        costoEnvio = 1.05;
        sumar();
    }  

}

document.getElementById("customRadio1").addEventListener("click",()=>{
    document.getElementById("modalnombreTitular").disabled = false;
    document.getElementById("modalnombreNumero").disabled = false;
    document.getElementById("modalnombreVto").disabled = false;
    document.getElementById("modalnombreCvv").disabled = false;
    document.getElementById("numeroCuenta").disabled = true;
    document.getElementById("banco").disabled = true;
});

document.getElementById("customRadio2").addEventListener("click",()=>{
    document.getElementById("modalnombreTitular").disabled = true;
    document.getElementById("modalnombreNumero").disabled = true
    document.getElementById("modalnombreVto").disabled = true;
    document.getElementById("modalnombreCvv").disabled = true;
    document.getElementById("numeroCuenta").disabled = false;
    document.getElementById("banco").disabled = false;
});

function finalizarCompra(){
    let cantidad = document.getElementsByClassName("cantidad");
    let cantidadTotal = 0;
    let calle = document.getElementById("direccionReg").value
    let numero = document.getElementById("numeroReg").value
    let pais = document.getElementById("paisReg").value

    for (let i = 0; i < cantidad.length; i++) {
        cantidadTotal += parseFloat(cantidad[i].value)

    }
    if (cantidadTotal !=0 && calle !="" && numero !="" && pais !=""){
        swal("Compra realizada con éxito", "Disfrute de su compra!", "success", {
            button: "Volver al carrito",
          });
    } else {
        swal("Su compra no puede ser realizada", "Faltan datos de compra", "error", {
            button: "Volver al carrito",
          });
    }


}