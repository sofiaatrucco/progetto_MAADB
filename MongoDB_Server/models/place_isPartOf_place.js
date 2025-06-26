const mongoose = require('mongoose');

// Schema per rappresentare la relazione place_isPartOf_place
const place_isPartOf_place = new mongoose.Schema({
    place1_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
    place2_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true }
});

place_isPartOf_place.set('toObject', { getters: true, virtuals: true });

// Esportazione del modello
module.exports = mongoose.model('place_isPartOf_place', place_isPartOf_place);
