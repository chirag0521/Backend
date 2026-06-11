/**
 * @remember  = we can directly config env like = imoprt "dotenv/config" so now no need to do dotenv.config
 */
import "dotenv/config";


import app from "./src/app.js";
import connectToDb from "./src/config/database.js";
import http from "http"
import { initSocket } from "./src/sockets/server.socket.js"

const httpServer = http.createServer(app)

initSocket(httpServer)

connectToDb()

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");

})
