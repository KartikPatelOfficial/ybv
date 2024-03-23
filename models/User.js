const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    vehicleIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }]
});

const User = mongoose.model('User', userSchema);

module.exports = {User};
