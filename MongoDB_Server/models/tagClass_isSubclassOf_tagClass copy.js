const mongoose = require('mongoose');

// Schema per rappresentare la relazione tagClass_isSubclassOf_tagClass
const tagClass_isSubclassOf_tagClass = new mongoose.Schema({
    tagClass1_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TagClass', required: true },
    tagClass2_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TagClass', required: true }
});

tagClass_isSubclassOf_tagClass.set('toObject', { getters: true, virtuals: true });

// Esportazione del modello
module.exports = mongoose.model('tagClass_isSubclassOf_tagClass', tagClass_isSubclassOf_tagClass);
