const express= require('express')
const app=express()
const http= require('http').createServer(app)


const PORT = process.env.PORT||3000


http.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})

app.use(express.static(__dirname+'/LiveChart'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

//socket


const io=require('socket.io')(http)
// const users ={}

io.on('connection',(socket)=>{
    console.log('connected....')
    socket.on('message',name=>{
        // users[socket.id]=name
        socket.broadcast.emit('message',name)
    })
    // socket.on('disconnect',msg=>{
    //     socket.broadcast.emit('left',users[socket.id])
    //     delete users[socket.id]
    // })
})