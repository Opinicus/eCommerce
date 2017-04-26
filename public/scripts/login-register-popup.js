export function showLoginPopUp() {
    var $popup = $(".inner-container");
    var $background = $("#disabled-background");
    var $loginRegisterH1 = $("#login-register-h1");
    var $submitButton = $("#submit-button");

    $popup.removeClass("hidden");
    $background.removeClass("hidden");
    $loginRegisterH1.text("Login");
    $submitButton.text("Login");

    $popup.find("input").val("");
}

export function showRegisterPopUp() {
    var $popup = $(".inner-container");
    var $background = $("#disabled-background");
    var $loginRegisterH1 = $("#login-register-h1");
    var $submitButton = $("#submit-button");

    $popup.removeClass("hidden");
    $background.removeClass("hidden");
    $loginRegisterH1.text("Register");
    $submitButton.text("Register");

    $popup.find("input").val("");
}

export function hidePopUp() {
    var $popup = $(".inner-container");
    var $background = $("#disabled-background");

    $popup.addClass("hidden");
    $background.addClass("hidden");
}