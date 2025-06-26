const mongoose = require('mongoose');

// Schema per rappresentare la relazione person_studyAt_university
const person_studyAt_university = new mongoose.Schema({
    creationDate: { type: Date, required: true },
    person_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
    university_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true }
});

person_studyAt_university.set('toObject', { getters: true, virtuals: true });

// Esportazione del modello
module.exports = mongoose.model('person_studyAt_university', person_studyAt_university, 'person_studyAt_university');
