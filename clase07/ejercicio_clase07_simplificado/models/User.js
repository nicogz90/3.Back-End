// Leer en el repository (github) de este paquete el motivo de su existencia
const beautifyUnique = require("mongoose-beautiful-unique-validation");
const { Schema, model } = require("mongoose");
const { hashSync } = require("bcrypt");

const userSchema = new Schema({
  firstname: { type: String },
  lastname: String, // en este caso se puede simplificar así
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Aplicamos el plugin al schema
userSchema.plugin(beautifyUnique);

// sobre-escribo la funcion toJSON que viene por defecto de mongoose:
userSchema.methods.toJSON = function () {
  const user = this.toObject(); // los campos de user, sin toda la magia de mongoose (= "LEAN")
  delete user.password;
  return user;
};

userSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = hashSync(this.password, 10);
  }
  return next();
});

const User = model("User", userSchema);

module.exports = User;
