import User from "../models/User.js"


//Get Pending Owners

export const getPendingOwners = async(req,res)=>{
    try{
        const owners = await User.find({
            role: "owner",
            isApproved: false,
        }).select("-password");
        res.status(200).json(owners);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};


//Approve Owner

export const approveOwner = async (req,res)=>{
    try{
        const owner = await User.findById(req.params.id);
        if(!owner || owner.role !== "owner"){
            return res.status(404).json({message:"Owner not found"});
        }
        owner.isApproved = true;
        await owner.save();

        res.status(200).json({
            message: "Owner Approved",
            owner,
        });
    }catch(error){
        res.status(500).json({message: error.message});
    }
};