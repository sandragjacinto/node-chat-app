const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app); //behind scenes express uses http, we need to create a server using http
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat App',
        createdAt: new Date()
    }); //emits to a single connection

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date()
    }); 

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // emits an event to every single connection
        io.emit ('newMessage', {
            form: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        // sends to everybody but the present socket
        // socket.broadcast.emit('newMessage', {
        //     orm: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


server.listen(port, () => {
    console.log(`Started at port ${port}`);
});