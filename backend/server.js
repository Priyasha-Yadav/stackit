const express = require('express');
const app = express();
const connectDB = require('./src/config/db.config');

const authRouter = require('./src/routes/auth.routes');
const adminRouter = require('./src/routes/admin.routes');
const PostRouter = require('./src/routes/post.routes');
const notificationRouter = require('./src/routes/notification.routes');
const replyRouter = require('./src/routes/reply.routes');
const searchRouter = require('./src/routes/search.routes');


require('dotenv').config();
app.use(express.json());

app.get('/health', (req, res) => {
    res.send('OK');
})

app.use('/api');

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/posts', PostRouter);
app.use('/notifications', notificationRouter);
app.use('/', replyRouter);
app.use('/', searchRouter);


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