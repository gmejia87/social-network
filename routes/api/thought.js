const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtByID,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thought-controller");

//GET all thoughts, POST new thought
router.route("/").get(getAllThoughts).post(createThought);

//GET thought by ID, UPDATE by id, DELETE by id
router
  .route("/:id")
  .get(getThoughtByID)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
