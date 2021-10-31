//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    mostrarPerfil()
});


function registroNuevo(){
 let perfil = {};
 let nombre = document.getElementById("modalnombreReg").value
 let apellido = document.getElementById("modalapellidoReg").value
 let email= document.getElementById("modalemailReg").value
 let telefono = document.getElementById("modaltelefonoReg").value
 let edad = document.getElementById("modaledadReg").value
 let imagen = document.getElementById("modalimgPre").src

 perfil.nombre = nombre;
 perfil.apellido = apellido;
 perfil.email = email;
 perfil.telefono = telefono;
 perfil.edad = edad;
 perfil.imagen = imagen;
 

 localStorage.setItem(
     "Perfil", 
     JSON.stringify(perfil)
 );
 alert("perfil guardado");
 mostrarPerfil()
}
function previewFile() {
 let preview = document.getElementById("modalimgPre");
 let file = document.querySelector("input[type=file]").files[0];
 let reader = new FileReader();

 reader.onloadend = function () {
   preview.src = reader.result;
 };

 if (file) {
   reader.readAsDataURL(file);
 } else {
   preview.src = "img/avatar.png";
 }
}


function mostrarPerfil() {
    let perfil = JSON.parse(localStorage.getItem("Perfil"));
    document.getElementById("nombrePerfil").innerHTML = `${perfil.nombre} ${perfil.apellido} `
    document.getElementById("emailPerfil").innerHTML = `${perfil.email}  `
    document.getElementById("telefonoPerfil").innerHTML = `${perfil.telefono}  `
    document.getElementById("edadPerfil").innerHTML = `${perfil.edad}  `
    document.getElementById("imgPerf").src = `${perfil.imagen}  `
}

