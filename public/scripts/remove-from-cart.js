import { del as deleteRequest } from 'requester';
import { get as getRequest } from 'requester';
import { loadTemplateFromData } from "loadTemplate";

export function removeFromCart(parent) {
    var options = {
        authKey: window.localStorage.getItem("auth-key"),
        parent: parent
    };

    deleteRequest("/api/users/cart", options)
        .then(value => {
            
        });
}