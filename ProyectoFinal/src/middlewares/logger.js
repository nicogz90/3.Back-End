const logger = function (req, res, next) {
  req.time = Date.now();

  console.log(`Method: ${req.method} URL: ${req.url}`);

  next();
};

module.exports = logger;
