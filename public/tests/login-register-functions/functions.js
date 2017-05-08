var functions = (function () {
    const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
        LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

    /*Requester functions*/
    function request(url, type, body, headers) {
        var promise = new Promise((resolve, reject) => $.ajax({
            url: url,
            method: type,
            data: body,
            headers: headers,
            contentType: 'application/json',
            success: resolve,
            error: reject
        }
        ));
        return promise;
    }

    function getRequest(url, headers = {}) {
        return request(url, "GET", "", headers);
    }

    function postRequest(url, body, headers = {}) {
        return request(url, 'POST', JSON.stringify(body), headers);
    }

    function putRequest(url, body, headers = {}) {
        return request(url, 'PUT', JSON.stringify(body), headers);
    }

    /*Login-register functions*/
    function login() {
        var $username = $("#username-field").val();
        var $password = $("#password-field").val();
        var passHash = CryptoJS.SHA256($password);
        passHash = passHash.toString();

        return putRequest("/api/users", { username: $username, passHash: passHash })
            .then(value => {
                //welcome msg here
                toastr.success("Welcome, " + value.result.username);
                //go to home page
                window.location.hash = "/home";
                //set account username label
                $("#logged-user").text(value.result.username);
                //store authKey in localStorage
                window.localStorage.setItem("auth-key", value.result.authKey);
                //show logout button
                $("#logout-button").removeClass("hidden");
                //remove login/register buttons
                $("#login-button").addClass("hidden");
                $("#register-button").addClass("hidden");
                //hide popup and disabled-background
                $(".inner-container").addClass("hidden");
                $("#disabled-background").addClass("hidden");
            }, value => {
                //error msg here
                toastr.error("Username or password is incorrect");
            });
    }

    function register() {
        var $username = $("#username-field").val();
        var $password = $("#password-field").val();
        var passHash = CryptoJS.SHA256($password);
        passHash = passHash.toString();

        return postRequest("/api/users", { username: $username, passHash: passHash })
            .then(value => {
            //success msg
            toastr.success("Successfully registered");
            //hide popup and disabled-background
            $(".inner-container").addClass("hidden");
            $("#disabled-background").addClass("hidden");
        }, value => {
            //error msg here
            toastr.error("Username is taken or too small");
        });
    }

    function logout() {
        //empty the account username label
        $("#logged-user").text("");
        //hide logout button
        $("#logout-button").addClass("hidden");
        //add login/logout buttons
        $("#login-button").removeClass("hidden");
        $("#register-button").removeClass("hidden");
        //hide add-product-button
        $("#add-product-button").addClass("hidden");
        //delete authKey from localStorage
        window.localStorage.removeItem("auth-key");
    }

    function checkForLogged() {
        var currentAuthKey = window.localStorage.getItem("auth-key");
        if (currentAuthKey) {
            getRequest("/api/users")
                .then(value => {
                    var users = value.result.users;
                    var currentLoggedInUser = users.find(u => u.authKey === currentAuthKey);
                    //set account username label
                    $("#logged-user").text(currentLoggedInUser.username);
                });


            //show logout button
            $("#logout-button").removeClass("hidden");
            //remove login/register buttons
            $("#login-button").addClass("hidden");
            $("#register-button").addClass("hidden");
        }
        else {
            //hide logout button
            $("#logout-button").addClass("hidden");
            //add login/logout buttons
            $("#login-button").removeClass("hidden");
            $("#register-button").removeClass("hidden");
        }
    }
    return {
        login,
        register,
        logout,
        checkForLogged,
        getRequest,
        postRequest,
        putRequest,
    };
}());