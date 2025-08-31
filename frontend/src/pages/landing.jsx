import React from 'react'
import "../App.css"
import {Link, useNavigate} from "react-router-dom"
export default function LandingPage() {
     const routeTo = useNavigate();
  return (
 
    <div className='LandingPageConatiner'>
      <nav>
        <div className='navheader'><h2>video conferencing</h2></div>
        <div className='navlist'>
          <p onClick={()=>{
            routeTo("/ikgfbfgbv87ty")

          }}>join as guest</p>
          <p onClick={()=>{
            routeTo("/auth")

          }}>Register</p>
          <div role='button'>
            <p onClick={()=>{
            routeTo("/auth")

          }}>Login</p>
          </div>
        </div>
      </nav>


      <div className="landingMainContainer">
        <div>
          <h1><span style={{color:"#FF9839"}}>connect</span>  with your loved ones</h1>
        <p>cover a distance by video call</p>
        <div role='button'>
        <Link to={"/auth"}>Get Started</Link>

        </div>
        </div>
        <div>
          <img src="/mobile.png" alt="" />
        </div>
      </div>

    </div>
  )
}
