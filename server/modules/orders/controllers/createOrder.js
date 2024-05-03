const orderModel=require("../../../models/order.model");
const couponModel=require("../../../models/coupon.model");
const productModel=require("../../../models/productModel");
const userModel=require("../../../models/user.model");

const createOrder=async(req,res)=>{

    const{orderItems,totalPrice}=req.body;

    const {coupon}=req?.query;
    const couponFound=await couponModel.findOne({code:coupon});
    if(!couponFound) throw "Coupon Not Found";
    if(coupon?.isExpired) throw "Coupon Expired";
    const discount=couponFound?.discount/100*totalPrice;
    const totalPriceAfterDiscount=totalPrice-discount;

    if (!orderItems || orderItems.length <= 0) throw "Cart is Empty";

    const order=await orderModel.create({
        userId:req.user._id,
        orderItems:orderItems,
        totalPrice:couponFound?totalPriceAfterDiscount:totalPrice,
        coupon:couponFound?._id,
    });
    
    res.status(200).json({
        status:"Success",
        message:"Order Created Successfully",
        order:order
    });

}

module.exports=createOrder;