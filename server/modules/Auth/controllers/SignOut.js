

const SignOut=(req,res)=>{

    res.clearCookie("accessToken").status(200).json({
        status:"Success",
        message:"User Logged Out Successfully"
    })

}

module.exports=SignOut;