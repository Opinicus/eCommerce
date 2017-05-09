import { register } from 'loginRegisterRequest';
import { login } from 'loginRegisterRequest';
import { checkForLogged } from 'loginRegisterRequest';
import { logOut } from 'loginRegisterRequest';
/*import { put as putRequest } from 'requester';
import { post as postRequest } from 'requester';
import { get as getRequest } from 'requester'; */
import * as requests from 'requester';

describe("Data Layer Tests", () => {
  const LOCAL_STORAGE_USERNAME_KEY = 'user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'auth-key';

  const clearLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
    localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
  };

  beforeEach(clearLocalStorage);
  afterEach(clearLocalStorage);

  describe('Register tests', () => {
    let requesterPostStub;
    let cryptoJSStub;
    //const passHash = 'SOME_PASS_HASH';

    beforeEach(() => {
      requesterPostStub = sinon.stub(requests, 'post');
      cryptoJSStub = sinon.stub(CryptoJS, 'SHA256');
    });
    afterEach(() => {
      requesterPostStub.restore();
      cryptoJSStub.restore();
    });

    it('expect register to make a POST request', (done) => {
      const user = {
        username: 'Anonymous',
        password: '11111111'
      };

      const response = {
        user: user.username,
      };

      requesterPostStub.returns(Promise.resolve(response));

      register(user)
        .then(() => {
          done();
          expect(requesterPostStub).to.have.been.calledOnce;
        });


    });

    it('expect register to make a POST request to api/users', (done) => {
      const user = {
        username: 'Anonymous',
        password: '11111111'
      };

      const response = {
        user: user.username,
      };

      requesterPostStub.returns(Promise.resolve(response));

      register(user)
        .then(() => {
          done();
          expect(requesterPostStub).to.have.been.calledWith('api/users');
        });

    });

    it('expect register to make a call to CryptoJS.SHA256() once', () => {
      const user = {
        username: 'Anonymous',
        password: '11111111'
      };

      register(user)
        .then(() => {
          done();
          expect(cryptoJSStub).to.have.been.calledOnce;
        });
    });

    it('expect register to make a call to CryptoJS.SHA256() with correct parameters', () => {
      const user = {
        username: 'Anonymous',
        password: '11111111'
      };

      register(user)
        .then(() => {
          done();
          expect(cryptoJSStub).to.have.been.calledWith(user.password);
        });
    });

    it('expect register to return a Promise', () => {
      const user = {
        username: 'Anonymous',
        password: '11111111'
      };

      const result = register(user);
      expect(result).to.be.instanceOf(Promise);
    });

    /*it('expect register function to return a Promise which resolves with registered username', (done) => {
      const user = {
        username: 'Anonymous',
        password: '11111111'
      };

      const response = {
        result: {
          username: user.username,
          authKey: 'SOME_AUTH_KEY'
        }
      };

      requesterPostStub.returns(Promise.resolve(response));

      register(user)
        .then((value) => {
          const expected = {
            username: user.username
          };

          expect(value).to.deep.equal(expected);
        })
        .then(done, done);
    }); */
  });
  describe("Login tests", () => {
    let requesterPutStub;
    let cryptoJSStub;
    const passHash = 'SOME_PASS_HASH';

    beforeEach(() => {
      requesterPutStub = sinon.stub(requests, 'put');
      cryptoJSStub = sinon.stub(CryptoJS, 'SHA256')
        .returns(passHash);
    });
    afterEach(() => {
      requesterPutStub.restore();
      cryptoJSStub.restore();
    });

    it('expect login to make a PUT request', (done) => {
      const user = {
        username: 'Anonymous',
        password: '11111111'
      };

      const response = {
        user: user.username,
      };

      requesterPutStub.returns(Promise.resolve(response));

      login(user)
        .then(() => {
          done();
          expect(requesterPutStub).to.have.been.calledOnce;
        });
    });

    it('expect login to make a PUT request to api/users', (done) => {
      const user = {
        username: 'Anonymous',
        password: '11111111'
      };

      const response = {
        user: user.username,
      };

      requesterPutStub.returns(Promise.resolve(response));

      login(user)
        .then(() => {
          done();
          expect(requesterPutStub).to.have.been.calledWith('api/users');
        });
    });

    it('expect login to make a call to Crypto.SHA256 once', (done) => {
      const user = {
        username: 'Anonymous',
        password: '11111111'
      };

      const response = {
        user: user.username,
      };

      requesterPutStub.returns(Promise.resolve(response));

      login(user)
        .then(() => {
          done();
          expect(crypto).to.have.been.calledOnce;
        });
    });

    it('expect login to make a call to Crypto.SHA256 with correct parameters', (done) => {
      const user = {
        username: 'Anonymous',
        password: '11111111'
      };

      const response = {
        user: user.username,
      };

      requesterPutStub.returns(Promise.resolve(response));

      login(user)
        .then(() => {
          done();
          expect(crypto).to.have.been.calledWith(user.password);
        });
    });

    it('expect login to return a Promise', () => {
      const user = {
        username: 'Anonymous',
        password: '11111111'
      };

      const response = {
        user: user.username,
      };

      requesterPutStub.returns(Promise.resolve(response));

      var result = login(user);
      expect(result).to.be.an.instanceOf(Promise);
    });

    it('expect auth-key to be set in localStorage', (done) => {
      const user = {
        username: 'Anonymous',
        password: '11111111'
      };

      const response = {
        result: {
          username: user.username,
          authKey: 'SOME_AUTH_KEY'
        }
      };

      requesterPutStub.returns(Promise.resolve(response));

      login(user)
        .then(() => {
          expect(localStorage.getItem('auth-key')).be.a('string');
        })
        .then(done, done);
    });
  });

  describe('checkForLogged function tests', () => {
    it('expect checkForLogged to return false when no auth-key is given', () => {
      expect(checkForLogged()).to.be.false;
    });

    it('expect checkForLogged() to return false when authKey is missing from localStorage', () => {
      localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, 'anonymous');
      expect(checkForLogged()).to.be.false;
    });

    it('expect checkForLogged() to return false when user is missing from localStorage', () => {
      localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, 'ANOTHER_BLQ_AUTH_KEY');
      expect(checkForLogged()).to.be.false;
    });

    it('expect checkForLogged() to return true when both username and authKey are available in localStorage', () => {
      localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, 'Anonymous');
      localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, 'ANOTHER_BLQ_AUTH_KEY');
      expect(checkForLogged()).to.be.true;
    });
  });
});