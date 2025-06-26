const express = require('express');
const mongoose = require('mongoose');  // <-- Importa mongoose
const app = express();
const PORT = 3001;
const personRoutes = require('./routes/person');
const commentRoutes = require('./routes/comment');

app.use(express.json());

// Connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/ldbc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connesso a MongoDB');
  
  // Avvia il server SOLO dopo che la connessione è OK
  app.listen(PORT, () => {
    console.log(`MongoDB Server in ascolto su http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('Errore di connessione a MongoDB:', err);
});

app.get('/ping', (req, res) => {
  res.send('MongoDB ok');
});

app.use('/api/person', personRoutes);

app.use('/api/comments', commentRoutes);