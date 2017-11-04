var http = require("http");
var app = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


http.createServer(function(request, response){

    if(request.url=="/something"){
        console.log(">> Something");
    }
    else{
        console.log(">> Something else");
    }
    response.end();
}).listen(3000);