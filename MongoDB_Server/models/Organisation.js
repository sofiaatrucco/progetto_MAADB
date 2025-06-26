const mongoose = require('mongoose');

// Schema per rappresentare un'entità tipo "Organisation"
const Organisation = new mongoose.Schema({
    id: {type: Number,required: true,
        validate: {validator: Number.isInteger, message: 'ID must be an integer'}},
    type: {type: String,required: true},
    name: {type: String,required: true},
    url: {type: String,required: false}
});

// Setting the virtual property.
Organisation.set('toObject', {getters: true, virtuals: true});
// Esportazione del modello
module.exports = mongoose.model('Organisation', Organisation);
