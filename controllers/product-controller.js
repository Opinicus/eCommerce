module.exports = function(db) { 
    function get(request, response) {
        var products = db.get("products")
            .map((product) => {
                return {
                    title: product.title,
                    price: product.price,
                    img: product.img,
                    description: product.description
                };
            });
        response.status(200);
        response.json({
            products: products
        });
    }

    function post(request, response) {
        var title = request.body.title;
        var price = +request.body.price;
        var img = request.body.img;
        var description = request.body.description;
        var category = request.body.category;

        //Instantiate product class here
        var Product = require("../classes/product-class");
        var postedProduct = new Product(title, price, img, description, category);
        db.get("products").push(postedProduct).write();
    }

    return {
        get: get,
        post: post
    };
};