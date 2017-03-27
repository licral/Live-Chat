var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var people = {};

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

io.on('connection', function(socket){
    socket.on('join', function(name){
        console.log(name + " Has joined");
        people[socket.id] = name;
        socket.emit('update', 'You have connected to the chat');
        io.emit('update', name + ' has joined the chat');

    });

    socket.on('send', function(msg){
        io.emit('chat', people[socket.id], msg);
    });    

    socket.on('disconnect', function(){
        io.emit('update', people[socket.id] + ' has left the chat');
        delete people[socket.id];
    });
});