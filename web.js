var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var port = process.env.PORT || 3000;
var routes = require('./routes').route;


console.log("Running node server");

http.createServer(function(request, response) {

  //route request
  routes(request, response);

}).listen(parseInt(port, 10));
