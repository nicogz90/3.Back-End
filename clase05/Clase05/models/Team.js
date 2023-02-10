const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation"); // Alternativa al ejemplo descripto aquí: https://mongoosejs.com/docs/middleware.html#error-handling-middleware
const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    flag: String,
    goals: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

teamSchema.plugin(beautifyUnique);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
