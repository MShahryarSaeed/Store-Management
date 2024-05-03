const express=require("express");
const verifyUser = require("../../middleware/verifyUser");
const { createCoupon, GetAllCoupons, GetSingleCoupon, updateCoupon, DeleteCoupon } = require("./controllers/couponCtrls");

const couponRoutes=express.Router();

// Routes
couponRoutes.get("/GetAllCoupons",verifyUser,GetAllCoupons);
couponRoutes.post("/createCoupon",verifyUser,createCoupon);
couponRoutes.get("/GetSingleCoupon/:couponId",verifyUser,GetSingleCoupon);
couponRoutes.put("/updateCoupon/:couponId",verifyUser,updateCoupon);
couponRoutes.delete("/DeleteCoupon/:couponId",verifyUser,DeleteCoupon)


module.exports=couponRoutes;