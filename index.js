const express=require("express");
const {connection}=require("./config/db");
const {userRouter}=require("./routes/user.route");
const {postRouter}=require("./routes/post.route");
const {authenticate}=require("./middlewares/authenticate.midd");
const cors=require("cors")
require('dotenv').config();

const app=express();
app.use(express.json());
app.use(cors())


app.get("/",(req,res)=>{
    try {
        res.send("welcome To Home Page")
    } catch (error) {
        res.send("err:Not Able Get Home Page");
        console.log(error);
    }
})



app.use("/user",userRouter);
app.use(authenticate)
app.use("/post",postRouter)




app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected To DB");
    } catch (error) {
        console.log("err:Not Able To Connect The DB");
    }
    console.log(`server is running on port:${process.env.port}`);
})