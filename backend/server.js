const express = require('express');
const app = express();
const connectDB = require('./src/config/db.config');

const authRouter = require('./src/routes/auth.routes');
const adminRouter = require('./src/routes/admin.routes');
const PostRouter = require('./src/routes/post.routes');
const notificationRouter = require('./src/routes/notification.routes');
const replyRouter = require('./src/routes/reply.routes');
const searchRouter = require('./src/routes/search.routes');

const errorHandler = require('./src/middlewares/error.middleware');

require('dotenv').config();
app.use(express.json());

app.get('/health', (req, res) => {
    res.send('OK');
})

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/posts', PostRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api', replyRouter);
app.use('/api', searchRouter);

app.use(errorHandler);

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