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

    socket.on('join', function (msg) {
        $('#error-message').html(msg);
    });

    socket.on('success', function (msg) {
        $('body').load('chat_page.html', function () {
            console.log('body loaded');
            $('#messages').append('<li><b>' + msg + '</b></li>');
        });
    });

    socket.on('update', function (msg) {
        $('#messages').append('<li><b>' + msg + '</b></li>');
    });

    $(document).on('click', '#send', function () {
        var msg = $('#message-input').val();
        if (msg != '') {
            socket.emit('send', msg);
            $('#message-input').val('');
        }
    });

    socket.on('chat', function (user, msg) {
        $('#messages').append('<li><b>' + user + '</b>: ' + msg + '</li>');
    });

    // socket.on('disconnect', function(){
    //     location.reload();
    //     $('#error-message').html("Server is down");
    // });
});