const express = require('express');
const axios = require('axios'); // per fare chiamate HTTP
const app = express();
const PORT = 3000;
const cors = require('cors');
const path = require('path');

app.use(cors());  

app.use(express.static(path.join(__dirname, 'public')));

// Prova connessione con MongoDB_Server
axios.get('http://localhost:3001/ping')
  .then(res => console.log('Connessione con MongoDB_Server:', res.data))
  .catch(err => console.error('Errore MongoDB_Server:', err.message));

// Prova connessione con Neo4J_Server
axios.get('http://localhost:4000/ping')
  .then(res => console.log('Connessione con Neo4J_Server:', res.data))
  .catch(err => console.error('Errore Neo4J_Server:', err.message));

app.listen(PORT, () => {
  console.log(`Main Server in ascolto su http://localhost:${PORT}`);
});

app.use(express.json());


// Chiamata al server secondario per ottenere la media delle risposte
app.get('/api/analytics/average-replies', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:4000/api/analytics/average-replies');
    res.json(response.data);
  } catch (err) {
    console.error('Errore nella chiamata al server secondario:', err);
    res.status(500).json({ error: 'Errore nella chiamata al server secondario' });
  }
});


// Chiamata al server secondario per ottenere la correlazione amici-post
app.get('/api/analytics/friends-posts-correlation', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:4000/api/analytics/friends-posts-correlation');
    res.json(response.data);
  } catch (err) {
    console.error('Errore nella chiamata al server secondario:', err);
    res.status(500).json({ success: false, error: 'Errore nella chiamata al server secondario' });
  }
});


// Chiamata al server secondario per ottenere la media delle ragazze che frequentano l'università
app.get('/api/analytics/female-university-average', async (req, res) => {
  try {
    // 1) Chiede a Neo4j gli ID di chi fa l'università
    const universityId = await axios.get('http://localhost:4000/api/analytics/university-id');

    if (!universityId.data.success || !universityId.data.ids) {
      return res.status(500).json({ success: false, error: 'Errore nel recupero degli ID da Neo4j' });
    }

    // 2) Chiede a Mongo la media dell'età delle ragazze
    const femaleUniversityAverage = await axios.post('http://localhost:3001/api/person/female-university-average', {
      ids: universityId.data.ids
    });

    // 3) Restituisce il risultato finale
    if (!femaleUniversityAverage.data.success) {
      return res.status(500).json({ success: false, error: 'Errore nella query Mongo' });
    }

    res.json({ success: true, average: femaleUniversityAverage.data.average });

  } catch (err) {
    console.error('Errore nella chiamata al server secondario:', err);
    res.status(500).json({ success: false, error: 'Errore nella chiamata al server secondario' });
  }
});


// Chiamata al server secondario per ottenere la media delle ragazze che lavorano
app.get('/api/analytics/female-worker-average', async (req, res) => {
  try {
    // 1) Chiede a Neo4j gli ID di chi lavora
    const workerId = await axios.get('http://localhost:4000/api/analytics/worker-id');

    if (!workerId.data.success || !workerId.data.ids) {
      return res.status(500).json({ success: false, error: 'Errore nel recupero degli ID da Neo4j' });
    }

    // 2) Chiede a Mongo la media dell'età delle ragazze
    const femaleWorkerAverage = await axios.post('http://localhost:3001/api/person/female-worker-average', {
      ids: workerId.data.ids
    });

    // 3) Restituisce il risultato finale
    if (!femaleWorkerAverage.data.success) {
      return res.status(500).json({ success: false, error: 'Errore nella query Mongo' });
    }

    res.json({
       success: true, 
       average: femaleWorkerAverage.data.average,
       });

  } catch (err) {
    console.error('Errore nella chiamata al server secondario:', err);
    res.status(500).json({ success: false, error: 'Errore nella chiamata al server secondario' });
  }
});



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html', 'index.html'));
});


// Chiamata al MongoDB_Server per ottenere i messaggi con tag e IP specifico
app.get('/api/comments/tag-ip', async (req, res) => {
  const { tag, location } = req.query;

  if (!tag || !location) {
    return res.status(400).json({ success: false, error: 'Parametri mancanti' });
  }

  try {
    const response = await axios.get(`http://localhost:3001/api/comments/tag-ip?tag=${encodeURIComponent(tag)}&location=${encodeURIComponent(location)}`);
    res.json(response.data);
  } catch (err) {
    console.error('Errore nella chiamata al MongoDB_Server (commenti tag + IP):', err);
    res.status(500).json({ success: false, error: 'Errore nella chiamata al MongoDB_Server (commenti tag + IP)' });
  }
});

// Chiamata per ottenere i giorni in cui una persona ha messo like a un commento
app.get('/api/analytics/like-days', async (req, res) => {
  const { firstName, lastName, browser, startDate, endDate } = req.query;

  if (!firstName || !lastName || !browser || !startDate || !endDate) {
    return res.status(400).json({ success: false, error: 'Parametri mancanti' });
  }

  try {
    // 1) Chiamata a Mongo per recuperare gli ID delle persone con quei dati
    const mongoRes = await axios.get('http://localhost:3001/api/person/ids', {
      params: { firstName, lastName, browser }
    });

    if (!mongoRes.data.success || !mongoRes.data.ids.length) {
      return res.status(404).json({ success: false, error: 'Nessun ID trovato' });
    }

    const ids = mongoRes.data.ids;

    // 2) Chiamata a Neo4j per ottenere i giorni in cui hanno messo like ai commenti
    const neoRes = await axios.post('http://localhost:4000/api/analytics/like-days', {
      ids,
      startDate,
      endDate
    });

    if (!neoRes.data.success) {
      return res.status(500).json({ success: false, error: 'Errore in Neo4j' });
    }

    // 3) Risposta finale
    res.json({
      success: true,
      days: neoRes.data.days
    });

  } catch (err) {
    console.error('Errore nella route /api/analytics/like-days:', err.message);
    res.status(500).json({ success: false, error: 'Errore nella chiamata ai server secondari' });
  }
});


  // Chiamata al server secondario per ottenere i forum più seguiti dagli universitari
app.get('/api/analytics/top-forums', async (req, res) => {
  const universityName = req.query.university;

  if (!universityName) {
    return res.status(400).json({ success: false, error: 'Nome università mancante.' });
  }

  // 1) recupero gli id degli universitari che frequentano l'università in input
  try {
    const universityId = await axios.get(`http://localhost:4000/api/analytics/university-people-id?university=${encodeURIComponent(universityName)}`);

    // 2) Chiede a Neo4j l'id dei forum seguiti dagli universitari
    const forumResponse = await axios.post('http://localhost:4000/api/analytics/forum-id', {
      ids: universityId.data.ids
    });

    // 3) Restituisce il risultato finale
    if (!forumResponse.data.success) {
      return res.status(500).json({ success: false, error: 'Errore nella query Neo' });
    }
    console.log(forumResponse.data.forums);
    res.json({
      success: true,
      forums: forumResponse.data.forums // <-- forums contiene array di { forumId, followersCount }
    });

  } catch (err) {
    console.error('Errore nella chiamata al server Neo4j:', err);
    res.status(500).json({ success: false, error: 'Errore nella chiamata al server Neo4j' });
  }
});


  

