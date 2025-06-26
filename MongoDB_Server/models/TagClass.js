const mongoose = require('mongoose');

// Schema per rappresentare un'entità di tipo "Ontology" o "Type"
const TagClass = new mongoose.Schema({
    id: {type: Number, required: true,
        validate: {validator: Number.isInteger, message: 'ID must be an integer'}},
    name: {type: String, required: true},
    url: {type: String, required: false}
});

// Setting the virtual property.
TagClass.set('toObject', {getters: true, virtuals: true});
// Esportazione del modello
module.exports = mongoose.model('TagClass', TagClass, 'TagClass');
