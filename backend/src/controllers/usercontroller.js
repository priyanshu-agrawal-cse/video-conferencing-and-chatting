import { User } from "../models/usermodel.js";
import httpStatus from "http-status"
import bcrypt , {hash} from "bcrypt"
import crypto from "crypto";
import { Meeting } from "../models/meetingmodel.js";


const login = async(req, res)=>{
    let {username , password} = req.body;

    if(!username || ! password){
        res.status(400).json({message :"enter all details"})
    }


    try {
        let user =await User.findOne({username});
        if(!user){
            res.status(httpStatus.NOT_FOUND).json({message:"user not found"});
        }
let isPassword = await bcrypt.compare(password,user.password)
        if(isPassword){
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();

            res.status(httpStatus.OK).json({token :token});
        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({message:"invalide username or password"})
        }
        
    } catch (e) {
         res.status(500).json({menubar:`something went wrong ${e}`});
    }
}






const register = async(req,res)=>{
let {name , username , password} = req.body;


try {
    let existingUser = await User.findOne({username});

    if(existingUser){
        return res.status(httpStatus.FOUND).json({message : "user already exist"})
    }
    const hashPassword = await bcrypt.hash(password , 10);

const newUser = new User({
    name : name,
    password : hashPassword,
    username : username,
})
    
await newUser.save();

res.status(httpStatus.CREATED).json({message:"new user is created"});

} catch (e) {
    res.json({message:`something went wrong ${e}`});
}


}


let getUserHistory = async(req , res)=>{
let {token} = req.query;
// console.log("req.body")
try {
    let user =await User.findOne({token : token});
let meetings = await Meeting.find({user_id : user.username});
res.json(meetings);
} catch (error) {
    res.json({message : `error is ${error}` })
}

}

const addToHistory = async(req,res)=>{
    let {token , meeting_code} = req.body.params;
    try {
    let user =await User.findOne({token : token});
let newMeeting = new Meeting({
    user_id : user.username,
    meetingCode : meeting_code


})
await newMeeting.save();
res.status(httpStatus.CREATED).json({message:"meeting added to history"})
} catch (error) {
    res.json({message : `error is ${error}` })
}

}


export {login , register,addToHistory,getUserHistory}