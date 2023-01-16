const express=require("express");
const{PostModel}=require("../models/post.model")
const postRouter=express.Router();

postRouter.use(express.json());

//GET Post
postRouter.get("/",async(req,res)=>{
    const query=req.query
    try {
        const post=await PostModel.find(query);
        res.send(post);
        console.log("All Posts Data");
    } catch (error) {
        res.send("err:Not Able To Get The Post Data");
        console.log(error);
    }
})

//POST 

postRouter.post("/add",async(req,res)=>{
    const payload=req.body;
    try {
        const post=new PostModel(payload);
        await post.save();
        res.send("Post added Successfully");
        console.log(post);
    } catch (error) {
        res.send("err:Not Able To Post Data");
        console.log(error);
    }
})

//PATCH
postRouter.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    const payload=req.body;
    const post=await PostModel.findOne({"_id":id});
    userID_in_post=post.UserID;
    userID_in_making_req=req.body.UserID
    try {
        if(userID_in_making_req!==userID_in_post){
            res.send("You Are Not Authorised Person")
    }else{
        await PostModel.findByIdAndUpdate({_id:id},payload)
        res.send("Post Updated Successfully");
    }
    } catch (error) {
        res.send("err:Not Able To Update Data");
        console.log(error);
    }
})

//DELETE
postRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const post=await PostModel.findOne({"_id":id});
    userID_in_post=post.UserID;
    userID_in_making_req=req.body.UserID
    try {
        if(userID_in_making_req!==userID_in_post){
            res.send("You Are Not Authorised Person")
    }else{
        await PostModel.findByIdAndDelete({_id:id})
        res.send("Post Deleted Successfully");
    }
    } catch (error) {
        res.send("err:Not Able To Delete Data");
        console.log(error);
    }
})
module.exports={postRouter}

