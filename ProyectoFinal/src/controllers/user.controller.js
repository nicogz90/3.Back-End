const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { jwtSecret } = require("../config");

const create = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const jwtPayload = {
      sub: newUser.id,
    };

    const token = jwt.sign(jwtPayload, jwtSecret);

    res.status(201).json({
      user: {
        username: newUser.username,
        email: newUser.email,
        id: newUser.id,
      },
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next({ status: 404, message: "El usuario no existe" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const generateToken = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return next({ message: "Credenciales invalidas.", status: 401 });
    }

    const passwordMatches = await user.comparePassword(req.body.password);

    if (!passwordMatches) {
      return next({ status: 401, message: "Credenciales invalidas." });
    }

    // Este codigo esta repetido, se podria hacer una funcion para generar el token
    res.status(201).json({
      user: {
        username: newUser.username,
        email: newUser.email,
        id: newUser.id,
      },
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  if (req.auth.id !== req.params.id) {
    // Si la ID del usuario que estamos modificando no es la misma del usuario que esta logeado
    return next({
      status: 403,
      message: "No tienes permisos para modificar este usuario.",
    });
  }
  try {
    const userDate = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username: userDate.username, email: userDate.email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      // Esto nunca deberia pasar, porque el usuario que estamos modificando deberia existir
      return next({ message: "El usuario no existe", status: 404 });
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  if (req.auth.id !== req.params.id) {
    return next({
      status: 403,
      message: "No tienes permisos para eliminar este usuario.",
    });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return next({ message: "El usuario no existe", status: 404 });
    }

    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  read,
  update,
  remove,
  generateToken,
};
