import { register } from 'loginRegisterRequest';
import { login } from 'loginRegisterRequest';
import { put as putRequest } from 'requester';
import { post as postRequest } from 'requester';
import { get as getRequest } from 'requester'; 

describe("Data Layer Tests", () => {
  const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

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
      requesterPostStub = sinon.stub('postRequest');
      cryptoJSStub = sinon.stub(CryptoJS, 'SHA256');
    });
    afterEach(() => {
      requesterPostStub.restore();
      cryptoJSStub.restore();
    });

    it('expect register to make a POST request', (done) => {
      const user = {
        username: 'testuser',
        password: '123456'
      };

      const response = {
        user : user.username,
      };
      
     // requesterPostStub.returns(Promise.resolve(response));
      register()
        .then(()=>{
          expect(requesterPostStub).to.have.been.calledOnce;
        })
        .then(done,done);
        
    });
    it('CryptoJS test',()=>{
      const password = 'admin';
      const passHash = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';
      expect(cryptoJSStub(password).toString()).to.equal(passHash);
    })
  });
});