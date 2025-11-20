const express = require('express');
const connectDB = require('./config/connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/usersRoute');
const jobRoutes = require("./routes/JobRoute")
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes);


// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});