// Create local data store to use
let catData = new catAPI('https://api.thecatapi.com/v1');

// Set up listeners
// Listening for changes to the select box option
const selectElement = document.querySelector('#select_category');
selectElement.addEventListener('change', (event) => {
    // Clear the current images
    catData.clearImages();
    // Get replacements from new category
    catData.getImagesFetch(event.target.value);
});

// Close the Modal (by clicking the rest of the screen, or the modal_close icon)
let bigImageModal = document.getElementById("big_image_modal");
let closeModal = document.getElementById("modal_close");
// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
    bigImageModal.style.display = "none";
    // Clear the larger cat image from the modal
    document.getElementById("big_cat_id").remove();
}
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == bigImageModal) {
        bigImageModal.style.display = "none";
        // Clear the larger cat image from the modal
        document.getElementById("big_cat_id").remove();
    }
}

// Add More Button
let addMoreButton = document.getElementById("add_more_button");
addMoreButton.addEventListener("click", add_more_images);

// Triggered Add More Button
function add_more_images() {
    console.log("More pressed");
    let category = document.querySelector('#select_category');

    catData.getImagesFetch(category.value);
}

// Main entry function
function main() {
    catData.getCategoriesFetch();
}

main();