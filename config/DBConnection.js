
import mongoose from "mongoose";
import { MONGO_USER, MONGO_PASS, MONGO_IPAD, MONGO_PORT }  from './config.js';

const DBConnection = async () => {
    const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_IPAD}:${MONGO_PORT}/?authSource=admin`
    try {
        const conn = await mongoose.connect(mongoUrl);
        console.log(`Connected ${conn.connection.host}db successfully....`);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        console.log("Retrying connection in 5 seconds...");
        setTimeout(DBConnection, 5000);  // 5000 ms = 5 seconds
    }
}

export default DBConnection;