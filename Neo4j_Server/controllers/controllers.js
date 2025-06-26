const { getAverageReplies } = require('../services/services.js');
const { getFriendsPostsCorrelation } = require('../services/services.js');
const { getLikeDays } = require('../services/services.js');
const { getUniversityId } = require('../services/services.js');
const { getWorkerId } = require('../services/services.js');
const { getUniversityPeopleId } = require('../services/services.js');
const { getForumId } = require('../services/services.js');


// Handler per ottenere la media dei reply
async function getAverageRepliesHandler(req, res) {
    try {
        const result = await getAverageReplies();
        res.json(result);
    } catch (err) {
        console.error("Errore nella rotta /average-replies", err);
        res.status(500).json({ success: false, message: "Errore nel recuperare la media dei reply" });
    }
}

// Handler per ottenere la media dei post e la relazione con il numero di amici
async function getFriendsPostsCorrelationHandler(req, res) {
    try {
        const result = await getFriendsPostsCorrelation();
        res.json(result);
    } catch (err) {
        console.error("Errore nella rotta /friends-posts-correlation", err);
        res.status(500).json({ success: false, message: "Errore nel recuperare la correlazione tra numero di amici e post" });
    }
}

// Handler per ottenere i giorni in cui sono stati messi like ai commenti
async function getLikeDaysHandler(req, res) {
  const { ids, startDate, endDate } = req.body;

  if (!ids || !startDate || !endDate) {
    return res.status(400).json({ success: false, message: 'Parametri mancanti: ids, startDate o endDate' });
  }

  try {
    const result = await getLikeDays(ids, startDate, endDate);
    res.json({ success: true, days: result.days });
  } catch (err) {
    console.error("Errore nella rotta /like-days", err);
    res.status(500).json({ success: false, message: "Errore nel recuperare i giorni dei like" });
  }
}


// Handler per ottenere gli id di chi fa l'università
async function getUniversityHandler(req, res) {
    try {
        const result = await getUniversityId();
        res.json(result);
    } catch (err) {
        console.error("Errore nella rotta /university-id", err);
        res.status(500).json({ success: false, message: "Errore nel recuperare gli id di chi fa l'università" });
    }
}

// Handler per ottenere gli id di chi lavora
async function getWorkerHandler(req, res) {
    try {
        const result = await getWorkerId();
        res.json(result);
    } catch (err) {
        console.error("Errore nella rotta /worker-id", err);
        res.status(500).json({ success: false, message: "Errore nel recuperare gli id di chi fa l'università" });
    }
}

// Handler per ottenere gli id di chi studia in una certa università
async function getUniversityPeopleHandler(req, res) {
    try {
        const result = await getUniversityPeopleId(req.query.university);
        res.json(result);
    } catch (err) {
        console.error("Errore nella rotta /university-people-id", err);
        res.status(500).json({ success: false, message: "Errore nel recuperare gli id di chi studia all'università" });
    }
}

// Handler per ottenere gli id dei forum
async function getForumIdHandler(req, res) {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: "Lista di ID non valida o vuota" });
  }

  try {
    const result = await getForumId(ids);
    res.json({ success: true, forums: result });
  } catch (err) {
    console.error("Errore nella rotta /forum-id", err);
    res.status(500).json({ success: false, message: "Errore nel recuperare gli ID dei forum" });
  }
}


module.exports = {
    getAverageRepliesHandler,
    getFriendsPostsCorrelationHandler,
    getLikeDaysHandler,
    getUniversityHandler,
    getWorkerHandler,
    getUniversityPeopleHandler,
    getForumIdHandler
};

