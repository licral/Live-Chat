$(document).ready(function () {
    var socket = io();
    var ready = false;
    $('body').load('login_page.html');

    $(document).on('click', '#login', function () {
        var name = $('#user-input').val();
        if (name != '') {
            socket.emit('join', name);
        }
    });

    socket.on('join', function(msg){
        $('#error-message').html(msg);
    });

    // $('button').on('click', '.login', function(){
    //     var name = $('#user-input').val();
    //     console.log(name);
    //     if(name != ''){
    //         socket.emit('join', name);
    //         $('#login-panel').detach();
    //         $('#chat-panel').show();
    //         ready = true;
    //     }
    // });

    // $('#send').click(function(){
    //     var msg = $('#message-input').val();
    //     if(msg != ''){
    //         socket.emit('send', msg);
    //         $('#message-input').val('');
    //     }
    // });
    //
    // socket.on('update', function(msg){
    //     if(ready == true){
    //         $('#messages').append('<li><b>' + msg + '</b></li>');
    //     }
    // });
    //
    // socket.on('chat', function(user, msg){
    //     if(ready == true){
    //         $('#messages').append('<li><b>' + user + '</b>: ' + msg + '</li>');
    //     }
    // });
});