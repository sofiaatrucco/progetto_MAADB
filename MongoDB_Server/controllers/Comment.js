const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const HasTag = require('../models/comment_hasTag_tag');
const HasType = require('../models/tag_hasType_tagClass');
const TagClass = require('../models/TagClass');

async function getCommentsByTagIp(tagName, ipAddress) {
  try {
    // Recupera l'oggetto TagClass con name == tagName
    const tagClass = await TagClass.findOne({ name: tagName });
    if (!tagClass) {
      console.log(`TagClass '${tagName}' non trovata`);
      return [];
    }

    // Recupera tutti i tag che hanno questa tagClass
    const tagLinks = await HasType.find({ tagClass_id: tagClass._id });
    const tagIds = tagLinks.map(link => link.tag_id);

    // Recupera le relazioni comment-tag con uno di questi tag
    const commentTags = await HasTag.find({ tag_id: { $in: tagIds } });
    const commentIds = commentTags.map(ct => ct.comment_id);

    // Recupera i commenti con quegli ID e quell'IP
    const comments = await Comment.find({
      _id: { $in: commentIds },
      locationIP: ipAddress
    });

    return comments;
  } catch (err) {
    console.error(`Errore nella ricerca dei commenti con tag '${tagName}' e IP '${ipAddress}':`, err);
    return [];
  }
}

module.exports = { getCommentsByTagIp };

