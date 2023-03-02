const { Schema, model } = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation"); // Alternativa al ejemplo descripto aquí: https://mongoosejs.com/docs/middleware.html#error-handling-middleware
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
    },
  },
  tweets: [
    {
      ref: "Tweets",
      type: Schema.Types.ObjectId,
    },
  ],
});

userSchema.plugin(beautifyUnique);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model("User", userSchema);

module.exports = User;
