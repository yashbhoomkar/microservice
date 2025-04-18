const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();
console.log("1")
const app = express();
console.log("2")
app.use(express.json());
app.use(cors({ origin: '*' })); // Allow all origins


app.use((err, req, res, next) => {
    console.error('Error:', err); // Enhanced logging
    res.status(500).json({ message: 'Something went wrong' });
});
console.log("3")

app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log("4")