const express = require('express');
const router = express.Router();
const controller = require('../controllers/Person');

// Calcola l'età media delle ragazze che fanno l'università
router.post('/female-university-average', async (req, res) => {
  const { ids } = req.body;
  if (!ids) {
    return res.status(400).json({ success: false, error: 'Parametro mancante' });
  }

  try {
    const average = await controller.getFemaleUniversityAverage(ids);
    if (average === null) {
      return res.json({ success: false, error: 'Media non calcolata' });
    }
    res.json({ success: true, average });

  } catch (error) {
    console.error('Errore calcolo media:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Calcola l'età media delle ragazze che lavorano
router.post('/female-worker-average', async (req, res) => {
  const { ids } = req.body;
  if (!ids) {
    return res.status(400).json({ success: false, error: 'Parametro mancante' });
  }

  try {
    const average = await controller.getFemaleWorkerAverage(ids);
    if (average === null) {
      return res.json({ success: false, error: 'Media non calcolata' });
    }
    res.json({ success: true, average });

  } catch (error) {
    console.error('Errore calcolo media:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Ritorna gli ID delle persone che corrispondono a nome, cognome e browser
router.get('/ids', async (req, res) => {
  const { firstName, lastName, browser } = req.query;

  if (!firstName || !lastName || !browser) {
    return res.status(400).json({ success: false, error: 'Parametri mancanti' });
  }

  try {
    const ids = await controller.getPersonIds(firstName, lastName, browser);

    if (!ids.length) {
      return res.json({ success: false, ids: [] });
    }

    res.json({ success: true, ids });

  } catch (error) {
    console.error('Errore durante il recupero degli ID:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;

