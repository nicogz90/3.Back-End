const beautifyUnique = require("mongoose-beautiful-unique-validation");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: email,
    required: true,
    unique: true,
  },
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
});

userSchema.plugin(beautifyUnique);

const User = model("User", userSchema);

module.exports = User;
