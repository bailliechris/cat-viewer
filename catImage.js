class catImage {
    constructor(url, id, width, category){
        this.url = url;
        this.id = id;
        this.width = width;
        this.category = category;
        this.createImage();
    }

    createImage() {
        let new_image_div = document.createElement('DIV');
        new_image_div.className = "cat_image_card";
        new_image_div.id = this.id;

        let new_image_name = document.createElement('P');
        new_image_name.innerHTML = this.url.slice(this.url.lastIndexOf("/") + 1);

        let new_image = document.createElement('IMG');
        new_image.src = this.url;
        new_image.className = "cat_image";
        new_image.id = "img" + this.id;

        new_image.addEventListener("mousedown", (e) => {
            let big_image = document.createElement('IMG');
            big_image.className = "big_cat_image";
            big_image.id = "big_cat_id";
            big_image.src = this.url;
            let modal_content = document.getElementById("modal_content");
            modal_content.appendChild(big_image);
            let big_image_modal = document.getElementById("big_image_modal");
            big_image_modal.style.display = "block";
        });

        new_image_div.appendChild(new_image);
        new_image_div.appendChild(new_image_name);
        document.getElementById("preview_area").appendChild(new_image_div);
    }

    removeImage() {
        document.getElementById(this.id).remove();
    }
}