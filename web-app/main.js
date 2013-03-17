var http = require('http'),
    node_static = require('node-static'),
    connect = require('connect');
            
var fileServer = new node_static.Server('.');

http.createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    });
}).listen(process.env.PORT);

// Put a friendly message on the terminal
console.log("Node Server running");
