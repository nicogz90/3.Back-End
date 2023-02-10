const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  flag: String,
});

const Team = mongoose.model("teams", teamSchema);

module.exports = Team;
