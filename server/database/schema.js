const {db}=require("./db");

const initDB=()=>{
    db.serialize(()=>{
        //Users table
        db.run(
            `CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            email TEXT)`
        );

        //COURSES
        db.run(`CREATE TABLE IF NOT EXISTS courses(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            FOREIGN KEY(user_id) references users(id)
            )`);

   

      console.log("Courses schema initialized");
    });
}

module.exports={initDB}