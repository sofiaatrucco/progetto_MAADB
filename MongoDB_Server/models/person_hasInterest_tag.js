const mongoose = require('mongoose');

// Schema per rappresentare la relazione person_hasInterest_tag
const person_hasInterest_tag = new mongoose.Schema({
    creationDate: { type: Date, required: true },
    person_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
    tag_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true }
});

person_hasInterest_tag.set('toObject', { getters: true, virtuals: true });

// Esportazione del modello
module.exports = mongoose.model('person_hasInterest_tag', person_hasInterest_tag);
