const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const carServiceRoutes = require('./routes/car-service');
const userServiceRoutes = require('./routes/user');
const appointmentRoutes = require('./routes/appointment');
const vehicleRoutes = require('./routes/vehicle');
const errorHandler = require('./middlewares/error-handler');

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// Middlewares
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/car-services', carServiceRoutes);
app.use('/api/users', userServiceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/vehicles', vehicleRoutes);


app.use(errorHandler);

app.listen(3000, () => console.log('Server listening on port 3000'));
