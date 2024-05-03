const couponModel = require("../../../models/coupon.model");


// Create a new coupon (POST request to '/coupons')
const createCoupon = async (req, res) => {

    const { code, startDate, endDate, discount } = req.body;


    if (!code || !discount) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const newCoupon = await couponModel.create({
            code: code,
            startDate: startDate,
            endDate: endDate,
            discount: discount,
            userId: req.user._id
        })

        res.status(201).json({
            status: "Success",
            message: "Coupon Created Successfully",
            coupon: newCoupon
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all coupons (GET request to '/coupons') - for admins
const GetAllCoupons = async (req, res) => {

    try {

        const coupons = await couponModel.find({});

        res.status(200).json({
            status: "Success",
            message: "Coupons Fetched Successfully",
            coupons: coupons
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

};

// Get a specific coupon (GET request to '/coupons/:couponId')
const GetSingleCoupon = async (req, res) => {

    const { couponId } = req.params;

    try {

        const coupon = await couponModel.findById(couponId);

        if (!coupon) throw "Coupon not found";

        res.status(200).json({
            status: "Success",
            message: "Coupon Fetched Successfully",
            coupon: coupon
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a coupon (PUT request to '/coupons/:couponId')
const updateCoupon = async (req, res) => {

    const { couponId } = req.params;
    const { code, startDate, endDate, discount } = req.body;



    try {

        const updatedCoupon = await couponModel.findByIdAndUpdate(
            couponId,
            {
                $set:
                {
                    code:code,
                    startDate:startDate,
                    endDate:endDate,
                    discount:discount
                }
            },
            {
                new: true
            }
        );

        if (!updatedCoupon) throw "Coupon not found"
        res.status(200).json(updatedCoupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a coupon (DELETE request to '/coupons/:couponId')
const DeleteCoupon= async (req, res) => {

    const { couponId } = req.params;

    try {

        const deletedCoupon = await couponModel.findByIdAndDelete(couponId);

        if (!deletedCoupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.status(200).json({ 
            status: "Success",
            message: 'Coupon deleted',
            deletedCoupon:deletedCoupon
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createCoupon, GetAllCoupons,GetSingleCoupon,updateCoupon,DeleteCoupon };
