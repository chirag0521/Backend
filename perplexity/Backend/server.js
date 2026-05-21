/**
 * @remember  = we can directly config env like = imoprt "dotenv/config" so now no need to do dotenv.config
 */
import "dotenv/config";


import app from "./src/app.js";
import connectToDb from "./src/config/database.js";

import { testAi } from "./src/services/ai.service.js";

connectToDb()

app.listen(3000, () => {
    console.log("Server is running on port 3000");

})
