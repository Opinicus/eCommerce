export function showCartProductsPopUp()
{
    var $popup = $(".cart-container");
    var $background = $("#disabled-background");

    $popup.removeClass("hidden");
    $background.removeClass("hidden");
 
}

export function hideCartPopUp() {
    var $popup = $(".cart-container");
    var $background = $("#disabled-background");

    $popup.addClass("hidden");
    $background.addClass("hidden");
}