import express from 'express';
import { deleteMessages, getMessages, getMessagesByRoomId, sendMessage } from '../controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.post('/sendmessage', sendMessage);
chatRouter.get('/getmessages', getMessages);
chatRouter.get('/getmessage/:id', getMessagesByRoomId);
chatRouter.delete('/deletemessage/:id', deleteMessages);

export default chatRouter;