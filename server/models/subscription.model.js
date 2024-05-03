const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products', 
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'canceled', 'expired'],
    default: 'active'
  }
});

module.exports = mongoose.model('subscriptions', subscriptionSchema);
