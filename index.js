import express from 'express';
import os from "os";
import RootRouter from './routes/index.js';
import DBConnection from './config/DBConnection.js';

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use('/api', RootRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the Express server! development v2 ' + os.hostname);
})

app.listen(PORT, () => {
    DBConnection()
    console.log(`Express server listening ${PORT}`)
});