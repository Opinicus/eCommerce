import { put as putRequest } from "requester";
import { post as postRequest } from "requester";
import { get as getRequest } from "requester";

export function login(user) {
    // var $username = $("#username-field").val();
    // var $password = $("#password-field").val();
    // var passHash = CryptoJS.SHA256($password);
    // passHash = passHash.toString();

    putRequest("/api/users", { username: user.username, passHash: user.passHash })
        .then(value => {
            //welcome msg here
            toastr.success("Welcome, " + value.result.username);
            //go to home page
            window.location.hash = "/home";
            //set account username label
            $("#logged-user").text(value.result.username);
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
            toastr.error("Username or password is incorrect");
        });
}

export function register(user) {
    // var $username = $("#username-field").val();
    // var $password = $("#password-field").val();
    // var passHash = CryptoJS.SHA256($password);
    // passHash = passHash.toString();

    postRequest("/api/users", { username: user.username, passHash: user.passHash })
        .then(value => {
            //success msg
            toastr.success("Successfully registered");
            //hide popup and disabled-background
            $(".inner-container").addClass("hidden");
            $("#disabled-background").addClass("hidden");
        }, value => {
            //error msg here
            toastr.error("Username is taken or too small");
        });
}

export function logout() {
    //empty the account username label
    $("#logged-user").text("");
    //hide logout button
    $("#logout-button").addClass("hidden");
    //add login/logout buttons
    $("#login-button").removeClass("hidden");
    $("#register-button").removeClass("hidden");
    //hide add-product-button
    $("#add-product-button").addClass("hidden");
    //delete authKey from localStorage
    window.localStorage.removeItem("auth-key");
}

export function checkForLogged() {
    var currentAuthKey = window.localStorage.getItem("auth-key");
    if (currentAuthKey) {
        getRequest("/api/users")
            .then(value => {
                var users = value.result.users;
                var currentLoggedInUser = users.find(u => u.authKey === currentAuthKey);
                //set account username label
                $("#logged-user").text(currentLoggedInUser.username);
            });


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