export function checkForAdmin() {
    const ADMIN_AUTH_KEY = "&&*)$Z=Bv-k=NPxQhuSyeAKJtxkzOomp+^@wmtqwdxqP=Wr^SMrb(WwZKNSq";
    if (window.localStorage.getItem("auth-key") === ADMIN_AUTH_KEY) {
        $("#add-product-button").removeClass("hidden");
    }
}