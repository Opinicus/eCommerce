var chai = require('..\\node_modules\\chai\\chai.js');
var expect = chai.expect;
var mocha = require('..\\node_modules\\mocha\\mocha.js');


function login() {
    var $username = $("#username-field").val();
    var $password = $("#password-field").val();
    var passHash = CryptoJS.SHA256($password);
    passHash = passHash.toString();

    putRequest("/api/users", { username: $username, passHash: passHash })
        .then(value => {
            //welcome msg here


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

        });
}

describe('Test',()=>{
    it('Some test', ()=>{
        expect(login).to.be.a('function');
    });
});