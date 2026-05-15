import mongoose from "mongoose";

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server is connected to DB");
    })
}

export default connectToDb