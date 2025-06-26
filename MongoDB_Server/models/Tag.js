const mongoose = require('mongoose');

// Schema per rappresentare una semplice entità con id, name e url
const Tag = new mongoose.Schema({
    id: {type: Number, required: true,
        validate: {validator: Number.isInteger, message: 'ID must be an integer'}},
    name: {type: String, required: true},
    url: {type: String, required: false}
});

// Setting the virtual property.
Tag.set('toObject', {getters: true, virtuals: true});
// Esportazione del modello
module.exports = mongoose.model('Tag', Tag);
