$(document).ready(function () {
    var socket = io();
    var ready = false;
    $('#chat-panel').hide();

    $('#login').click(function(){
        var name = $('#user-input').val();
        if(name != ''){
            socket.emit('join', name);
            $('#login-panel').detach();
            $('#chat-panel').show();
            ready = true;
        }
    });

    $('#send').click(function(){
        var msg = $('#message-input').val();
        if(msg != ''){
            socket.emit('send', msg);
            $('#message-input').val('');
        }
    });

    socket.on('update', function(msg){
        if(ready == true){
            $('#messages').append('<li><b>' + msg + '</b></li>');
        }
    });

    socket.on('chat', function(user, msg){
        if(ready == true){
            $('#messages').append('<li><b>' + user + '</b>: ' + msg + '</li>');
        }
    });
});