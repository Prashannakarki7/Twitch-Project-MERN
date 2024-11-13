const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    twitchId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      
    },
    profilePicture: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
