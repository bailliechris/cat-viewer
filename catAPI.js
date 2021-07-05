
// API Key x-api-key 3578ec65-63ca-4d3a-b198-1b1bea6a8b5a

class catAPI {
    constructor(address){
      this.loadAddress = address;
      this.info = {};
      this.images = [];
      this.loaded = false;
      this.firstTime = true;
      this.categories=[{}];
    }

    clearImages(){
        this.images.forEach(image => image.removeImage());

        this.images = [];

        this.loaded = false;
    }
 
    getImagesFetch(category) {
        const type = this.categories.find(({ name }) => name === category);
        fetch("https://api.thecatapi.com/v1/images/search?category_ids=" + type.id +"&limit=5", {
            method: "GET",
            headers: {
                "x-api-key":"3578ec65-63ca-4d3a-b198-1b1bea6a8b5a"
            }
        })
        .then(response => response.json())
        .then(details => {
            details.forEach(image => {
                let new_image = new catImage(
                    image.url,
                    image.id,
                    image.width,
                    image.categories[0].name
                );

                this.images.push(new_image);
            })

            this.loaded = true;
        })
    }

    createCategoryOptions() {
        this.categories.forEach(option => {
            let new_option = document.createElement('OPTION');
            new_option.innerHTML = option.name;
            document.getElementById("select_category").appendChild(new_option);
        });
    }

    getCategoriesFetch() {
        fetch(this.loadAddress, {
            method: "GET",
            headers: {
                "x-api-key":"3578ec65-63ca-4d3a-b198-1b1bea6a8b5a"
            }
        })
        .then(response => response.json())
        .then(details => {
            this.loaded = true;
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