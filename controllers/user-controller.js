module.exports = function (db) {
    function put(request, response) {
        var username = request.body.username;
        var passHash = request.body.passHash;

        var canLogin = false;

        var allUsersObjects = db.get("users").value();

        if (allUsersObjects.find(u => u.username === username && u.passHash === passHash)) {
            canLogin =  true;
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