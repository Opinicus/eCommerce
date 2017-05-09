module.exports = function (db) {
    function get(request, response) {
        let products = db.get("products")
            .map((product) => {
                return {
                    title: product.title,
                    price: product.price,
                    img: product.img,
                    description: product.description,
                    date: product.date
                };
            });
        response.status(200);
        response.json({
            products: products
        });
    }

    function post(request, response) {
        let title = request.body.title;
        let price = +request.body.price;
        let img = request.body.img;
        let description = request.body.description;

        //get current date
        let date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

        //Instantiate product class here
        let Product = require("../classes/product-class");
        let postedProduct = new Product(title, price, img, description, date);

        let canPush = true;
        let products = db.get("products").value();

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
        let products = db.get("products").value();
        let len = products.length;
        let latest = products.slice(len - 4, len).reverse();

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