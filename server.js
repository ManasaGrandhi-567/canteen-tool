// filepath: canteen-backend/server.js
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

// Verify MongoDB URI
if (!process.env.MONGODB_URI) {
    console.error('MongoDB URI is not defined in environment variables');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Example: The login form HTML should be placed in 'public/login.html', not in this server.js file.