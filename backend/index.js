import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
import chatRouter from './routes/chatRouter.js';
import {Server} from 'socket.io'
import http from 'http'
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

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconned',() => {
        console.log('user disconnect');
    })
})

server.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`);
})