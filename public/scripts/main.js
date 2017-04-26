import "jquery";
import "navigo";
import { post as postRequest } from "requester";
import { get as getRequest } from "requester";
import { loadTemplate } from "loadTemplate";
import { showLoginPopUp as showLoginPopUp } from 'loginRegisterPopUp';
import { showRegisterPopUp as showRegisterPopUp } from 'loginRegisterPopUp';
import { hidePopUp as hidePopUp } from 'loginRegisterPopUp';
import { login as login } from "loginRegisterRequest";
import { register as register } from "loginRegisterRequest";
import { logout as logout } from "loginRegisterRequest";

$("#login-button").on("click", showLoginPopUp);
$("#register-button").on("click", showRegisterPopUp);
$("#disabled-background").on("click", hidePopUp);
$("#submit-button").on("click", (ev) => {
    var $target = $(ev.target);
    if($target.text() === "Login") {
        login();
    }
    else if ($target.text() === "Register") {
        register();
    }
});
$("#logout-button").on("click", logout);

var router = new Navigo(null, true);
router.on("/home", () => {

});
router.on("/products", () => {
    loadTemplate("product", "/api/products", "main");
});
router.on("/contact", () => {
    loadTemplate("contact", "", "main");
});


