const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined');
        }
        
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connection established');
        });
        mongoose.connection.on('error', (e)=>{
            console.error('MongoDB error: ', e.message);
        });
        mongoose.connection.on('disconnected', () =>{
            console.warn('MongoDB disconnected');
        })
        
        await mongoose.connect(process.env.MONGO_URI);

    }
    catch (e) {
        console.error('Failed to connect database', e.message);
        process.exit(1);
    }

};

module.exports = connectDB;