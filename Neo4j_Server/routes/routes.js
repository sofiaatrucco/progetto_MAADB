const express = require('express');
const {
  getAverageRepliesHandler,
  getFriendsPostsCorrelationHandler,
  getLikeDaysHandler,
  getUniversityHandler,
  getWorkerHandler,
  getUniversityPeopleHandler,
  getForumIdHandler
} = require('../controllers/controllers.js');

const router = express.Router();

// Rotta per ottenere la media dei reply
router.get('/average-replies', (req, res, next) => {
    next();
}, getAverageRepliesHandler);

// Rotta per ottenere la correlazione tra amici e post
router.get('/friends-posts-correlation', (req, res, next) => {
    next();
}, getFriendsPostsCorrelationHandler);

// Rotta per ottenere i giorni di like
router.post('/like-days', (req, res, next) => {
    next();
}, getLikeDaysHandler);

// Rotta per ottenere gli id degli universitari
router.get('/university-id', (req, res, next) => {
    next();
}, getUniversityHandler);

// Rotta per ottenere gli id dei lavoratori
router.get('/worker-id', (req, res, next) => {
    next();
}, getWorkerHandler);

// Rotta per ottenere gli id degli studenti universitari dato il nome dell'università
router.get('/university-people-id', (req, res, next) => {
    next();
}, getUniversityPeopleHandler);

// Rotta per ottenere gli id dei forum
router.post('/forum-id', (req, res, next) => {
    next();
}, getForumIdHandler);

module.exports = router;

