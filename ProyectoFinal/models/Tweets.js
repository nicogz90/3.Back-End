const beautifyUnique = require("mongoose-beautiful-unique-validation");
const { Schema, model } = require("mongoose");

const tweetsSchema = new Schema({
  text: {
    type: String,
    required: true,
    max: 128,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

tweetsSchema.plugin(beautifyUnique);

const Tweets = model("Tweet", tweetsSchema);

module.exports = Tweets;
