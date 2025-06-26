const mongoose = require('mongoose');

// Schema per rappresentare la relazione person_workAt_company
const person_workAt_company = new mongoose.Schema({
    creationDate: { type: Date, required: true },
    person_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true }
});

person_workAt_company.set('toObject', { getters: true, virtuals: true });

// Esportazione del modello
module.exports = mongoose.model('person_workAt_company', person_workAt_company, 'person_workAt_company');
