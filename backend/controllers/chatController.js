
export const sendMessage = async(req, res) => {
    try {
        const {message, reciever, sender} = req.body;
        // if(!message || !reciever || !sender){
        //     return res.status(400).json({message:'please fill all details'});
        // }
        console.log(req.body);
        return res.json({message:'All done'});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}