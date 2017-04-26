class User {
    constructor(username, passHash, authKey) {
        this.username = username;
        this.passHash = passHash;
        this.authKey = authKey;
    }

    set username(x) {
        this._username = x;
    }

    get username() {
        return this._username;
    }

    set passHash(x) {
        this._passHash = x;
    }

    get passHash() {
        return this._passHash;
    }

    set authKey(x) {
        this._authKey = x;
    }

    get authKey() {
        return this._authKey;
    }
}