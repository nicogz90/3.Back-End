const { Schema, model } = require("mongoose");

const goalSchema = new Schema(
  {
    player: { type: String, required: true },
    minute: {
      type: Number,
      required: true,
      min: 0,
      max: 120,
    },
    teamFor: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    teamAgainst: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  {
    timestamps: true,
  }
);

const Goal = model("Goal", goalSchema);

module.exports = Goal;
