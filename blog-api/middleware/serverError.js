exports.serverError = (err, req, res, next) => {
  return res.status(500).json({
    status: "FAIL",
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
  });
};
