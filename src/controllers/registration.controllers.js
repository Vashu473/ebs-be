const registrationDatabase=require("../models/registration.model")

const registrationForm=async(req,res,next)=>{
    try {
        const{firstName,lastName,email,phone,city,zip,state,course}=req.body
        const user=await registrationDatabase.create({
            firstName,lastName,email,phone,city,zip,state,course,avatar: req?.file?.filename,
    })
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error
        })
    }
}

module.exports={
    registrationForm
}