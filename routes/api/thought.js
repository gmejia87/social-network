const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtByID,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

//GET all thoughts, POST new thought
router.route("/").get(getAllThoughts).post(createThought);

//GET thought by ID, UPDATE by id, DELETE by id
router
  .route("/:id")
  .get(getThoughtByID)
  .put(updateThought)
  .delete(deleteThought);

//POST reaction, DELETE reaction (/api/thoughts/:thoughtId/reactions)
router
  .route("/thoughts/:thoughtId/reactions")
  .post(addReaction)
  .delete(deleteReaction);

module.exports = router;
