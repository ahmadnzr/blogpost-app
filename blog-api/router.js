const router = require("express").Router();
const {
  getUser,
  addUser,
  editUser,
  deleteUser,
} = require("./controllers/userController");

router.get("/users", getUser);
router.post("/users", addUser);
router.put("/users/:id", editUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
