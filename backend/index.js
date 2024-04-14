import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_DB_URL)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log(err))


app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`);
})