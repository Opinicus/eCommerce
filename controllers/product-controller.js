module.exports = function (db) {
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

        //get current date
        var date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

        //Instantiate product class here
        var Product = require("../classes/product-class");
        var postedProduct = new Product(title, price, img, description, date);

        var canPush = true;
        var products = db.get("products").value();

        products.forEach(p => {
            if (p.title === postedProduct.title) {
                canPush = false;
            }
        });

        if (canPush) {
            db.get("products").push(postedProduct).write();
            response.status(200).json("Success");
        }
        else {
            response.status(400).json("Product title already exists");
        }

    }

    function getLatest(request, response) {
        var products = db.get("products").value();
        var len = products.length;
        var latest = products.slice(len - 6, len).reverse();

        response.status(200);
        response.json({
            products: latest
        });
    }

    return {
        get: get,
        post: post,
        getLatest: getLatest
    };
};