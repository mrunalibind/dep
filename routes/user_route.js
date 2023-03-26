let express=require("express");
let userRoute=express.Router();
var jwt = require('jsonwebtoken');
let {UserModel}=require("../model/user_model")
let bcrypt = require('bcrypt');

userRoute.get("/",(req,res)=>{
    res.send("HOME PAGE OF USER")
})

userRoute.post("/register",async(req,res)=>{
    let {email,pass,age}=req.body;
    try {
        bcrypt.hash(pass, 5, async function(err, hash) {
            let user=new UserModel({email,pass:hash,age})
            await user.save()
            res.status(200).send({"msg":"Registration Successful"})
         });
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})

userRoute.post("/login",async(req,res)=>{
    let {email,pass}=req.body;
    try {
        let user=await UserModel.find({email});
        if(user.length>0){
            console.log(user)
            bcrypt.compare(pass, user[0].pass, function(err, result) {
                if(result){
                    res.status(200).send({"msg":"Login Successfull","token":jwt.sign({ userId: user[0]._id }, 'masai')})
                }
                else{
                    res.status(400).send({"msg":"Wrong Credential or User not present"})
                }
            });
        }
        else{
            res.status(400).send({"msg":"Wrong Credential or User not present"})
        }

    } catch (error) {
        res.status(400).send({"msg":error.msg});
    }
})

module.exports={userRoute}