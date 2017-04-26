var chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()_+-=';
var length = 60;

module.exports = function generateAuth() {
  var authKey = '';
  while (authKey.length < length) {
    var index = (Math.random() * chars.length) | 0;
    authKey += chars[index];
  }
  return authKey;
};