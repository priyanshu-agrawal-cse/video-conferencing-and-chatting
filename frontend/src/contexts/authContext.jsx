import axios from "axios"
import {  createContext, useContext, useState } from "react"
import httpStatus from "http-status"
import { useNavigate } from 'react-router-dom';
import server from "../envirement";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL :`${server}/api/v1/users`
})

export const AuthProvider=({children })=>{
    const authContext = useContext(AuthContext);

    const [UserData,setUserData]= useState(authContext);

    const handelRegister = async(name , username , password)=>{
        try {
            let request = await client.post("/register",{
                name : name,
                password:password,
                username :username,
            })
            if(request.status === httpStatus.CREATED){
                return request.data.message ;
            }
        } catch (error) {
            throw error;
        }
    }
const handleLogin = async(username, password)=>{
    try {
        let request = await client.post("/login", {
            username : username,
            password : password,
        })
        console.log(username)
        if(request.status === httpStatus.OK){
            localStorage.setItem("token",request.data.token);
        }
        return request
    } catch (error) {
        throw error;
    }
    
}
    const router = useNavigate();

    const getHistoryOfUser =async ()=>{

        
        try {
            let reequest = await client.get("/get_all_activity",{
                params:{
                    token : localStorage.getItem("token")
                }
            })
            // console.log(localStorage.getItem("token"))
            return reequest.data;
        } catch (error) {
           throw error ;
        }

    }



    const addToUserHistory =async (meetingCode)=>{
        try {
            let reequest = await client.post("/add_to_activity",{
                params:{
                    token : localStorage.getItem("token"),
                    meeting_code : meetingCode

                }
            })
            return reequest;
        } catch (error) {
           throw error ;
        }

    }

    const data = {
        UserData , setUserData, handelRegister , handleLogin ,addToUserHistory, getHistoryOfUser,
    }
    return(
        <AuthContext.Provider value={data}>
            {children }
        </AuthContext.Provider>
    )
}