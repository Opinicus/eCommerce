export function showCartProductsPopUp()
{
    let $popup = $(".cart-container");
    let $background = $("#disabled-background");

    $popup.removeClass("hidden");
    $background.removeClass("hidden");
 
}

export function hideCartPopUp() {
    let $popup = $(".cart-container");
    let $background = $("#disabled-background");

    $popup.addClass("hidden");
    $background.addClass("hidden");
}