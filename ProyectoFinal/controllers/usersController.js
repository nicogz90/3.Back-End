const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const store = async (req, res) => {
  try {
    const data = req.body;
    const createdUser = await User.create(data);

    const token = jwt.sign(
      {
        id: createdUser._id,
      },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user: {
        email: createdUser.email,
        username: createdUser.username,
        id: createdUser._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo salió mal",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET
      );

      res.json({
        token,
        user: {
          email: user.email,
          username: user.username,
          id: user._id,
        },
      });
    } else {
      res.status(401).json({ error: "Error de autenticación" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo salió mal",
    });
  }
};

module.exports = {
  store,
  login,
};
