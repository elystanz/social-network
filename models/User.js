const { Schema, model } = require("mongoose");

// set user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        // use a regular expression for email validation
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      ],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

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

// friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create user via schema, then export
const User = model("User", userSchema);

module.exports = User;