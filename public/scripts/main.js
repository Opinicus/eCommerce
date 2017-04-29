import "jquery";
import "navigo";
import { post as postRequest } from "requester";
import { get as getRequest } from "requester";
import { loadTemplate } from "loadTemplate";
import { showLoginPopUp } from 'loginRegisterPopUp';
import { showRegisterPopUp } from 'loginRegisterPopUp';
import { hidePopUp } from 'loginRegisterPopUp';
import { login } from "loginRegisterRequest";
import { register } from "loginRegisterRequest";
import { logout } from "loginRegisterRequest";
import { checkForLogged } from "loginRegisterRequest";
import { checkForAdmin } from 'checkForAdmin';

//Check if user is logged in
checkForLogged();
//Check if admin is logged in
checkForAdmin();

$("#login-button").on("click", showLoginPopUp);
$("#register-button").on("click", showRegisterPopUp);
$("#disabled-background").on("click", hidePopUp);
$("#submit-button").on("click", (ev) => {
    var $target = $(ev.target);
    if ($target.text() === "Login") {
        login();
        //Check for admin user logged in: REWORK WITH PROMISE
        setTimeout(checkForAdmin, 50);
    }
    else if ($target.text() === "Register") {
        register();
    }
});
$("#logout-button").on("click", logout);

var router = new Navigo(null, true);
router.on("/home", () => {
    loadTemplate("home", "/api/products/latest", "main");
});
router.on("/products", () => {
    loadTemplate("product", "/api/products", "main");
});
router.on("/contact", () => {
    loadTemplate("contact", "", "main");
});

//rework might be needed
$(window).on("hashchange", () => {
    if (window.location.href === "http://localhost:3000" || window.location.hash === "" || window.location.hash === "/") {
        router.navigate("/home");
        loadTemplate("home", "/api/products/latest", "main");
    }
});
//rework might be needed
$(window).on("load", () => {
    if (window.location.href === "http://localhost:3000" || window.location.hash === "" || window.location.hash === "/") {
        router.navigate("/home");
        loadTemplate("home", "/api/products/latest", "main");
    }
});



