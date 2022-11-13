const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const globalMsgRoutes = require("./routes/globalMsgRoutes")
const connectedUsersRouter = require ("./routes/connectedUsersRoutes")
const app = express();

require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(globalMsgRoutes)
app.use(connectedUsersRouter)

mongoose.connect(process.env.MONGO_URL, {
    dbName: 'P-Chat',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connection Successfull")
}).catch((err) => {
    console.log(err.message)
})

const server = app.listen(process.env.PORT, () => {
    console.log('Server Started on PORT: ' + process.env.PORT)
})

const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});

io.on("connection", (socket) => {
    socket.on('message', (message) => {
        socket.broadcast.emit('message', message)
    })

    socket.on('user-on', (user) => {
        socket.broadcast.emit('user-on', user)
    })

    socket.on('user-off', (user) => {
        socket.broadcast.emit('user-off', user)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })

    socket.on('noTyping', (data) =>{
        socket.broadcast.emit('noTyping', data)
    })

    socket.on('all-disconnected', (data) => {
        console.log(data)
        socket.broadcast.emit('all-disconnected', data)
    })

    socket.on('clean-global-chat', (data) => {
        console.log(data)
        socket.broadcast.emit('clean-global-chat', data)
    })
});
