module.exports = function(io){
    io.on('connection', (socket)=> {
        //// here we r get refresh event on submit post form
        socket.on('refresh', (data)=> {
            //// he we r created refreshPage event for avoiding refreshing page again n again
            io.emit('refreshPage', {});
        })
    })
}