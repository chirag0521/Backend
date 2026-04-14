const mongoose = require("mongoose")


//USING THEN
// function connectToDb(){
//     mongoose.connect(process.env.MONGO_URI)
//     .then(()=>{
//         console.log("Connected to DB");

//     })
// }


//USING ASYNC AND AWAIT
async function connectToDb() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to DB");
}

module.exports = connectToDb