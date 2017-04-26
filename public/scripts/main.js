import "jquery";
import "navigo";
import { post as postRequest } from "requester";
import { get as getRequest } from "requester";
import { loadTemplate } from "loadTemplate";

var router = new Navigo(null, true);

router.on("/products", () => {
    loadTemplate("product", "/api/products", "#products");
})


