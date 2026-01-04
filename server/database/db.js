const sqlite3=require("sqlite3").verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../courses.db');
const db=new sqlite3.Database(dbPath,(err)=>{ 
    if (!err) {
        db.run("PRAGMA foreign_keys = ON;");
        console.log("Connected and Foreign Keys enabled.");
    }
    if(err){ 
        return console.log(err.message)}
    console.log("Connected to the SQLite database: courses.db")
    });
 
module.exports={db};