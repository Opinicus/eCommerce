module.exports = class User {
    constructor(username, passHash, authKey, cart) {
        this.username = username;
        this.passHash = passHash;
        this.authKey = authKey;
        this.cart = cart;
    }
}