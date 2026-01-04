const express=require("express");
const router=express.Router();
const userController=require("../controllers/userController");

//Register
router.post("/register",userController.register);
router.post("/login",userController.login);

router.get("/",userController.getAllUsers);

module.exports = router;