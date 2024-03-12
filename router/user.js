const express=require('express');
const router=express.Router();
const userController = require("../controller/userController")



router.get("/profile",userController.getUserProfile)
router.get("/editprofile/:id",userController.getEditProfile)
router.patch("/editprofile/:id",userController.postEditProfile)

router.get("/addaddress/:id",userController.getAddAddress)
router.post("/addaddress",userController.postAddAddress)

router.get("/editaddress/:id",userController.getEditAddress)
router.patch("/editaddress/:id",userController.postEditAddress)
router.delete("/deleteaddress/:id",userController.deleteAddress)

module.exports=router;