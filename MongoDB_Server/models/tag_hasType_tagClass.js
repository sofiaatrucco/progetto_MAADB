const mongoose = require('mongoose');

// Schema per rappresentare la relazione tag_hasType_tagClass
const tag_hasType_tagClass = new mongoose.Schema({
    tag_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true },
    tagClass_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TagClass', required: true }
});

tag_hasType_tagClass.set('toObject', { getters: true, virtuals: true });

// Esportazione del modello
module.exports = mongoose.model('tag_hasType_tagClass', tag_hasType_tagClass, 'tag_hasType_tagClass');
