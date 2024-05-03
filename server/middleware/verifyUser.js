const jsonwebtoken=require("jsonwebtoken");

const verifyUser=(req,res,next)=>{

    const accessToken=req.cookies.accessToken;

    if(!accessToken) throw "AccessToken is Required";

    jsonwebtoken.verify(accessToken,process.env.JWT_SECRET,(error,user)=>{

        if(error){
            return res.status(401).json({
                status:"Failed",
                error:"Unauthorized Access"
            })
        }

        req.user=user;
        next();
        
    })


}

module.exports=verifyUser;


// (error, user) => { ... }: This is a callback function that will be called once the verification process is complete. It takes two parameters:
// error: If an error occurs during verification, it will be passed to this parameter.
// user: If the token is successfully verified, the decoded user information (contained in the JWT payload) will be passed to this parameter.