const db = require("../../config/db");

const getTotalIncome = (req, res)=> {
    const query = "SELECT SUM(amount) AS totalIncome FROM records WHERE type = 'income'";
    db.query(query, (err, result) => {
        if(err) return res.status(500).json({message : "error fetching income"});
        res.json({totalIncome : result[0].totalIncome || 0});
    });
};

const getTotalExpense = (req , res) => {
    const query = "SELECT SUM(amount) AS totalExpense FROM records WHERE type = 'expense'";

    db.query(query, (err,result) => {
        if(err) return res.status(500).json({message : "Error fetching expense"});
        res.json({totalExpense : result[0].totalExpense || 0});
    });
};

const getNetBalance = (req, res) => {
    const query = `SELECT
     SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
     SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)
     AS netBalance
     FROM records
    `;
   
    
    db.query(query, (err,result) => {
        if(err) return res.status(500).json({message : "Error fetching balance"});
        res.json({netBalance: result[0].netBalance || 0});
    });
};
 const getCategoryTotals = (req,res) => {
        const query = `
        SELECT category , SUM(amount) AS total
        FROM records
        GROUP BY category`;
            db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: "Error fetching category totals" });
        res.json({ data: results });
    });
};
module.exports ={
    getTotalIncome,
    getTotalExpense,
    getNetBalance,
    getCategoryTotals
};