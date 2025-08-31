import React, { useState } from 'react'
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import "../App.css"
import RestoreIcon from '@mui/icons-material/Restore';
import { Button, IconButton, TextField } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

function HomeComponent() {
const {addToUserHistory} = useContext(AuthContext)

    let navigator = useNavigate();
    let [meetingCode, setMeetingCode] = useState("")
    let handelJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigator(`/${meetingCode}`);
    }


    return (
        <>
            <div className='navBar'>
                <div style={{ display: "flex", alignItems: "center" }}>

                    <h3>Video call</h3>

                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={()=>{
                        navigator("/history")
                    }} >
                        <RestoreIcon />
                        <p>History</p>
                    </IconButton>

                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigator("/auth")
                    }}>Logout</Button>


                </div>

            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>
                            provide qualilty video calls
                        </h2>
                        <div style={{ display: "flex", gap: "0.6rem" }}>
                            <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                            <Button onClick={handelJoinVideoCall} variant='contained'>Join</Button>

                        </div>
                    </div>
                </div>

                <div className='rightPanel'>
                    <img srcSet='/logo3.png' alt="" />
                </div>
            </div>

        </>
    )
}


export default withAuth(HomeComponent);