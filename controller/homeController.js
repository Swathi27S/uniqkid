const productSchema = require("../models/productModel")
const categorySchema = require("../models/categoryModel")





module.exports ={

    //home page rendering

getHome : async(req,res)=>{
    try{
        req.session.loggedIn=true
        let userData=req.session.user
        console.log(userData)
        const productDetails = await productSchema.find({isDeleted:false})
    res.render("user/home",{product:productDetails,userData})

    }catch(err){
    console.log("err in gethome"+error)
}



},

//get products

 getProducts : async (req,res)=>{
     try{
        req.session.loggedIn=true
        let userData=req.session.user
       
        const productDetails = await productSchema.find()
        res.render("user/shop",{products : productDetails,userData})
   }catch(error){
        console.log("err in get product "+err)
   } },



   //single product get
   getSingleProduct: async (req, res) => {
    try {
        req.session.loggedIn=true
        let userData=req.session.user
        const productId = req.params.id; 
        
        const singleProduct = await productSchema.findById(productId);
        
        res.render("user/singleproduct", { product: singleProduct,userData });
    } catch (error) {
        console.log("getSingleProduct error: " + error);
       
    }
},





}