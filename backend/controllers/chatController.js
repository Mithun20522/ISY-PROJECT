import Chat from "../models/ChatModel.js";

export const sendMessage = async(req, res) => {
    try {
        const {message, sender, roomId} = req.body;
        if(!message || !sender || !roomId){
            return res.status(400).json({message:'Please fill all details'});
        }
        const newMessage = new Chat({
            message,
            sender,
            roomId
        });
        await newMessage.save();
        return res.status(200).json({message:'message done'});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getMessages = async(req, res) => {
    try {
        const messages = await Chat.find();
        if(!messages){
            return res.status(404).json({message:'No messages yet'});
        }
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getMessagesByRoomId = async(req, res) => {
    try {
        const {id} = req.params;
        const chats = await Chat.find({roomId:id});
        if(!chats){
            return res.status(404).json({message:'No messages yet'});
        }
        return res.status(200).json(chats);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const deleteMessages = async (req, res) => {
    try {
        const {id} = req.params;
        const chats = await Chat.find({roomId:id});
        if(!chats){
            return res.status(404).json({message:'No messages yet'});
        }
        chats.map(async(chat) => {
            await Chat.findByIdAndDelete({_id:chat._id});
        })
        return res.status(200).json({message:'Chat deleted'});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}