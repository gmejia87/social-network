const User = require("../models/User");
const Thought = require("../models/Thought");

const thoughtController = {
  //GET all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //GET thought by ID
  getThoughtByID({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thoughts with this ID!" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //CREATE thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findByIdAndUpdate(
          { _id: params.user.id },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thoughts found with this ID" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.json(err));
  },

  //UPDATE thought by ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thoughts with this ID!" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.json(err));
  },

  //DELETE thought by ID
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  //add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thoughts with this ID!" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.json(err));
  },

  //remove reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thoughts with this ID!" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
