const {db}=require("../database/db");

exports.createCourse=(req,res)=>{
    const userId = req.user.id;
    console.log(userId);
    const {title,description}=req.body;
    if(!title || !description){
      return res.status(400).json({ error: "All fields are required" });
    }
    const sql = `INSERT INTO courses (title, description,user_id) VALUES (?, ?,?)`;

    try{
       db.run(sql, [title, description,userId], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database Error" });
        }
        
        res.status(201).json({
            message: "Course posted successfully",
            courseId: this.lastID // This is how you get the new ID
        });
    });

    }catch(e){
        console.error(e);
        res.status(500).json({ error: "Server Error" });
    }
}

exports.getAllCourses=async(req,res)=>{
    const sql = `SELECT courses.*, users.username 
        FROM courses 
        JOIN users ON courses.user_id = users.id`;
    try{

      db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Server Error" });
        }
        
        res.status(200).json({
            message: "Fetched all courses",
            data: rows 
        });
    });
    }catch(e){
         console.error(e);
        res.status(500).json({ error: "Server Error" });
    }

}

exports.updateCourse = (req, res) => {
    const courseId = req.params.id;
    const userId = req.user.id;
    const { title, description } = req.body;

    const findSql = `SELECT user_id FROM courses WHERE id = ?`;

    db.get(findSql, [courseId], (err, course) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (!course) return res.status(404).json({ error: "Course not found" });

        if (course.user_id !== userId) {
            return res.status(403).json({ error: "Unauthorized: You can only update your own courses" });
        }
        const updateSql = `
            UPDATE courses 
            SET title = COALESCE(?, title), 
                description = COALESCE(?, description) 
            WHERE id = ?
        `;
        
        db.run(updateSql, [title || null, description || null, courseId], function(err) {
            if (err) return res.status(500).json({ error: "Update failed" });
            
            res.json({ 
                message: "Course updated successfully", 
                updatedId: courseId,
                changes: this.changes // Tells you how many rows were affected
            });
        });
    });
};

exports.deleteCourse = (req, res) => {
    const courseId = req.params.id;
    const userId = req.user.id; // From your authenticateToken middleware

    const findSql = `SELECT user_id FROM courses WHERE id = ?`;

    db.get(findSql, [courseId], (err, course) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (!course) return res.status(404).json({ error: "Course not found" });

        if (course.user_id !== userId) {
            return res.status(403).json({ error: "Unauthorized: You can only delete your own courses" });
        }

        const deleteSql = `DELETE FROM courses WHERE id = ?`;
        db.run(deleteSql, [courseId], function(err) {
            if (err) return res.status(500).json({ error: "Delete failed" });
            
            res.json({ 
                message: "Course deleted successfully", 
                deletedId: courseId 
            });
        });
    });
};