const userSchema = require("../models/usermodel")
const addressSchema = require("../models/addressModel");
const addressModel = require("../models/addressModel");
const {ObjectId} = require("mongodb")
const adminModel = require("../models/adminmodel")




module.exports={

   // user getting

 getUser : async (req, res) => {
    try {
        const user= await userSchema.find({})
        
        
        res.render("admin/userlist",{users:user})
           
        
    } catch (error) {
        console.log("Error in getUser:", error);
       
    }
},


    

// user block
    
   userBlock : async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await userSchema.findById(userId);
            
            
            user.isBlocked = true;
            await user.save();
            
            res.redirect("/userList");
        } catch (error) {
            console.log("Error in blocking user:", error);
           
        }
    },


    //user unblock
    
        userUnblock : async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await userSchema.findById(userId);
            
            
            user.isBlocked = false;
            await user.save();
            
            res.redirect("/userList");
        } catch (error) {
            console.log("Error in unblocking user:", error);
            
        }
    },



    // user profile get


    getUserProfile: async (req, res) => {
        try {
           
            if (!req.session.user) {
                return res.status(400).send("User data not found in session");
            }
            const user = await userSchema.findById(req.session.user);
            const address = await addressModel.find({userId : new ObjectId(req.session.user._id)})
    
            res.render("user/profile", { userData: user ,address});
    
        } catch (error) {
            console.log("Error in getting profile:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    // EDIT PROFILE page

    getEditProfile : async(req,res)=>{
        try{
            const user= await userSchema.findById(req.session.user)
            res.render("user/editprofile",{userData :user})

        }catch(error){
            console.log("err in getedit profile"+error)
        }
    },

    //post edit profile
    postEditProfile : async(req,res)=>{
        try{
            await userSchema.updateOne({_id:req.session.user},{$set:{firstName:req.body.firstName,lastName:req.body.lastName,email:req.body.email}})
            res.redirect("/profile")


        }catch(error){
            console.log("err in post edit profile"+err)
        }
    },
    // ADD ADDRESS

    getAddAddress : async(req,res)=>{
        try{
             const user = await userSchema.findById(req.session.user)
             res.render("user/addaddress",{userData:user})
        }catch(error){
            console.log("err in getaddadress"+error)
        }
    },


    //post add address
    postAddAddress : async(req,res)=>{
        try{
            console.log(req.body)
            console.log(req.session.user)
            const address=new addressModel({
                landmark : req.body.landmark,
                street : req.body. street,
                village : req.body.village,
                city : req.body.city,
                state: req.body. state,
                country :req.body.country,
                phonenumber : req.body.phonenumber,
                zip : req.body.zip,
                userId:new ObjectId(req.session.user._id)
                
            })
            await address.save()
            res.redirect("/profile")
        }catch(error){
            console.log("err in postaddress"+error)
        }
    },

    //edit address

    getEditAddress : async(req,res)=>{
        try{
           
            const address= await addressModel.findById(req.params.id)
           
            const userId = req.session.userId
            res.render("user/editaddress",{address:address,userId})
        }catch(error){
            console.log("err in getedit"+error)
        }
    },

    //post edit adddress

    postEditAddress : async (req,res)=>{
        try{
            console.log("true")
            console.log(req.body)
            const addressId = req.params.id
            
            
            await addressModel.updateOne({_id:addressId},{$set:{
                landmark:req.body.landmark,
                street : req.body.street,
                village :req.body.village,
                city:req.body.city,
                state:req.body.state,
                country:req.body.country,
                zip:req.body.zip,
                phonenumber:req.body.phonenumber
            }})
            res.redirect("/profile")

        }catch(error){
            console.log("err in posteditaddress"+error)
        }
    },


    //delete address

    deleteAddress : async (req,res)=>{
        console.log("ji")

         const addressId = req.params.id
         console.log(req.params)
            
         await addressModel.updateOne({_id:addressId},{$set:{isDeleted:true}})
        res.redirect("/profile")
    }


    
    
    
    
    
       
}
