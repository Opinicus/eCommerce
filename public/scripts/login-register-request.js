import { put as putRequest } from "requester";
import { post as postRequest } from "requester";

export function login() {
    var $username = $("#username-field").val();
    var $password = $("#password-field").val();
    var passHash = CryptoJS.SHA256($password);
    passHash = passHash.toString();

    putRequest("/api/users", { username: $username, passHash: passHash })
        .then(value => {
            //welcome msg here


            //store authKey in localStorage
            window.localStorage.setItem("auth-key", value.result.authKey);
            //show logout button
            $("#logout-button").removeClass("hidden");
            //remove login/register buttons
            $("#login-button").addClass("hidden");
            $("#register-button").addClass("hidden");
            //hide popup and disabled-background
            $(".inner-container").addClass("hidden");
            $("#disabled-background").addClass("hidden");
        }, value => {
            //error msg here

        });
}

export function register() {
    var $username = $("#username-field").val();
    var $password = $("#password-field").val();
    var passHash = CryptoJS.SHA256($password);
    passHash = passHash.toString();

    postRequest("/api/users", { username: $username, passHash: passHash })
        .then(value => {
            //hide popup and disabled-background
            $(".inner-container").addClass("hidden");
            $("#disabled-background").addClass("hidden");
        }, value => {
            //error msg here
        });
}

export function logout() {
    //hide logout button
    $("#logout-button").addClass("hidden");
    //add login/logout buttons
    $("#login-button").removeClass("hidden");
    $("#register-button").removeClass("hidden");
    //delete authKey from localStorage
    window.localStorage.removeItem("auth-key");
}

export function checkForLogged() {
    if (window.localStorage.getItem("auth-key")) {
        //show logout button
        $("#logout-button").removeClass("hidden");
        //remove login/register buttons
        $("#login-button").addClass("hidden");
        $("#register-button").addClass("hidden");
    }
    else {
        //hide logout button
        $("#logout-button").addClass("hidden");
        //add login/logout buttons
        $("#login-button").removeClass("hidden");
        $("#register-button").removeClass("hidden");
    }
}