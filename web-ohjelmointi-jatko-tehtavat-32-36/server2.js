// npm install express
var express = require('express');
var app=express();

// npm install body-parser
var bodyParser = require('body-parser');
var productController = require('./productController');
var productTypeController = require('./productTypeController');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3001;

//CORS middleware Cross-Origin Resource Sharing 
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

console.log("Hello");

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// REST API Tuote
app.route('/Tuote')
    .get(productController.fetchAll)
    .post(productController.create);

app.route('/Tuote/:id')
    .put(productController.update)
    .delete(productController.delete)
    .get(productController.fetchOne);

// REST API Tuotetyyppi
app.route('/Tuotetyyppi')
    .get(productTypeController.fetchAll);
//

app.route('/task')
    .get(function(request, response){
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.end("Here are some tasks ... This is only an example of routing");     
    });

app.listen(port, hostname, () => {
  console.log(`Server running AT http://${hostname}:${port}/`);
});
