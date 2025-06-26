const mongoose = require('mongoose');

// Schema per rappresentare la relazione organisation_isLocated_in_place
const organisation_isLocated_in_place = new mongoose.Schema({
    organisation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true },
    place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true }
});

organisation_isLocated_in_place.set('toObject', { getters: true, virtuals: true });

// Esportazione del modello
module.exports = mongoose.model('organisation_isLocated_in_place', organisation_isLocated_in_place);
