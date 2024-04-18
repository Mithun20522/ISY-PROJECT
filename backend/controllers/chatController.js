import Chat from "../models/ChatModel.js";

export const sendMessage = async(req, res) => {
    try {
        const {message, reciever, sender} = req.body;
        if(!message || !sender || !reciever){
            return res.status(400).json({message:'Please fill all details'});
        }
        const newMessage = new Chat({
            sender,
            reciever,
            message
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