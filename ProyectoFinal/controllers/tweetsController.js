const Tweets = require("../models/Tweets");
const User = require("../models/Users");

const store = async (req, res) => {
  try {
    const tweetAuthor = await User.findById(req.auth.id);
    const tweetCreated = await Tweets.create({
      ...req.body,
      author: tweetAuthor,
    });

    tweetAuthor.tweets.push(tweetCreated.id);
    await tweetAuthor.save();

    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sucedio un error no esperado" });
  }
};

const show = async (req, res) => {
  const tweets = await Tweets.find().populate("author", "username")


  res.status(200).json(tweets)
} 

module.exports = {
  store,
  show
};
