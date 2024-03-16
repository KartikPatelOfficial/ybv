const mongoose = require('mongoose');

const damagePhotoSchema = new mongoose.Schema({
    id: {type: String, required: true},
    imageUrl: {type: String, required: true},
    description: {type: String}
});

const DamagePhoto = mongoose.model('DamagePhoto', damagePhotoSchema);


module.exports = {DamagePhoto};