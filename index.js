const express = require('express');

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Express server! in production');
})

app.listen(PORT, () => console.log(`Express server listening ${PORT}`));