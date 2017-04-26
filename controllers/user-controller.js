module.exports = function (db) {
    function put(request, response) {
        var username = request.body.username;
        var passHash = request.body.passHash;

        var canLogin = false;

        if (db.get("users").find({username: username, passHash: passHash})) {
            canLogin =  true;
        }

        if (canLogin) {
            var authKey = db.get("users").find({username: username}).authKey;
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
        
        //check for a user with the same username
        var canRegister = true;   
        if (db.get("users").find({username: username})) {
            canRegister = false;
        }

        //check for empty username or password
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