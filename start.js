let catData = new catAPI('https://api.thecatapi.com/v1/categories');
let bigImageModal = document.getElementById("big_image_modal");
let closeModal = document.getElementById("modal_close");

let addMoreButton = document.getElementById("add_more_button");
addMoreButton.addEventListener("click", add_more_images);

//add event listener to select
const selectElement = document.querySelector('#select_category');
selectElement.addEventListener('change', (event) => {
    catData.clearImages();
    loadingNotification();
    catData.getImagesFetch(event.target.value);
    loadingNotification();
});

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
    bigImageModal.style.display = "none";
    document.getElementById("big_cat_id").remove();
}
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == bigImageModal) {
        bigImageModal.style.display = "none";
        document.getElementById("big_cat_id").remove();
    }
}

function loadingNotification(){
    let loadingMessage = document.getElementById("loading_placeholder");
    if (catData.loaded){
      loadingMessage.style.display = "none";
    }
    else{
      loadingMessage.style.display = "block";
    }
  
}

function add_more_images() {
    console.log("More pressed");
    let category = document.querySelector('#select_category');

    catData.getImagesFetch(category.value);
}

function main() {
    catData.getCategoriesFetch();
    loadingNotification();

}

main();
//catData.getCategoriesFetch();