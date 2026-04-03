const db = require("../../config/db");
const createRecord = (req , res) => {
    const {amount , type , category , date, note , user_id} = req.body;

    if(!amount || !type || !category || !date || !user_id){
        return res.status(400).json({
            message : "Required fields are missing"
        });
    }

    const query = `INSERT INTO records (amount , type , category , date , note , user_id) VALUES(?, ?, ?, ?, ?,?)`;

    db.query(query,[amount , type , category , date, note , user_id], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({message : "Error creating record"});

        }
        res.status(201).json({
            message : "Record created successfully",
            recordId : result.insertId
        });
    });
};
const getRecords = (req, res) => {
    const {type , category , startDate , endDate} = req.query;
    let query = "SELECT * FROM records WHERE 1  = 1";
    let values = [];
    if(type) {
        query += " AND type = ?";
        values.push(type);
    }
    if(category){
        query += " AND category = ?";
        values.push(category);
    }
    if(startDate && endDate){
        query += " AND date BETWEEN ? AND ?";
        values.push(startDate, endDate);
    }
    db.query(query, values , (err, results) => {
        if(err){
            console.log(err);
            return res.status(500).json({message : "Error fetching records"});
        }
        res.status(200).json({
            message : "Records fetched successfully",
            data : results
        });
    });
};

const updateRecord = (req, res) => {
    const { id } = req.params;
    const { amount, type, category, date, note } = req.body;

    if (!amount || !type || !category || !date) {
        return res.status(400).json({
            message: "Required fields are missing"
        });
    }

    const query = `
        UPDATE records
        SET amount = ?, type = ?, category = ?, date = ?, note = ?
        WHERE id = ?
    `;

    db.query(query, [amount, type, category, date, note, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error updating record" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json({ message: "Record updated successfully" });
    });
};
const deleteRecord = (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM records WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting record" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json({ message: "Record deleted successfully" });
    });
};
module.exports = { createRecord, getRecords, updateRecord, deleteRecord};