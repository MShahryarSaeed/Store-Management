const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required"],
    },
    email: {
        type: String,
        required: [true, "Users Email is Required"],
        unique:true
    },
    password: {
        type: String,
        required: [true, "Users Password is Required"],
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
});

const userModel=mongoose.model("users",userSchema);

module.exports=userModel;