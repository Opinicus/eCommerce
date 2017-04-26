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
        db.get("products").push({title: title, price: price, img: img, description: description}).write();
    }

    return {
        get: get,
        post: post
    };
};