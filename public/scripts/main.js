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
import { showShoppingCart } from "showShoppingCart";
import { addToCart } from 'addToCart';
import { showSelectedProductImage } from 'showSelectedProductImage';
import { uploadProduct } from 'uploadProduct';


var router = new Navigo(null, true);
router.on("/home", () => {
	loadTemplate("home", "/api/products/latest", "main");

	setTimeout(() => {
		$(".add-to-cart-button").on("click", (ev) => {
			var $parent = $(ev.target).parent().parent().parent();
			addToCart($parent);
		});
	}, 50);
});
router.on("/products", () => {
	loadTemplate("product", "/api/products", "main");

	setTimeout(() => {
		$(".add-to-cart-button").on("click", (ev) => {
			var $parent = $(ev.target).parent().parent().parent();
			addToCart($parent);
		});
	}, 50);

});
router.on("/contact", () => {
	loadTemplate("contact", "", "main");
});
// TODO: api/product data
router.on("/addProduct", () => {
	loadTemplate("product-form-add-product", "", "main");

	setTimeout(() => {
		showSelectedProductImage();
		$("#submit").on("click", uploadProduct);
	}, 50);
});
// TODO: api/shoppingCart data
router.on("/shoppingCart", () => {
	showShoppingCart();
});

//Check if user is logged in
checkForLogged();
//Check if admin is logged in
checkForAdmin();

$("#login-button").on("click", showLoginPopUp);
$("#register-button").on("click", showRegisterPopUp);
$("#disabled-background").on("click", hidePopUp);
$("#submit-button").on("click", (ev) => {
	var $target = $(ev.target);
	
	var $username = $("#username-field").val();
	var $password = $("#password-field").val();
	var passHash = CryptoJS.SHA256($password);
	passHash = passHash.toString();

	var user = {
		username: $username,
		passHash: passHash
	};

	if ($target.text() === "Login") {

		login(user);
		//Check for admin user logged in: REWORK WITH PROMISE
		setTimeout(checkForAdmin, 50);
	}
	else if ($target.text() === "Register") {
		register(user);
	}
});
$("#logout-button").on("click", () => {
	logout();
	router.navigate("/home");
});

//rework might be needed
$(window).on("hashchange", () => {
	var hash = window.location.hash;
	hash = hash.substr(2);

	//use a switch here to switch templates and fix bug

	if (window.location.href === "http://localhost:3000/" || window.location.hash === "/") {
		router.navigate("/home");
		loadTemplate("home", "/api/products/latest", "main");
	}
});
//rework might be needed
$(window).on("load", () => {
	if (window.location.href === "http://localhost:3000/" || window.location.hash === "" || window.location.hash === "/") {
		router.navigate("/home");
		loadTemplate("home", "/api/products/latest", "main");
	}
});

//rework might be needed
$(window).on("ready", () => {
	var hash = window.location.hash;
	console.log(hash)

});