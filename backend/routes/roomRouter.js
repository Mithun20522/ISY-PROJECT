import express from 'express';
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post('/create-room', createRoom);
roomRouter.get('/get-rooms', getAllRooms);
roomRouter.get('/get-room/:id', getRoom);
roomRouter.delete('/delete-room/:id', deleteRoom);
roomRouter.patch('/update-room/:id', updateRoom);

export default roomRouter;