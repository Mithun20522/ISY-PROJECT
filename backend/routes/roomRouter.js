import express from 'express';
import { createRoom, deleteRoom, getAllRooms } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post('/create-room', createRoom);
roomRouter.get('/get-rooms', getAllRooms);
roomRouter.delete('/delete-room/:id', deleteRoom);

export default roomRouter;