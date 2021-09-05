//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
 document.getElementById("usuario").innerHTML = `Bienvenido: ` + localStorage.getItem("Nombre");

});

function guardarNombre(){
   var email = document.getElementById("idUsuario").value;
   localStorage.setItem("Nombre", email)
  
}
