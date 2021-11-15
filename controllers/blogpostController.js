const { User, Blogpost } = require("../models");
const { asyncWrapper } = require("../middleware/asyncWrapper");
const BlogpostView = require("../views/blogpost");

const findUser = async (id) => {
  const userId = Number(id);
  if (isNaN(userId)) return null;

  return await User.findByPk(userId);
};

const findBlogpost = async (id) => {
  const blogId = Number(id);

  if (isNaN(blogId)) return null;

  return await Blogpost.findByPk(blogId);
};

exports.getBlogpost = asyncWrapper(async (req, res) => {
  const blogposts = await Blogpost.findAll({ include: User });

  return res.status(200).json({
    status: "OK",
    data: {
      blogposts: blogposts.map((b) => new BlogpostView(b)),
    },
  });
});

exports.addBlogpost = asyncWrapper(async (req, res) => {
  const { title, content, userId } = req.body;

  const user = await findUser(userId);

  if (!user)
    return res.status(404).json({
      status: "FAIL",
      data: {
        name: "USER_NOT_FOUND",
        message: `User with id '${userId}' is not found !`,
      },
    });

  const blogpost = Blogpost.create({ title, content, userId });

  blogpost.User = user;

  return res.status(201).json({
    status: "OK",
    data: new BlogpostView(blogpost),
  });
});

exports.editBlogpost = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { title, content, userId } = req.body;

  const blogpost = await findBlogpost(id);
  if (!blogpost)
    return res.status(404).json({
      status: "FAIL",
      data: {
        name: "BLOGPOST_NOT_FOUND",
        message: `Blogpost with id '${id}' is not found !`,
      },
    });

  const user = await findUser(userId);
  if (!user)
    return res.status(404).json({
      status: "FAIL",
      data: {
        name: "USER_NOT_FOUND",
        message: `User with id ${userId} is not found !`,
      },
    });

  await blogpost.update({ title, content, userId });

  blogpost.User = user;

  return res.status(200).json({
    status: "OK",
    data: new BlogpostView(blogpost),
  });
});

exports.deleteBlogpost = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const blogpost = await findBlogpost(id);
  if (!blogpost)
    return res.status(404).json({
      status: "FAIL",
      data: {
        name: "BLOGPOST_NOT_FOUND",
        message: `Blogpost with id '${id}' is not found !`,
      },
    });

  await blogpost.destroy();

  return res.status(200).json({
    status: "OK",
    data: null,
  });
});
