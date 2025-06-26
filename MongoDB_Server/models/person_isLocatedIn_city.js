const mongoose = require('mongoose');

// Schema per rappresentare la relazione person_isLocatedIn_city
const person_isLocatedIn_city = new mongoose.Schema({
    creationDate: { type: Date, required: true },
    person_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
    place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true }
});

person_isLocatedIn_city.set('toObject', { getters: true, virtuals: true });

// Esportazione del modello
module.exports = mongoose.model('person_isLocatedIn_city', person_isLocatedIn_city);
