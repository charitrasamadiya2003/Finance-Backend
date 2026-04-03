require("dotenv").config();
const express = require("express");
const app = express();
require("./config/db");
const userRoutes = require("./modules/user/user.routes");
const recordRoutes = require("./modules/record/record.routes");
const summaryRoutes = require("./modules/summary/summary.routes");
app.use(express.json());
app.use("/users",userRoutes);
app.use("/records", recordRoutes);
app.use("/summary", summaryRoutes);

app.get("/", (req,res) => {
    res.send("Backend is running");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});