const express = require('express');
const os = require('os');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASS, MONGO_IPAD, MONGO_PORT } = require('./config/config');

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware to parse JSON request bodies
app.use(express.json());

const connectDB = async () => {
    const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_IPAD}:${MONGO_PORT}/?authSource=admin`
    try {
        const conn = await mongoose.connect(mongoUrl);
        console.log(`Connected ${conn.connection.host}db successfully....`);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        console.log("Retrying connection in 5 seconds...");
        setTimeout(connectDB, 5000);  // 5000 ms = 5 seconds
    }
}

app.get('/', (req, res) => {
    res.send('Welcome to the Express server! development v2 ' + os.hostname);
})

app.get('/get-data', (req, res) => {
    res.json({ message: "hi" });
});

app.listen(PORT, () => {
    connectDB()
    console.log(`Express server listening ${PORT}`)
});