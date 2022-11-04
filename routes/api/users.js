const router = require("express").Router();
const {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

//GET all users, POST new user
router.route("/").get(getAllUsers).post(createUser);

//GET user by id, UPDATE by id, DELETE by id
router.route("/:id").get(getUserByID).put(updateUser).delete(deleteUser);

module.exports = router;
