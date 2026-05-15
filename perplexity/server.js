import app from "./src/app.js";
import dotenv from "dotenv";
import connectToDb from "./src/config/database.js";

/**
 * @remember  = we can directly config env like = imoprt "dotenv/config" so now no need to do dotenv.config
 */
dotenv.config()


connectToDb()

app.listen(3000, () => {
    console.log("Server is running on port 3000");

})
