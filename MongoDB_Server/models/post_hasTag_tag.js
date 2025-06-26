const mongoose = require('mongoose');

// Schema per rappresentare la relazione post_hasTag_tag
const post_hasTag_tag = new mongoose.Schema({
    creationDate: { type: Date, required: true },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    tag_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true }
});

post_hasTag_tag.set('toObject', { getters: true, virtuals: true });

// Esportazione del modello
module.exports = mongoose.model('post_hasTag_tag', post_hasTag_tag);
