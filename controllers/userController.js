const { asyncWrapper } = require("../middleware/asyncWrapper");
const { User } = require("../models");
const UserView = require("../views/user");

exports.getUser = asyncWrapper(async (req, res) => {
  const users = await User.findAll();
  return res.status(200).json({
    status: "OK",
    data: {
      users: users.map((u) => new UserView(u)),
    },
  });
});
exports.addUser = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    username,
    email,
  });

  return res.status(201).json({
    status: "OK",
    data: new UserView(user),
  });
});

exports.findById = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);

  if (!user)
    return res.status(404).json({
      status: "FAIL",
      data: {
        name: "USER_NOT_FOUND",
        message: `User with id ${id} not found!`,
      },
    });

  return res.status(200).json({
    status: "OK",
    data: user,
  });
});

exports.editUser = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body;
  const id = req.params.id;
  const user = await User.findByPk(id);

  if (!user)
    return res.status(404).json({
      status: "FAIL",
      data: {
        name: "USER_NOT_FOUND",
        message: `User with id ${id} not found!`,
      },
    });

  await user.update({ username, email, password });
  return res.status(200).json({
    status: "OK",
    data: user,
  });
});

exports.deleteUser = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);

  if (!user)
    return res.status(404).json({
      status: "FAIL",
      data: {
        name: "USER_NOT_FOUND",
        message: `User with id ${id} not found!`,
      },
    });

  await user.destroy();
  return res.status(200).json({
    status: "OK",
    data: null,
  });
});
