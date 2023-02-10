const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;
