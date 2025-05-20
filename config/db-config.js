const mongoose = require('mongoose');
const connectDb = async ()=>{
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017/contactsDB')
        console.log(`MongoDB connected: ${connect.connection.host}/${connect.connection.port}/${connect.connection.name}`);    
    } catch (error) {
        console.log("Error connecting to the database", error);
        
    }
}
module.exports = connectDb;