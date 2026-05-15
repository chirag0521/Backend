import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";


const httpServer = createServer(app)
const io = new Server(httpServer, {});

io.on("connection", (socket) => {

    console.log("new connection established");

    socket.on("message",(clientMsg)=>{
        console.log("User fired message event");
        console.log(clientMsg)
        io.emit("abc")
    })

})

// socket.emit()
// socket.broadcast.emit()
// io.emit()

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
})