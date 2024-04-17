import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String,
        required:true
    }
},{timestamps:true});

const Member = mongoose.model('Member', memberSchema);

export default Member;
