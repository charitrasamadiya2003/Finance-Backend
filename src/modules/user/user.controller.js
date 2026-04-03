const db = require("../../config/db");
const createUser = (req, res) => {
    const {name , email , password, role} = req.body;

    if(!name || !email || !password || !role){
        return res.status(400).json({
            message : "All fields are required"
        });
    }
    const query = `INSERT INTO users (name , email, password, role)
    VALUES(?, ?, ?, ?)`;
    db.query(query, [name, email, password, role], (err,result) => {
        if(err){
            console.log(err);
            return res.status(500).json({message : "Error creating user"});
        }
        res.status(201).json({
            message: "User created successfullly",
            userId: result.insertId
        });
    });
};
const getUsers = (req,res) => {
    const query = "SELECT id , name , email, role, is_active, created_at FROM users";
    db.query(query, (err,results) => {
        if(err){
            console.log(err);
            return res.status(500).json({message : "Error fetching users"});
        }
        res.status(200).json({
            message : "Users fetched succesfully",
            data : results
        });
    });
};
module.exports = {createUser, getUsers};