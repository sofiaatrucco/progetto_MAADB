const mongoose = require('mongoose');

// Schema per rappresentare il documento "Country"
const Place = new mongoose.Schema({
    id: {type: Number, required: true,
        validate: {validator: Number.isInteger, message: 'ID must be an integer'}},
    name: {type: String, required: true},
    url: {type: String, required: false},
    type: {type: String,required: true}
});

// Setting the virtual property.
Place.set('toObject', {getters: true, virtuals: true});
// Esportazione del modello
module.exports = mongoose.model('Place', Place);
