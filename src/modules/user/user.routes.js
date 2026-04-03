const express = require("express");
const router = express.Router();
const{createUser, getUsers} = require("./user.controller");
const authorize = require("../../middleware/auth.middleware");
router.post("/", authorize(["admin"]), createUser);
router.get("/", authorize(["admin", "analyst"]), getUsers);

module.exports = router;