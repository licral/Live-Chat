var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var people = {};

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

io.on('connection', function(socket){
    socket.on('join', function(name){
        if(isValidUser(name)){
            console.log(name + " Has joined");
            people[socket.id] = name;
            socket.emit('update', 'You have connected to the chat');
            // io.emit('update', name + ' has joined the chat');
        } else{
           socket.emit('join', 'Sorry this name is already taken. Please choose another one.');
        }
    });

    socket.on('send', function(msg){
        io.emit('chat', people[socket.id], msg);
    });    

    socket.on('disconnect', function(){
        io.emit('update', people[socket.id] + ' has left the chat');
        delete people[socket.id];
    });
});

function isValidUser(name){
    for(i in people){
        if(people[i]){
            return false;
        }
    }
    return true;
}