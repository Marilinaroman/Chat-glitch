const express = require('express')
const {Server}= require('socket.io')

const app = express()

const PORT = process.env.PORT|| 8080

const server = app.listen(PORT, ()=>console.log(`Server ${PORT}`))

const io = new Server(server)

app.use(express.static(__dirname+'/public'))

let msjHistoricos = []

io.on('connection',(socket)=>{
    console.log('nuevo usuario', socket.id);

    socket.broadcast.emit('newUser')

    socket.on('message', data=>{
        console.log(data);
        msjHistoricos.push(data)

        //manda msj a todos los clientes
        io.sockets.emit('historico', msjHistoricos)
    })
})