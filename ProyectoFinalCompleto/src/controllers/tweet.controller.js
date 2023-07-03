const Tweet = require("../models/tweet.model");
const User = require("../models/user.model");

const read = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return next({ message: "El tweet no existe", status: 404 });
    }

    res.json(tweet);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res) => {
  try {
    const text = req.query.text;
    const textSearch = new RegExp(text, "i");

    const tweets = await Tweet.find({ text: textSearch }).populate(
      "author",
      "username"
    );

    res.json(tweets);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const info = req.body;
    const updatedTweet = await Tweet.findByIdAndUpdate(
      id,
      { text: info.text },
      { new: true, runValidators: true }
    );

    if (!updatedTweet) {
      return next({ message: "El tweet no existe", status: 404 });
    }

    res.json(updatedTweet);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    if (req.auth.id !== req.params.id) {
      return next({
        status: 403,
        message: "No tienes permisos para eliminar este tweet.",
      });
    }
    const id = req.params.id;
    const deletedTweet = await Tweet.findByIdAndDelete(id);

    if (!deletedTweet) {
      return next({ message: "El tweet no existe", status: 404 });
    }

    await User.findByIdAndUpdate(deletedTweet.author, {
      $pull: { tweets: deletedTweet.id },
    });

    res.json(deletedTweet);
  } catch (error) {
    next(error);
  }
};

const store = async (req, res, next) => {
  try {
    const newTweet = req.body;

    const tweet = await Tweet.create({
      text: newTweet.text,
      author: req.auth.id,
    });

    await User.findByIdAndUpdate(req.auth.id, {
      $push: { tweets: tweet.id },
    });

    res.status(201).json(tweet);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  read,
  list,
  update,
  remove,
  store,
};
