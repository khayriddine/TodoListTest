var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
    fs.readFile('./index.html','utf-8',function(err,content){
        res.writeHead(200,{ "content-type":"text/html" });
        res.end(content);
    });
});

var io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket){
    console.log('Un client est maintenant connecté !');
    socket.on('pseudo',function(pseudo){
        socket.pseudo = pseudo;
    });
    socket.on('message',function(message){
        socket.broadcast.emit('message',{from:socket.pseudo , contenu:message});
    })
});


server.listen(process.env.PORT ||1234);
