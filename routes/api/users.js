const router = require("express").Router();
const {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

//GET all users, POST new user (/api/users)
router.route("/").get(getAllUsers).post(createUser);

//GET user by id, UPDATE by id, DELETE by id (/api/users/:id)
router.route("/:id").get(getUserByID).put(updateUser).delete(deleteUser);

//CREATE friend, DELETE friend (/api/users/:userId/friends/:friendId)
router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
