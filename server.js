var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.listen(PORT, function (){
    console.log("Running on port " + PORT)
});