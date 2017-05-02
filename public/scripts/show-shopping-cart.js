import { get as getRequest } from "requester";
import { loadTemplateFromData } from "loadTemplate";
import { SessionCart } from "sessionCartClass";

export function showShoppingCart() {
    var loggedIn = false;

    if (window.localStorage.getItem("auth-key")) {
        loggedIn = true;
    }

    if (loggedIn) {
        getRequest("/api/users")
            .then(value => {
                var users = value.result.users;
                var currentUser = users.find(u => u.authKey === window.localStorage.getItem("auth-key"));
                loadTemplateFromData("shopping-cart", currentUser.cart, "main");

                var sessionCart = new SessionCart(currentUser.cart.items);
                setTimeout(() => {
                    $("#total-price").text(sessionCart.getTotalPrice() + "$");
                }, 50);
            });
    }
    else {
        toastr.error("You have to be logged in");
    }
}