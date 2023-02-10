const express = require("express");
const router = express.Router();
const Message = require("./models/Message");
const User = require("./models/User");

router.get("/messages", async (req, res) => {
  const messages = await Message.find()
    .select("-_id -__v -updatedAt")
    .populate("user", "-_id username");

  res.json(messages);
});

module.exports = router;
