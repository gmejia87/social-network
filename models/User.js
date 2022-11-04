const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    //username: string, unique, required, trimmed
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    //email: string, required, unique, match valid email address(validation)
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    //thoughts: array of '_id' values referencing 'Thought' model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    //friends: array of '_id' values referencing 'User' model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
