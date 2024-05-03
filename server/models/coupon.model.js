const mongoose=require("mongoose");

const CouponSchema = new mongoose.Schema(
    {
      code: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
        default: 0,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
    }
  );

  CouponSchema.virtual("isExpired").get(function(){
    return this?.endDate < Date.now();
  });

  CouponSchema.virtual("daysLeft").get(function () {

    const daysLeft = Math.ceil((this.endDate - Date.now()) / (1000 * 60 * 60 * 24)) +  " " + "Days left";

    return daysLeft;
    
  });

  CouponSchema.pre("validate",function(next){
    if(this.endDate<this.startDate){
      next(new Error("Start Date should be less than End Date"));
    }else{
      next();
    }
  });

  CouponSchema.pre("validate",function(next){
    if(this.startDate < Date.now()){
      next(new Error("Start Date cannot be less than today!"));
    }else{
      next();
    }
  });

  CouponSchema.pre("validate",function(next){
    if(this.endDate < Date.now()){
      next(new Error("End Date cannot be less than today!"));
    }else{
      next();
    }
  });

  CouponSchema.pre("validate",function(next){
    if(this.discount<0 || this.discount>100){
      next(new Error("Discount should be between 0 and 100"));
    }else{
      next();
    }
  });

  

  const couponModel=mongoose.model("coupons",CouponSchema);

  module.exports=couponModel;