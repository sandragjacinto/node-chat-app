const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app); //behind scenes express uses http, we need to create a server using http
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app')); //emits to a single connection

    socket.broadcast.emit('newMessage',  generateMessage('Admin', 'New user joined')); 

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // emits an event to every single connection
        io.emit ('newMessage', generateMessage(message.from, message.text));

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