import express from 'express';
import { addMember, getAllMembers, removeMember } from '../controllers/memberController.js';

const memberRouter = express.Router();

memberRouter.post('/add-member', addMember);
memberRouter.delete('/remove-member/:id', removeMember);
memberRouter.get('/get-members', getAllMembers);

export default memberRouter;