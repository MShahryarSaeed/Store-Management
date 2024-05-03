require("dotenv").config();
require("express-async-errors");
const express=require("express");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const errorHandler = require("./handlers/errorHandler");
const authRoutes = require("./modules/Auth/auth.routes");
const productRoutes = require("./modules/products/products.routes");
const orderRoutes = require("./modules/orders/orders.routes");
const couponRoutes = require("./modules/coupons/coupon.routes");


// App initialization
const app=express();

// Stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.ENDPOINTSECRET;

app.post('/webhook', express.raw({type: 'application/json'}),async (request, response) => {
  
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log("Err :",err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if(event.type === 'checkout.session.completed'){
    //update the order
    const session=event.data.object;
    const{orderId}=session.metadata;
    const paymentStatus=session.payment_status;
    const paymentMethod=session.payment_method_types[0];
    const totalAmount=session.amount_total;
    const currency=session.currency;
    const orderModel=mongoose.model("orders");

    const order=await orderModel.findByIdAndUpdate(
      JSON.parse(orderId),
      {
        $set:{
          totalPrice:totalAmount/100,
          paymentMethod:paymentMethod,
          paymentStatus:paymentStatus,
          currency:currency
        }
      },
      {
        new:true
      }
    );

    console.log("Order Detail :",order);


  }else{
    return;
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connection with Database
mongoose.connect('mongodb://localhost:27017/StoreManagement',{})
.then(()=>console.log(`Connected to MongoDB Successfully`))
.catch((error)=>console.log(`Error While Connecting to Database`,error));


// Models
require("./models/user.model");
require("./models/productModel");
require("./models/order.model");
require("./models/subscription.model");
require("./models/coupon.model");

// Modules
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/coupons",couponRoutes);

// errorHandler
app.use(errorHandler);


// Server initialization
app.listen(process.env.PORT,()=>console.log(`Server is Listening on http://localhost:${process.env.PORT}`))