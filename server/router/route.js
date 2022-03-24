const express = require("express");
const router = express.Router();

const userController = require("../controller/auth");
// const authenticate = require("../middleware/authenticate");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/details", userController.details);
router.post("/removeUser", userController.removeUser);
router.put("/update", userController.update);
router.get("/logout", userController.logout);
router.put("/entersample", userController.entersample);

module.exports = router;
