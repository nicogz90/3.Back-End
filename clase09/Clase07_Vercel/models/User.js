const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const beautifyUnique = require("mongoose-beautiful-unique-validation"); // Alternativa al ejemplo descripto aquí: https://mongoosejs.com/docs/middleware.html#error-handling-middleware

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxLength: 80,
    },
    lastname: {
      type: String,
      required: true,
      maxLength: 80,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, minLength: 3, maxLength: 100 },
  },
  {
    timestamps: true,
  }
);

// Estos son Hooks/Middlewares de Mongoose. 
// Son funciones que se ejecutan antes o después de ciertas acciones.

// Antes de guardar un usuario, se "encripta" su contraseña.
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  return next();
});

// Agregamos un método para comparar contraseñas.
userSchema.methods.comparePassword = async function (candidatePassword) {
  const match = await bcrypt.compare(candidatePassword, this.password);
  return match;
};

// toJSON es un método que se ejecuta antes de devolver un objeto al cliente.
// Podemos pensarlo como la opcion "lean" de mongoose.
// Cuando se devuelve un objeto al cliente, se le quita el campo password.
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.plugin(beautifyUnique);

const User = model("User", userSchema);

module.exports = User;
