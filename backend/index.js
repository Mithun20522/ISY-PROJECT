import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
import chatRouter from './routes/chatRouter.js';
import {Server} from 'socket.io'
import http from 'http'
import roomRouter from './routes/roomRouter.js';
import memberRouter from './routes/memberRouter.js';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:['POST','GET']
    }
})

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_DB_URL)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log(err))


app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);
app.use('/api/room', roomRouter);
app.use('/api/member', memberRouter);

io.on('connection', (socket) => {
    socket.on('chatMessage', (data) => {
        socket.broadcast.emit('chatMessage', {message:data.message, sender:data.sender});
    })
    socket.on('disconnect', () => {
        // console.log('User disconnected: ' + socket.id);
      });
})

server.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`);
})