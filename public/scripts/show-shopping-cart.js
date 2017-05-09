import { get as getRequest } from "requester";
import { post as postRequest } from "requester";
import { loadTemplateFromData } from "loadTemplate";
import { SessionCart } from "sessionCartClass";
import { removeFromCart } from 'removeFromCart';

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
                    var itemWord = (sessionCart.items.length === 1) ? " item" : " items";
                    $("#total-price").text(sessionCart.getTotalPrice() + "$");
                    $("#item-count").text(sessionCart.items.length + itemWord);
                    $(".remove-button").on("click", (ev) => {
                        var $target = $(ev.target);
                        var $productContainer = $target.parent().parent().parent();
                        var index = $productContainer.index();

                        removeFromCart(index);

                        //load cart with the removed item
                        $productContainer.remove();
                        sessionCart.remove(index);
                        $("#total-price").text(sessionCart.getTotalPrice() + "$");
                    });

                    $("#buy-button").on("click", (ev) => {
                        var options = {
                            authKey: window.localStorage.getItem("auth-key")
                        };
                        postRequest("/api/users/cart/order", options)
                            .then(value => toastr.success(value), value => toastr.error(value.responseJSON));
                        sessionCart.clearCart();
                        $(".list-group-item").remove();
                        $("#total-price").text(sessionCart.getTotalPrice() + "$");
                        $("#item-count").text(sessionCart.items.length + itemWord);
                    });
                }, 50);
            });
    }
    else {
        toastr.error("You have to be logged in");
    }
}