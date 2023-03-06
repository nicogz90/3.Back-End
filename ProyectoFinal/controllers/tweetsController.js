const Tweets = require("../models/Tweets");
const User = require("../models/Users");

const store = async (req, res) => {
  try {
    const tweetAuthor = await User.findById(req.auth.id); // el middleware express-jwt dispone el id (que paso en el payload del token) dentro de req.auth

    const tweetCreated = await Tweets.create({
      ...req.body,
      author: tweetAuthor._id,
    });

    tweetAuthor.tweets.push(tweetCreated._id);
    await tweetAuthor.save();

    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sucedio un error no esperado" });
  }
};

const show = async (req, res) => {
  const tweets = await Tweets.find()
    .select("-_id -__v") // saco el _id y __v del tweet
    .populate("author", "-_id username"); // saco el _id y devuelvo sólo el username del author

  res.status(200).json(tweets);
};

module.exports = {
  store,
  show,
};
