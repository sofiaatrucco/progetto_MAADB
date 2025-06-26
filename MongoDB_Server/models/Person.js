const mongoose = require('mongoose');

// Schema per rappresentare il documento "Person" o "User"
const Person = new mongoose.Schema({
    creationDate: {type: String, required: true},
    id: { type: Number, required: true,
        validate: {validator: Number.isInteger, message: 'ID must be an integer'}},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: false },
    birthday: {type: Date, required: false},
    locationIP: { type: String, required: false },
    browserUsed: { type: String, required: false }
});

// Setting the virtual property.
Person.set('toObject', {getters: true, virtuals: true});
//Person.set('toJSON', {getters: true, virtuals: true});
// Esportazione del modello
module.exports = mongoose.model('Person', Person, 'Person');

