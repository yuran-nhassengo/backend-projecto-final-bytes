const mongoose = require("mongoose");


const connectDB = async () =>{

    try{

        const connect = await mongoose.connect(process.env.MONGO_URL);

        console.log(`Base de dados connectada: ${connect.connection.host}`)

    }catch(err){
        console.log(err);
    }
}