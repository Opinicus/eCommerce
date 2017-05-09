import { post as postRequest } from "requester";

export function uploadProduct() {
    //title, price, img, description, category, date
    var title = $("#productTitle").val();
    var price = +$("#productPrice").val();
    var img = $("#img-upload").val();
    var description = $("#productDescription").val();

    var options = {
        title: title,
        price: price,
        img: img,
        description: description
    };

    var canAdd = true;
    if (title === "" || typeof price !== "number" || img === "" || description === "") {
        canAdd = false;
    }

    if (canAdd) {
        postRequest("/api/products", options)
            .then(value => {
                toastr.success("Product added successfully");

                $("#productTitle").val("");
                $("#productPrice").val("");
                $("#img-upload").val("");
                $("#productDescription").val("");
            },
            value => {
                toastr.error(value.responseJSON);
            });
    }
    else {
        toastr.error("Fill out all fields with valid info");
    }


}