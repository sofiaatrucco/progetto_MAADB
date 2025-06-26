const express = require('express');
const router = express.Router();
const controller = require('../controllers/Comment');

// Endpoint per trovare tutti i commenti con tagClass e locationIP specifico
router.get('/tag-ip', async (req, res) => {
  const { tag, location } = req.query;

  if (!tag || !location) {
    return res.status(400).json({ success: false, error: 'Parametri "tag" e "location" obbligatori' });
  }

  try {
    const comments = await controller.getCommentsByTagIp(tag, location);
    res.json({ success: true, comments });
  } catch (error) {
    console.error('Errore nel recupero dei commenti:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
