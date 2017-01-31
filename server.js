var app = require('express')();
var http = require('http').Server(app);
var server = require('http').createServer();
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
    socket.on('newUser', function(user){
        console.log("New user: " + user);
        io.emit('newUser', user);
    });

    socket.on('message', function(msg){
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        if(minutes < 10) {
            minutes = '0' + minutes;
        }
        msg['date'] = hours + ":" + minutes;
        console.log(msg);
        io.emit('message', msg);
    });
});

server.listen(7080, '127.0.0.1');
