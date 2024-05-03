const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
  },
  products: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products', 
    }],
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coupon',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'canceled'],
    default: 'pending'
  }
});

module.exports = mongoose.model('orders', orderSchema);
