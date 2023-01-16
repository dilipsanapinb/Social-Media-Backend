const express=require("express");
const {UserModel}=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
require('dotenv').config();
const userRouter=express.Router();

//SIGN UP
userRouter.use(express.json())
userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,pass}=req.body;
    try {
        bcrypt.hash(pass, 5,async(err, hash)=> {
            if(err){
                console.log(err);
            }else{
                const user=new UserModel({name,email,pass:hash,gender});
                await user.save();
                res.send("Sign Up Is Successfull");
                console.log(user);
            }
        });
    } catch (error) {
        res.send("err:Sign Up Failed");
        console.log(error);
    }
})


//SIGN UP
userRouter.use(express.json())
userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await UserModel.find({email});
        const hs_pass=user[0].pass;
        if(user.length>0){
            bcrypt.compare(pass,hs_pass, async(err, result)=> {
                if(result){
                    jwt.sign({userID:user[0]._id},process.env.key, async(err, token)=> {
                        res.send({"msg":"Sign In Successfull","token":token})
                      });
                }else{
                    res.send("Wrong Credentials");
                    console.log(err);
                }
            });
        }else{
            res.send("Wrong Credentials");
        }
    } catch (error) {
        res.send("Wrong Credentials");
        console.log(error);
    }
})

module.exports={userRouter}
