import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/soketManger.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();
const server = createServer(app);
const io =connectToSocket(server);
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit :"40kb" , extended : true}));

app.use("/api/v1/users", userRoutes);

app.get("/Home", (req,res)=>{
    res.send("hello world");
})

const start = async() =>{
app.set("mongo_user")
    const connectionDB =await mongoose.connect("mongodb+srv://priyanshuagrawal303:uOKKNtXLjJ78xaJP@cluster0.o9jlzo4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`mongo connected DB host ${connectionDB.connection.host}`);

    server.listen(8000,()=>{
        console.log("listening on port 8000")
    })
}

start();