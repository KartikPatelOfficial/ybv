const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
        make: {type: String, required: true},
        model: {type: String, required: true},
        year: {type: Number, required: true},
        vin: {type: String, required: true},
        userId: {type: String, required: true}
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;


