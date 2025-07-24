// filepath: c:\Users\mantr\OneDrive\Desktop\canteen\canteen-backend\models\Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ name: String, qty: Number, price: Number }],
    total: Number,
    status: { type: String, default: 'Pending' }, // e.g., Pending, Preparing, Ready, Completed
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);