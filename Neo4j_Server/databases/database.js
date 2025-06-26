const neo4j = require('neo4j-driver');

const uri = 'bolt://127.0.0.1:7687'; // ← usa 127.0.0.1 invece di localhost
const user = 'neo4j';
const password = 'progetto';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
  encrypted: 'ENCRYPTION_OFF', // ← importante per evitare errori se il server non usa SSL
});

async function connect() {
  try {
    const session = driver.session();
    console.log(" Connessione riuscita con Neo4j");
    await session.close();
  } catch (error) {
    console.error(" Errore di connessione:", error);
  } finally {
    await driver.close();
  }
}

connect();
