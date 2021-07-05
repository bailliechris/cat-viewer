// Cat API Class - uses Cat Image Class
// Methods: 
// clearImages -            runs removeImage method from Cat Image class
// getImagesFetch -         uses FETCH to get and create images using Cat Image class
// createCategoryOptions -  fills a select tag with options collected from thecatapi
// getCategoriesFetch -     Queries thecatapi for categories - on first run collects sunglasses images
//                          also calls createCategoryOptions
class catAPI {
    constructor(address){
      this.loadAddress = address;
      this.images = [];
      this.firstTime = true;
      this.categories=[{}];
    }

    // Clears up the page by running removeImage on each element created using catImage class.
    clearImages(){
        this.images.forEach(image => image.removeImage());

        this.images = [];
    }
 
    // Fetches images from a given category
    // Takes category as a STRING and finds the matching ID for the get params.
    getImagesFetch(category) {
        const type = this.categories.find(({ name }) => name === category);
        fetch(this.loadAddress + "/images/search?category_ids=" + type.id +"&limit=5", {
            method: "GET",
            headers: {
                "x-api-key":"3578ec65-63ca-4d3a-b198-1b1bea6a8b5a"
            }
        })
        .then(response => response.json())
        .then(details => {
            // For all images returned, create a catImage to help with the modal later.
            details.forEach(image => {
                let new_image = new catImage(
                    image.url,
                    image.id,
                    image.width,
                    image.categories[0].name
                );

                this.images.push(new_image);
            })
        })
        .catch(err => alert(err));
    }

    // Fills in a select box using the options gathered from the thecatapi
    // Called by getCategoriesFetch()
    createCategoryOptions() {
        this.categories.forEach(option => {
            let new_option = document.createElement('OPTION');
            new_option.innerHTML = option.name;
            document.getElementById("select_category").appendChild(new_option);
        });
    }

    // Queries thecatapi for categories
    // Calls createCategoryOptions
    // Also calls getImagesFetch to set up initial page with sunglasses
    getCategoriesFetch() {
        fetch(this.loadAddress + "/categories", {
            method: "GET",
            headers: {
                "x-api-key":"3578ec65-63ca-4d3a-b198-1b1bea6a8b5a"
            }
        })
        .then(response => response.json())
        .then(details => {
            this.categories = details;
            this.createCategoryOptions();
        })
        .then(() => {
            if(this.firstTime === true) {
                this.getImagesFetch("sunglasses");
                this.firstTime = false;
            }
        })
        .catch(err => alert(err));
    }

};