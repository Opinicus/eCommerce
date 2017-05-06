import { get as getRequest } from 'requester';
import { post as postRequest } from 'requester';

export function addToCart(parent) {
    var products;
    var selectedProductTitle;
    var selectedProduct;
    var options;

    if (!window.localStorage.getItem("auth-key")) {
        toastr.error("Login to add items to cart");
        return;
    }

    getRequest("/api/products")
        .then(value => {
            products = value.products;
            selectedProductTitle = parent.find(".product-title").text();

            selectedProduct = products.find(p => p.title === selectedProductTitle);

            options = {
                authKey: window.localStorage.getItem("auth-key"),
                product: selectedProduct
            }
            
            return postRequest("/api/users/cart", options);
        })
        .then(value => {
            //maybe some msg here
        });
}