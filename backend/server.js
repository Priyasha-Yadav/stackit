const express = require('express');
const app = express();
const connectDB = require('./src/config/db.config');

require('dotenv').config();
app.use(express.json());

app.get('/health', (req, res) => {
    res.send('OK');
})

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        })
    }
    catch (e) {
        console.error('Failed to start server', e.message);
        process.exit(1);
    }
}

startServer();