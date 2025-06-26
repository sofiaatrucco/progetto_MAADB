const mongoose = require('mongoose');

// Schema per rappresentare il documento Comment
const Comment = new mongoose.Schema({
    creationDate: { type: String, required: true },
    id: { type: Number, required: true, 
        validate: { validator: Number.isInteger,message: 'ID must be an integer'}  },
    locationIP: { type: String, required: true },
    browserUsed: { type: String, required: true },
    content: { type: String, required: true },
    length: { type: Number, required: false }
});

// Setting the virtual property.
Comment.set('toObject', {getters: true, virtuals: true});
// Esportazione del modello
module.exports = mongoose.model('Comment', Comment, 'Comment');

