import Member from "../models/memberModel.js";

export const addMember = async(req, res) => {
    try {
        const {username, avatar} = req.body;
        if(!username || !avatar){
            return res.status(400).json({message:'Please fill all fields'});
        }
        const member = await Member.findOne({username});
        if(member){
            return res.status(409).json({message:'username already exist!'});
        }
        const newMember = new Member({
            username,
            avatar
        });
        await newMember.save();
        return res.status(201).json({message:'Member added successfully.', newMember});

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const removeMember = async(req, res) => {
    try {
        const {id} = req.params;
        const member = await Member.findByIdAndDelete(id);
        if(!member){
            return res.status(404).json({message:'No member found'});
        }
        return res.status(200).json({message:'Member deleted successfully.'});

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getAllMembers = async(req, res) => {
    try {
        const members = await Member.find();
        if(!members){
            return res.status(404).json({message:'No members yet!'});
        }
        return res.status(200).json(members);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}