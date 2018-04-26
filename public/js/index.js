var socket = io(); //initiating the request

socket.on('connect', function () {
    console.log('Connected to server');

    // we want to emit email once we are connected
    socket.emit('createMessage', {
        from: 'sandra',
        text: 'Hello!'
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('You recieved a new message', message);
});