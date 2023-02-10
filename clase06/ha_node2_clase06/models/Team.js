const mongoose = require("mongoose");
// Leer en el repository (github) de este paquete el motivo de su existencia
const beautifyUnique = require("mongoose-beautiful-unique-validation");
const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    flag: String,
    goalsScored: [{ type: Schema.Types.ObjectId, ref: "Goal" }],
    goalsConceded: [{ type: Schema.Types.ObjectId, ref: "Goal" }],
  },
  {
    timestamps: true,
  }
);

// Aplicamos el plugin al schema
teamSchema.plugin(beautifyUnique);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
