module.exports = function (db) {
    function put(request, response) {
        var username = request.body.username;
        var passHash = request.body.passHash;

        var canLogin = false;

        var allUsersObjects = db.get("users").value();

        if (allUsersObjects.find(u => u.username === username && u.passHash === passHash)) {
            canLogin = true;
        }

        if (canLogin) {
            var currentUser = allUsersObjects
                .find(u => u.username === username && u.passHash === passHash);
            var authKey = currentUser.authKey;
            response.json({
                result: {
                    username: username,
                    authKey: authKey
                }
            });
        }
        else {
            response.status(404).json('Username or password is invalid');
        }
    }

    function post(request, response) {
        var username = request.body.username;
        var passHash = request.body.passHash;

        var HASHED_EMPTY_PASSWORD = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

        var canRegister = true;

        //check for a user with the same username
        var allUsers = db.get("users").map("username").value();
        if (allUsers.find(dbUsername => dbUsername === username)) {
            canRegister = false;
        }

        //check for empty username(empty password works)
        if (username === "" || passHash === HASHED_EMPTY_PASSWORD) {
            canRegister = false;
        }

        if (canRegister) {
            //Create authKey here
            var authKeyGenerator = require("../utils/auth-key-generator");
            var authKey = authKeyGenerator();

            //Instantiate cart class here
            var Cart = require("../classes/cart-class");
            var currentCart = new Cart();

            //Instantiate user class here
            var User = require("../classes/user-class");
            var registeredUser = new User(username, passHash, authKey, currentCart);

            db.get("users").push(registeredUser).write();
            response.status(201).json({ user: registeredUser });
        }
        else {
            response.status(400).json("Username is already taken");
        }
    }

    function get(request, response) {
        var allUsersObjects = db.get("users").value();
        response.status(200).json({
            result: {
                users: allUsersObjects
            }
        });
    }

    function postInCart(request, response) {
        var productToAdd = request.body.product;

        var items = db.get("users")
            .filter({ "authKey": request.body.authKey })
            .map("cart")
            .map("items")
            .value();

        items = items[0];

        items.push(productToAdd);

        var cart = {
            "items": items,
            "numbersOfItems": items.length
        };

        db.get("users")
            .filter({ "authKey": request.body.authKey })
            .map("cart")
            .map("items")
            .push(productToAdd)
            .write();

    }

    function removeFromCart(request, response) {
        var allUsersObjects = db.get("users").value();
        var currentUser = allUsersObjects.find(u => u.authKey === request.body.authKey);

        var index = request.body.index;

        var items = db.get("users")
            .filter({ "authKey": request.body.authKey })
            .map("cart")
            .map("items")
            .value();

        items.splice(index, 1);

        var cart = {
            "items": items,
            "numbersOfItems": items.length
        };

        var newArray = allUsersObjects.map(u => {
            if (u.authKey === request.body.authKey) {
                u.cart.items.splice(index, 1);
                return u;
            }
            else {
                return u;
            }
        });

        db.updateWhere(db.users, {users: allUsersObjects}, {users: newArray}).write();
    }

    function makeOrder(request, response) {
        var allUsersObjects = db.get("users").value();

        var newArray = allUsersObjects.map(u => {
            if (u.authKey === request.body.authKey) {
                u.cart.items = [];
                return u;
            }
            else {
                return u;
            }
        });

        db.updateWhere(db.users, {users: allUsersObjects}, {users: newArray}).write();
        response.status(200).json("Order sent");
    }

    return {
        put: put,
        post: post,
        get: get,
        postInCart: postInCart,
        removeFromCart: removeFromCart,
        makeOrder: makeOrder
    };
};