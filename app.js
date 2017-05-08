const express = require('express');
const lowdb = require("lowdb");
const app = express();  
const bodyParser = require('body-parser');
const aws = require('aws-sdk');

const S3_BUCKET = process.env.S3_BUCKET;

var db = lowdb("./data/data.json");
db._.mixin(require('underscore-db'));

app.set('port', (process.env.PORT || 3000));
app.use(express.static('public'));
app.use('/libs', express.static('node_modules'));
app.use('/classes', express.static('classes'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());



app.get('/', function(request, response){
  response.render('public/index.html');
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
app.delete("/api/users/cart", userController.removeFromCart);


// FIX: missing credentions
app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  console.log(S3_BUCKET);
  const s3Params = {
    Bucket: "opinicus-bucket",
    Key: fileName,
    Expires: 120,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.listen(app.get('port'), (err) => {  
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log('Server is running at http://localhost:' + app.get('port'));
});