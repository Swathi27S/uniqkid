const express=require('express');

const router=express.Router();


const homeController = require("../controller/homeController")




router.get("/",homeController.getHome)

router.get("/shop",homeController.getProducts)
router.get("/singleproduct/:id",homeController.getSingleProduct)






module.exports=router;
