import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomTitle:{
        type:String,
        required:true,
        unique:true
    },
    members:{
        type:Array
    }
},{timestamps:true});

const Room = mongoose.model('Room', roomSchema);

export default Room;