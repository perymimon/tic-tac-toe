// loads environment variables from a .env file into process.env
require('dotenv').config()
const Users = require('./users');
const Games = require('./games');
const serverPort = process.env.SERVER_PORT || 4000;

const io = require('socket.io')({
    pingTimeout: 60000,
    pingInterval: 12000,
});
Games.attach(io);
Users.on('update', function () {
    io.sockets.emit('users-list', Users.getUsersList())
    console.log('User update');
})
Users.on('arenas-updated', function (updatedUsers) {
    for (const userid in updatedUsers) {
        const arenas = [...updatedUsers[userid]];
        io.in(userid).emit('arenas', arenas);
    }
})

function welcome(socket, user) {
    socket.join(user.id)
    socket.emit('user', user);
    const arenas = Users.getArenas(user);
    socket.emit('arenas', [...arenas]);

    socket.on('challenge', function (user2) {
        const victoryScore = 100;
        const lostScore = -1;
        if (!user) return;
        const {id, name} = user;
        const user1 = {id, name};
        const game = Games.create(user1, user2);
        Users.addArena(user1.id, user2.id, game.id);
    })
    socket.on('remove-arena', function (arenaid) {
        Users.removeArena(this.user, null, arenaid)
    })

    const users = Users.getUsersList();
    if (users.length > 0)
        socket.emit('users-list', users);

}

const dynamicNsp = io.of(/^\/game-\w+$/).on('connect', (socket) => {
    const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
    console.log(`socket connected to ${newNamespace.name}`);
});

io.on('connection', socket => {
    const userid = socket.handshake.query.uid ;

    if(userid)
    var user = socket.user = Users.get(userid);


    console.log(`connect: ${socket.id} userid: ${userid}`);

    socket.on('disconnect', () => {
        console.log(`disconnect: ${socket.id}`);
        socket.removeAllListeners('user-register')
        socket.removeAllListeners('challenge')
        socket.removeAllListeners('remove-arena')
        socket.removeAllListeners('hello')

    });
    socket.on('hello!', () => {
        console.log(`hello from ${socket.id} userid: ${userid}`);
    });

    if (user) {
        welcome(socket, user)
        return;
    }
    socket.on('user-register', function ({name}) {
        // 2-4 letters
        if (name.length < 2 || name.length > 4) return;
        user = socket.user = Users.create(name)
        welcome(socket, user);
    })

});
io.listen(serverPort);
// setInterval(() => {
//     io.emit('message', new Date().toISOString());
// }, 1000);
