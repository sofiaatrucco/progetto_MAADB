const mongoose = require('mongoose');

// Schema per il documento "Forum"
const Forum = new mongoose.Schema({
    creationDate: { type: Date, required: true },
    id: { type: Number, required: true,
        validate: {validator: Number.isInteger, message: 'ID must be an integer'}},
    title: { type: String, required: true }
});

// Setting the virtual property.
Forum.set('toObject', {getters: true, virtuals: true});
// Esportazione del modello
module.exports = mongoose.model('Forum', Forum);
