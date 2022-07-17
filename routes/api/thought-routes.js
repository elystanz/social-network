const router = require('express').Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// set up routers for all to get thoughts and create
router
  .route('/')
  .get(getAllThought)
  .post(createThought);

// set router for ID to get thoughts by ID, update, and delete
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// set router to create reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction);

// set router to delete reaction
  router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;