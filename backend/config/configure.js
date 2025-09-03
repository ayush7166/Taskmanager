const mongoose = require('mongoose');
// require('dotenv').config();

const connection = async()=>{
    try {
        const result = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected");
        
    } catch (error) {
        console.log("Failed to connect to database: ",error);
        process.exit(1);
    }
}

connection();