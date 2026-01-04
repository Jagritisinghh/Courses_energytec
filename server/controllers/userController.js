const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {db}=require("../database/db");
require("dotenv").config();

const JWT_SECRET=process.env.SECRET_KEY;

exports.register = async (req, res) => {
    const { username, password, email } = req.body;

    // 1. Basic Field Validation
    if (!username || !password || !email) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // 2. Email Format Validation (Regex)
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegexp.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;

        db.run(sql, [username, hashedPassword, email], function (err) {
            if (err) {
                if (err.message.includes("UNIQUE constraint failed")) {
                    return res.status(400).json({ error: "Email or Username already exists" });
                }
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            }
            
            res.status(201).json({ 
                message: "User registered successfully", 
                userId: this.lastID 
            });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
};


exports.login = (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE username = ?`;

    db.get(sql, [username], async (err, user) => {
        if (err || !user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "24h" });
        res.json({ message: "Login successful", token ,user: {
                id: user.id,
                username: user.username,
                email: user.email
            }});
    });
};





exports.getAllUsers=(req,res)=>{
    const sql=`SELECT id,username FROM users`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows); // Saare users ki list yahan se jayegi
    });

}