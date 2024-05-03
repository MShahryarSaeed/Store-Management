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