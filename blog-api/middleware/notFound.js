exports.notFound = (req, res) => {
  return res.status(404).json({
    status: "FAIL",
    error: {
      name: "NOT_FOUND",
      url: req.url,
      method: req.method,
    },
  });
};
