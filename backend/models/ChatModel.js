import mongoose  from 'mongoose';

const chatSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    sender:{
        type:String,
        required:true
    },
    reciever:{
        type:String,
        required:true
    }
},{timestamps:true});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
