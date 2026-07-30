const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static('public'));
io.on('connection', (socket) => {
    console.log('Друг подключился к чату!');
    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('Друг вышел из чата');
    });
});
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Сервер работает! Ссылка: http://localhost:${PORT}`);
});

