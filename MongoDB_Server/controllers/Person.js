const mongoose = require('mongoose');
const Person = require('../models/Person');
const moment = require('moment'); // npm install moment

//trova l'età media delle ragazze che frequentano l'univerisà
async function getFemaleUniversityAverage(ids) {
  try {
    // Recupera solo persone di genere femminile i cui _id sono nella lista
    const people = await Person.find({
      id: { $in: ids },
      gender: 'female'
    });

    if (people.length === 0) return null;

    const today = moment();
    const ages = people.map(person => {
      const birthDate = moment(person.birthday, 'DD/MM/YYYY');
      return today.diff(birthDate, 'years');
    });

    const average =
      ages.reduce((sum, age) => sum + age, 0) / ages.length;

    return average;
  } catch (err) {
    console.error('Errore nel calcolo dell\'età media:', err);
    return null;
  }
}

//trova l'età media delle ragazze che frequentano lavorano
async function getFemaleWorkerAverage(ids) {
  try {
    // Recupera solo persone di genere femminile i cui _id sono nella lista
    const people = await Person.find({
      id: { $in: ids },
      gender: 'female'
    });
    if (people.length === 0) return null;

    const today = moment();
    const ages = people.map(person => {
      const birthDate = moment(person.birthday, 'DD/MM/YYYY');
      return today.diff(birthDate, 'years');
    });

    const average =
      ages.reduce((sum, age) => sum + age, 0) / ages.length;
    
    return average;
  } catch (err) {
    console.error('Errore nel calcolo dell\'età media:', err);
    return null;
  }
}

async function getPersonIds(fn, ln, brw) {
  try {
    const people = await Person.find(
      {
        firstName: fn,
        lastName: ln,
        browserUsed: brw
      },
      {
        id: 1
    });
    if (people.length === 0) {
      throw new Error('Nessun ID trovato');
    }
    const ids = people.map(p => p.id);
    return ids;
  } catch (error) {
    console.error('Errore durante il recupero degli ID:', error);
    throw error;
  }
}



module.exports = {
  getFemaleUniversityAverage,
  getFemaleWorkerAverage,
  getPersonIds
};
