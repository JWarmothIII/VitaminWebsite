"use strict";


//generate products
function generateProducts() {
    fetch("https://hplussport.com/api/products")
        .then((response) => response.json())
        .then((data) => {
            const container = document.getElementById("productsContainer");

            data.slice(0, 14).forEach((item) => {
                const card = `
                    <div class="card m-1" style="width: 20rem;">
                        <img src="${item.image}" class="card-img-top product-image" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="card-text">$${item.price}</p>
                            <button class="ui-button ui-widget ui-corner-all ui-icon-cart mt-auto addToCart" 
                                type="button" data-name="${item.name}" data-price="${item.price}">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });

            // Add event listeners to buttons
            const addToCartButtons = document.querySelectorAll(".addToCart");
            addToCartButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    let name = button.getAttribute("data-name");
                    let price = button.getAttribute("data-price");
                    let cart = JSON.parse(localStorage.getItem("cart")) || [];
                    cart.push({ name, price });
                    localStorage.setItem("cart", JSON.stringify(cart));

                    $("#itemAddedModal").modal("show");

                    setTimeout(function () {
                        $("#itemAddedModal").modal("hide");
                    }, 1500);
                });
            });

            // Enlarge the images
            const productImages = document.querySelectorAll(".product-image");
            productImages.forEach((image) => {
                image.addEventListener("click", () => {
                    const enlargedImgSrc = image.getAttribute("src");
                    const enlargedImg = document.getElementById("enlargedImg");
                    enlargedImg.setAttribute("src", enlargedImgSrc);
                    $("#imageModal").modal("show");
                });
            });
        });
}


document.addEventListener("DOMContentLoaded", () => {
    generateProducts();
});