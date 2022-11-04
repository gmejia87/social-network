const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    //thoughtText; string, required, must be 1-280 characters
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    //createdAt; date, set deault value current timestamp, getter method to format timestamp on query
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => createdAt.toLocaleString(),
    },
    //username; (user that created this thought) string, required
    username: {
      type: String,
      required: true,
    },
    //reactions; (these are like replies) array of nested documents created with 'reactionSchema'
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//reactionCount/reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
