export function showLoginPopUp() {
    let $popup = $(".inner-container");
    let $background = $("#disabled-background");
    let $loginRegisterH1 = $("#login-register-h1");
    let $submitButton = $("#submit-button");

    $popup.removeClass("hidden");
    $background.removeClass("hidden");
    $loginRegisterH1.text("Login");
    $submitButton.text("Login");

    $popup.find("input").val("");
}

export function showRegisterPopUp() {
    let $popup = $(".inner-container");
    let $background = $("#disabled-background");
    let $loginRegisterH1 = $("#login-register-h1");
    let $submitButton = $("#submit-button");

    $popup.removeClass("hidden");
    $background.removeClass("hidden");
    $loginRegisterH1.text("Register");
    $submitButton.text("Register");

    $popup.find("input").val("");
}

export function hidePopUp() {
    let $popup = $(".inner-container");
    let $background = $("#disabled-background");

    $popup.addClass("hidden");
    $background.addClass("hidden");
}