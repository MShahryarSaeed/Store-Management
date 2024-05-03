const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderModel=require("../../../models/order.model");
const couponModel=require("../../../models/coupon.model");
const productModel=require("../../../models/productModel");
const userModel=require("../../../models/user.model");

const createOrder=async(req,res)=>{

    // Getting the orderItems and totalPrice from body
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

    const convertedOrders=orderItems.map((order)=>{
        return {
            price_data:{
                currency:"usd",
                product_data:{
                    name:order.name,
                    description:order.description
                },
                unit_amount:order.price
            },
            quantity:order.quantity
        }
    });

    const session=await stripe.checkout.session.create({
        line_items: convertedOrders,
        metadata: {
            orderId: JSON.stringify(order?._id),
        },
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    })

    res.send({url:session.url})
    
    // res.status(200).json({
    //     status:"Success",
    //     message:"Order Created Successfully",
    //     order:order
    // });

}

module.exports=createOrder;