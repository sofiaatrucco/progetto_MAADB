const express = require('express');
const app = express();
const routes = require('./routes/routes.js');

app.use(express.json())

// Usa il router
app.use('/api/analytics', routes);

app.get('/ping', (req, res) => {
  res.send('Neo4j ok');
});

app.listen(4000, () => {
  console.log('Neo4j Server in ascolto su http://localhost:4000');
});
