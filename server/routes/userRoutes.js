const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { pool } = require("../db/connection")
const router  = express.Router();


router.post("/register", async (req, res) => {
    try{
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill out empty fields" });
        }

        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1", [email])
    

        if(user.rows.length > 0 ) {
            return res.status(400).json({message: "Email already in use"})
        }

        const hashPW = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO users(name, email, hash_password) VALUES ($1, $2, $3) RETURNING id",
            [name, email, hashPW]
        );
        res.json({ message: "User successfully registered", user: newUser.rows[0]})

    } catch(error) {
        console.log(error)
    }
});

router.post("/login", async (req, res) => {
    try{
        const { email, password }= req.body;

        if ( !email || !password) {
            return res.status(400).json({ message: "Please fill out empty fields" });
        }

        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1", [email])

        // console.log(user)

        //for select query use res.rows.length to check for empty query response
        if(user.rows.length === 0){
            return res.status(401).json({ message: "No user exists"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.rows[0].hash_password);

        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid credentials"});
        }

        const token = jwt.sign({ userId: user.rows[0].id }, process.env.SECRET);
        console.log(token)

        res.status(200).json({ token })

    }catch(error){
        console.log(error)
    }
})



module.exports = router;
