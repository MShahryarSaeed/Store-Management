const express=require("express");
const verifyUser = require("../../middleware/verifyUser");
const createOrder = require("./controllers/createOrder");

const orderRoutes=express.Router();

orderRoutes.post("/createOrder",verifyUser,createOrder);


module.exports=orderRoutes