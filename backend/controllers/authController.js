import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async(req, res) => {
    try {
        const userDetails = req.body;
        if(!userDetails.email || !userDetails.password || !userDetails.username){
            return res.status(400).json({message:'Please fill all details'});
        }
        const user = await User.findOne({email:userDetails.email});
        if(user){
            return res.status(409).json({message:"Email already registered"});
        }
        const hashPass = bcrypt.hashSync(userDetails.password, 10);

        const newUserDetails = new User({
            username:userDetails.username,
            email:userDetails.email,
            password:hashPass
        });

        await newUserDetails.save();
        return res.status(201).json({message:'User created successfully'});

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const signin = async(req, res) => {
    try {
        const userDetails = req.body;
        if(!userDetails.email || !userDetails.password){
            return res.status(400).json({message:'Please fill all details'});
        }
        const user = await User.findOne({email:userDetails.email});
        if(!user){
            return res.status(404).json({message:"No account found"});
        }
        const isValidUser = bcrypt.compareSync(userDetails.password, user.password);
        if(!isValidUser){
            return res.status(400).json({message:'Wrong credentials'})
        }
        const access_token = jwt.sign({_id:user._id, isAdmin:user.isAdmin}, process.env.SECRET_TOKEN_KEY,{expiresIn:'2h'});
        const { password:pass,...rest } = user._doc;

        return res.status(200).cookie('access_token', access_token, {httpOnly:true}).json({rest, message:'login successfull'});

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const signout = (req, res) => {
    try {
        res.status(200).clearCookie('access_token').json({message:'logout successfull'});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}