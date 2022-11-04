const User = require("../models/User");

const userController = {
  //GET all users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  //GET user by ID
  getUserByID({ params }, res) {
    User.findOne({ _id: params.id })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //CREATE user
  createUser({ body }, res) {
    User.create(body)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  //UPDATE user by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.json(err));
  },

  //DELETE user by ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((deleteUser) => {
        if (!deleteUser) {
          return res
            .status(404)
            .json({ message: "No user found with this ID!" });
        }
        return Thought.findOneAndDelete(
          { _id: params.thoughtID },
          { $pull: { comments: params.thoughtID } },
          { new: true }
        );
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
