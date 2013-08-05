var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var port = process.env.PORT || 3000;


http.createServer(function(request, response) {
  console.log("request.url: " + request.url); 
  var uri = url.parse(request.url).pathname
  , filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists) {
  if(!exists) {
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write("404 Not Found\n");
  response.end();
  return;
  }

  if (fs.statSync(filename).isDirectory()) filename += '/index.html';

  fs.readFile(filename, "binary", function(err, file) {
  if(err) {       
    console.log("Invalid file"); 
    response.writeHead(500, {"Content-Type": "application/vnd.apple.mpegurl"});
    response.write(err + "\n");
    response.end();
  return;
  }

  if(filename.indexOf('fileSequence') >= 0){
    response.writeHead(200, {"Content-Type": "video/MP2T"});
    console.log("Video file requested");
  }else{
    console.log("here");
    console.log("file name: " + filename);
    response.writeHead(200, {"Content-Type": "audio/x-mpegurl"});
  }
  response.write(file, "binary");
  response.end();
  });
  });
}).listen(parseInt(port, 10));
