import express from 'express';
import { getMessages, sendMessage } from '../controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.post('/sendmessage', sendMessage);
chatRouter.get('/getmessages', getMessages);

export default chatRouter;