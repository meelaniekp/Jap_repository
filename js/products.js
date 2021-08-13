//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const LIST_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").display = "none";
}

var getJSONData = function(url){
    var result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}
var categoriesArray = [];

function showCategoriesList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4>
                        <small class="text-muted"> Precio: ` + `USD `+ category.cost + ` - Cantidad disponible: ` + category.soldCount + ` artículos</small>
                    </div>
                    <p>${category.description}</p>
                </div>
            </div>
        </div>
        `

        document.getElementById("productos").innerHTML = htmlContentToAppend;
    }
}



document.addEventListener("DOMContentLoaded", function (e) {getJSONData(LIST_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        categoriesArray = resultObj.data;
        //Muestro las categorías ordenadas
        showCategoriesList(categoriesArray);
    }
});


});
