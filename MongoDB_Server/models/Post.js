const mongoose = require('mongoose');

// Schema per rappresentare il documento "Post"
const Post = new mongoose.Schema({
    creationDate: {type: String, required: true},
    id: {type: mongoose.Schema.Types.Decimal128, required: true},
    imageFile: {type: mongoose.Schema.Types.Mixed, default: null},
    locationIP: {type: String, required: false},
    browserUsed: {type: String, required: false},
    language: {type: String, required: false},
    content: {type: String, required: true},
    length: {type: Number, required: false}
});

// Setting the virtual property.
Post.set('toObject', {getters: true, virtuals: true});
// Esportazione del modello
module.exports = mongoose.model('Post', Post);
