SystemJS.config({
 // tell SystemJS which transpiler to use
 transpiler: 'plugin-babel',

 // tell SystemJS where to look for the dependencies

 map:{
  'plugin-babel': 
  '../../libs/systemjs-plugin-babel/plugin-babel.js',
  'systemjs-babel-build': 
  '../../libs/systemjs-plugin-babel/systemjs-babel-browser.js',

  // app start script
  'main': '../scripts/main.js',
  'requester' : '../scripts/requester.js',
  'loadTemplate':'../scripts/load-template.js',
  'loginRegisterPopUp':'../scripts/login-register-popup.js',
  'showCartProductsPopUp': '../scripts/show-cart-products-popup.js',
  'loginRegisterRequest': '../scripts/login-register-request.js',
  'checkForAdmin': '../scripts/check-for-admin.js',
  "showShoppingCart": "../scripts/show-shopping-cart.js",
  "sessionCartClass": "../classes/session-cart-class.js",
  'addToCart': '../scripts/add-to-cart.js',
  'removeFromCart': '../scripts/remove-from-cart.js',
  'showSelectedProductImage':'../scripts/show-selected-product-image.js',
  'tests' : '/tests.js',

  //Library files
  
  'handlebars': '../bower_components/handlebars/handlebars.js',
  'jquery' : '../bower_components/jquery/dist/jquery.js',
  'bootstrap' : 'bower_components/bootstrap/dist/js/bootstrap.js',
  'navigo' : '../bower_components/navigo/lib/navigo.js',
  'cryptojs': '../bower_components/crypto-js/crypto-js.js',
  'toastr' : '../bower_components/toastr/toastr.js',
  'mocha' : '../../libs/mocha/mocha.js',
  'chai' : '../../libs/chai/chai.js',
  'sinon' : '../../libs/sinon/pkg/sinon.js',
  'sinon-chai' : '../../libs/sinon-chai/lib/sinon-chai.js',
 }
});

//System.import("tests");