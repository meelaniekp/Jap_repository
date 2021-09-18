var category = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}
function showStars(score){
    
    let estrella= "";

    if(score == 1){
        estrella=`<span class="fa fa-star checked"></span>
         <span class="fa fa-star "></span>
         <span class="fa fa-star "></span>
         <span class="fa fa-star"></span>
         <span class="fa fa-star"></span>`
                   
    }else if(score == 2) {
        estrella=`<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star "></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`

    }else if(score == 3){
        estrella=`<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`

    }else if(score == 4){
        estrella=`<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>`
    }else if(score == 5){
        estrella=`<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>`
    } else{
        estrella=`<span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }

    return estrella
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category = resultObj.data;

            let categoryNameHTML  = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("soldCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
        
            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            productCountHTML.innerHTML = category.soldCount;
            productCriteriaHTML.innerHTML = category.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
        }
    });
    function showComments(array){
        let htmlContentToAppend = "";
        for(let i = 0; i < array.length; i++){
         let comment = array[i];
        
        htmlContentToAppend += `
        <div class="row gx-5">
           <p>`+showStars(comment.score) +`<br> <b>`+ comment.user + ` -</b> `+ comment.dateTime+ `<br>` + comment.description +`<br></p>
        </div>
        `

        document.getElementById("comentarios").innerHTML = htmlContentToAppend;

        }
        
        }
     
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        showComments(resultObj.data)
        };
    
  });
   document.getElementById("formulario").addEventListener("submit", function(e){
    e.preventDefault()//evita que se refresque la pagina
    addComment(e)
   }) 
});

function addComment(e){
   var usuario = localStorage.getItem("Nombre")
   var score = document.getElementById("puntaje").value
   var comment = document.getElementById("comentarioNuevo").value
   var fecha = new Date ()
   let htmlContentToAppend = "";
   var div = document.createElement("div")
   htmlContentToAppend += `
   <div class="row gx-5">
      <p>`+showStars(score) +`<br> <b>`+ usuario + ` -</b> `+ fecha+ `<br>` + comment +`<br></p>
   </div>
   `
    div.innerHTML = htmlContentToAppend
    document.getElementById("comentarios").appendChild(div)
}
