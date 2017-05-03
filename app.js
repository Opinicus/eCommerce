const express = require('express');
const lowdb = require("lowdb");
const app = express();  
const bodyParser = require('body-parser');

var db = lowdb("./data/data.json");

app.set('port', (process.env.PORT || 3000));
app.use(express.static('public'));
app.use('/libs', express.static('node_modules'));
app.use('/classes', express.static('classes'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function(request, response){
  response.render('public/index.html')
});

//Product controller
var productController = require("./controllers/product-controller")(db);
app.get("/api/products", productController.get);
app.get("/api/products/latest", productController.getLatest);
app.post("/api/products", productController.post);

//User controller
var userController = require("./controllers/user-controller")(db);
app.put("/api/users", userController.put);
app.post("/api/users", userController.post);
app.get("/api/users", userController.get);
app.post("/api/users/cart", userController.postInCart);

app.listen(app.get('port'), (err) => {  
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log('Server is running at http://localhost:' + app.get('port'));
});