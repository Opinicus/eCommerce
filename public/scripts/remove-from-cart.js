import { del as deleteRequest } from 'requester';
import { get as getRequest } from 'requester';
import { loadTemplateFromData } from "loadTemplate";

export function removeFromCart(index) {
    const options = {
        authKey: window.localStorage.getItem("auth-key"),
        index: index
    };

    deleteRequest("/api/users/cart", options)
        .then(value => {
            
        });
}