const mongoose=require("mongoose");
const bcryptjs=require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");


const SignIn=async(req,res)=>{

    const userModel=mongoose.model("users");
    const{email,password}=req.body;

    const getUser=await userModel.findOne({email:email});
    if(!getUser) throw "User Not Found";

    const comparePassword=await bcryptjs.compare(password,getUser.password);
    
    // if(!comparePassword)throw "Invalid Password";
    if(!comparePassword){
      return  res.status(400).json({
            status:"Failed",
            error:"Invalid Password"
        })
    }

    // jwtManager is our custom function
    const accessToken=jwtManager(getUser);

    const{password:pass,...rest}=getUser._doc;

    res.cookie('accessToken',accessToken,{httpOnlye:true}).status(200).json({
        status:"Success",
        message:"User Logged In Successfully",
        user:rest
    });

}

module.exports=SignIn;