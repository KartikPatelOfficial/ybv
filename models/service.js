const mongoose = require('mongoose');

const categories = [
    "Services",
    "Interiors",
    "Damage",
    "Insurance",
    "Others"
];

const carServiceSchema = new mongoose.Schema({
        title: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        imageUrl: {type: String, required: true},
        category: {
            type: String,
            required: true,
            enum: categories // Restrict category to the predefined list
        }
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

const CarService = mongoose.model('CarService', carServiceSchema);

module.exports = CarService;
