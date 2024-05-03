const mongoose=require("mongoose");
const bcryptjs=require("bcrypt");

const SignUp=async(req,res)=>{
      
   const userModel=mongoose.model("users");
   const{username,email,password}=req.body;

   if(!username) throw "Users FullName is Required";
   if(!email) throw "Users Email is Required";
   if(!password || password==='') throw "Users Password is Required";

   const ExistinUser=await userModel.findOne({email:email});
   if(ExistinUser) throw "User Already Exist,Try to SignIn or Use another One";

   const hashedPasword=await bcryptjs.hash(password,10);

   const newUser=await userModel.create({
    username:username,
    email:email,
    password:hashedPasword
   });

   const{password:pass,...rest}=newUser._doc;

   res.status(201).json({
    status:"Success",
    message:"New User Registered Successfully",
    user:rest
   });

  
}

module.exports=SignUp;