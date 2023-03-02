const { Schema, model } = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const tweetsSchema = new Schema({
  text: {
    type: String,
    required: true,
    max: 128,
  },
  author: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
});

tweetsSchema.plugin(beautifyUnique);

const Tweets = model("Tweets", tweetsSchema);

module.exports = Tweets;
