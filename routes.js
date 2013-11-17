var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

exports.route = function(request, response){
  var uri = url.parse(request.url).pathname
  , filename = path.join(__dirname, uri);

console.log("Request received for filename = " + filename);
  fs.exists(filename, function(exists) {
  if(!exists) {
    console.log("404: File " + filename + " not found"); 
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found\n");
    response.end();
    return;
  }

  //Set content types
  if(filename.indexOf('m3u8') >= 0){
    //Video Index file
    response.writeHead(200, {"Content-Type": "audio/x-mpegurl"});
  }else if(filename.indexOf('ts') >= 0){
    //Video file
      response.writeHead(200, {"Content-Type": "video/MP2T"});
  }else if(filename.indexOf('json') >= 0){
    //json file
      response.writeHead(200, {"Content-Type": "application/json"});
  }

  //Read the file
  fs.readFile(filename, "binary", function(err, file) {
    if(err) {       
      console.log("Invalid file"); 
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(err + "\n");
      response.end();
      return;
    }
    response.write(file, "binary");
    response.end();

    });
  });

}
