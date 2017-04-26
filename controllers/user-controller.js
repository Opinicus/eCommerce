module.exports = function (db) {
    function put(request, response) {
        var username = request.body.username;
        var passHash = request.body.passHash;
        // var SHA256 = require("../public/bower_components/crypto-js/sha256");
        // var passHash = SHA256(password);
        // passHash = passHash.toString();

        var canLogin = false;

        if (db.get("users").find({username: username, passHash: passHash})) {
            canLogin =  true;
        }

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
        var passHash = request.body.passHash;
        // var SHA256 = require("../public/bower_components/crypto-js/sha256");
        // var passHash = SHA256(password);
        // passHash = passHash.toString();
        
        //check for a user with the same username
        var canRegister = true;   
        if (db.get("users").find({username: username})) {
            canRegister = false;
        }

        //check for empty username of password
        if (username === "" || passHash === "") {
            canRegister =  false;
        }

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