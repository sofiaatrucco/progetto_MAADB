const mongoose = require('mongoose');

// Schema per rappresentare la relazione forum_hasTag_tag
const forum_hasTag_tag = new mongoose.Schema({
    creationDate: { type: Date, required: true },
    forum_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Forum', required: true },
    tag_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true }
});

forum_hasTag_tag.set('toObject', { getters: true, virtuals: true });

// Esportazione del modello
module.exports = mongoose.model('forum_hasTag_tag', forum_hasTag_tag);
