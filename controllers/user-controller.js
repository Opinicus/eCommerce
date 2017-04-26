module.exports = function (db) {
    function put(request, response) {
        var allUsers = db.get("users");

        var username = request.body.username;
        var passHash = request.body.passHash;

        var canLogin = false;

        allUsers.forEach(u => {
            if (u.username === username && u.passHash === passHash) {
                canLogin = true;
            }
        });

        if (canLogin) {
            var authKey;
            allUsers.forEach(u => {
                if (u.username === username) {
                    authKey = u.authKey;
                }
            });
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
        var password = request.body.password;
        var SHA256 = require("../public/bower_components/crypto-js/sha256");
        var passHash = SHA256(password);

        var allUsers = db.get("users");
        var canRegister = true;   

        allUsers.forEach(u => {
            if (u.username.toLowerCase() === username.toLowerCase()) {
                canRegister = false;
            }
        });

        if (canRegister) {
            //Create authKey here
            var authKeyGenerator = require("../utils/auth-key-generator");
            var authKey = authKeyGenerator();

            //Instantiate user class here
            var User = require("../classes/user-class");
            var registeredUser = new User(username, passHash, authKey);

            db.get("users").push({ username: username, passHash: passHash, authKey: authKey}).write();
            response.status(201).json({user: registeredUser});
        }
        else {
            response.status(400).json("Username is already taken");
        }
    }

    return {
        put: put,
        post: post
    };
};