const router = require("express").Router();
const {
  getUser,
  addUser,
  editUser,
  deleteUser,
} = require("./controllers/userController");

const {
  getBlogpost,
  addBlogpost,
  editBlogpost,
  deleteBlogpost,
} = require("./controllers/blogpostController");

router.get("/users", getUser);
router.post("/users", addUser);
router.put("/users/:id", editUser);
router.delete("/users/:id", deleteUser);

router.get("/blogpost", getBlogpost);
router.post("/blogpost", addBlogpost);
router.put("/blogpost/:id", editBlogpost);
router.delete("/blogpost/:id", deleteBlogpost);

module.exports = router;
