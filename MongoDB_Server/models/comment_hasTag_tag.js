const mongoose = require('mongoose');

// Schema per rappresentare la relazione comment_hasTag_tag
const comment_hasTag_tag = new mongoose.Schema({
    creationDate: { type: Date, required: true },
    comment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
    tag_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true }
});

comment_hasTag_tag.set('toObject', { getters: true, virtuals: true });

// Esportazione del modello
module.exports = mongoose.model('comment_hasTag_tag', comment_hasTag_tag, 'comment_hasTag_tag');
