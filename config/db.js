const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ name: String, qty: Number, price: Number }],
    total: Number,
    status: { type: String, default: 'Pending' }, // e.g., Pending, Preparing, Ready, Completed
    createdAt: { type: Date, default: Date.now }
});

module.exports = {
    connectDB,
    Order: mongoose.model('Order', OrderSchema)
};