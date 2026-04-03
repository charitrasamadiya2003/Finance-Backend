const express = require("express");
const router = express.Router();

const {
    getTotalIncome,
    getTotalExpense,
    getNetBalance,
    getCategoryTotals
} = require("./summary.controller");
const authorize = require("../../middleware/auth.middleware");

router.get("/income", authorize(["admin", "analyst", "viewer"]), getTotalIncome);
router.get("/expense", authorize(["admin", "analyst", "viewer"]), getTotalExpense);
router.get("/balance", authorize(["admin", "analyst", "viewer"]), getNetBalance);
router.get("/categories", authorize(["admin", "analyst", "viewer"]), getCategoryTotals);

module.exports = router;