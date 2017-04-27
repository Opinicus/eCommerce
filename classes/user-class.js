module.exports = class User {
    constructor(username, passHash, authKey) {
        this.username = username;
        this.passHash = passHash;
        this.authKey = authKey;
    }
}