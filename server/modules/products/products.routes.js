const express=require("express");
const { GetAllProducts, createProduct, GetSingleProduct, updateProduct, DeleteProduct } = require("./controllers/productCtrl");

const productRoutes=express.Router();


// Routes
productRoutes.get("/GetAllProducts",GetAllProducts);
productRoutes.post("/createProduct",createProduct);
productRoutes.get("/GetSingleProduct/:productId",GetSingleProduct);
productRoutes.put("/updateProduct/:productId",updateProduct);
productRoutes.delete("/deleteProduct/:productId",DeleteProduct);



module.exports=productRoutes