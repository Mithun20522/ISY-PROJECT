import Room from "../models/roomModel.js";

export const createRoom = async(req, res) => {
    try {
        const {roomTitle, members} = req.body;
        if(!roomTitle){
            return res.status(400).json({message:'title is mandatory'});
        }
        const room = await Room.findOne({roomTitle});
        if(room){
            return res.status(409).json({message:'Room already exist with this title'});
        }

        const newRoom = new Room({
            roomTitle,
            members
        });

        await newRoom.save();
        return res.status(201).json({message:'room created succcessfully.', newRoom});

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getAllRooms = async(req, res) => {
    try {
        const rooms = await Room.find();
        if(!rooms || rooms.length === 0){
            return res.status(404).json({message:'Sorry you have no rooms yet!'});
        }
        return res.status(200).json(rooms);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getRoom = async(req, res) => {
    try {
        const {id} = req.params;
        const room = await Room.findById({_id:id});
        if(!room){
            return res.status(404).json({message:'No room found!'});
        }
        return res.status(200).json(room);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const deleteRoom = async(req, res) => {
    try {
        const {id} = req.params;
        const room = await Room.findByIdAndDelete(id);
        if(!room){
            return res.status(404).json({message:'No room found'});
        }
        return res.status(200).json({message:'Room deleted successfully.'});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const updateRoom = async(req, res) => {
    try {
        const {id} = req.params;
        const updatedDetail = req.body;
        const room = await Room.findByIdAndUpdate(id,updatedDetail,{new:true});
        if(!room){
            return res.status(404).json({message:'No room found'});
        }
        return res.status(200).json({message:'member added',room});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

