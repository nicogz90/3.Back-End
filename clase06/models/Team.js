const { Schema, model } = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation"); // Alternativa al ejemplo descripto aquí: https://mongoosejs.com/docs/middleware.html#error-handling-middleware

const teamSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      validate: [
        (code) => code.length === 2,
        "El código debe contener sólo 2 caracteres",
      ],
    },
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    flag: String,
    goalsScored: [{ type: Schema.Types.ObjectId, ref: "Goal" }],
    goalsConceded: [{ type: Schema.Types.ObjectId, ref: "Goal" }],
  },
  {
    timestamps: true,
  }
);

teamSchema.plugin(beautifyUnique);

const Team = model("Team", teamSchema);

module.exports = Team;
