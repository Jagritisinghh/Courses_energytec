const express=require("express");
const router=express.Router();
const courseController=require("../controllers/courseController");
const authenticateToken=require("../middleware/authMiddleware")

router.post("/create",authenticateToken,courseController.createCourse)
router.get("/",courseController.getAllCourses)
router.put("/update/:id",authenticateToken,courseController.updateCourse)
router.delete("/delete/:id",authenticateToken,courseController.deleteCourse)

module.exports=router;