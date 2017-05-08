SystemJS.config({
 // tell SystemJS which transpiler to use
 transpiler: 'plugin-babel',
 // tell SystemJS where to look for the dependencies

 map: {
  'plugin-babel': 
  'libs/systemjs-plugin-babel/plugin-babel.js',
  'systemjs-babel-build': 
  'libs/systemjs-plugin-babel/systemjs-babel-browser.js',

  // app start script
  'main': 'scripts/main.js',
  'requester': 'scripts/requester.js',
  'loadTemplate': 'scripts/load-template.js',
  'loginRegisterPopUp': 'scripts/login-register-popup.js',
  'showCartProductsPopUp': 'scripts/show-cart-products-popup.js',
  'loginRegisterRequest': 'scripts/login-register-request.js',
  'checkForAdmin': 'scripts/check-for-admin.js',
  "showShoppingCart": "scripts/show-shopping-cart.js",
  "sessionCartClass": "classes/session-cart-class.js",
  'addToCart': 'scripts/add-to-cart.js',
  
  'showSelectedProductImage': 'scripts/show-selected-product-image.js',

  //Library files
  
  'handlebars': 'bower_components/handlebars/handlebars.js',
  'jquery' : 'bower_components/jquery/dist/jquery.js',
  'bootstrap' : 'bower_components/bootstrap/dist/js/bootstrap.js',
  'navigo' : 'bower_components/navigo/lib/navigo.js',
  'cryptojs': 'bower_components/crypto-js/crypto-js.js',
  'toastr' : 'bower_components/toastr/toastr.js'

 }
});

System.import("main");