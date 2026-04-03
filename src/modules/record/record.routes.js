const express = require("express");
const router = express.Router();
const {createRecord, getRecords,updateRecord,deleteRecord} = require("./record.controller");
const authorize = require("../../middleware/auth.middleware");
router.post("/", authorize(["admin"]), createRecord);
router.get("/", authorize(["admin", "analyst"]), getRecords);
router.put("/:id", authorize(["admin"]), updateRecord);
router.delete("/:id", authorize(["admin"]), deleteRecord);
module.exports = router;