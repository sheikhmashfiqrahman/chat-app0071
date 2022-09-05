import { useState, useRef } from 'react'
import React from 'react';
import '../Styles/modal.css';
import { set } from 'mongoose';



// this modal not used
// added for future work 
const ProfileModal = ({ profileFormFn, profileShow, props, userProfile }) => {



    const[firstName, setFirstName]=useState("")
    const[lastName,setLastName]=useState("")
    const[userName,setUserName]=useState("")
    const[password, setPassword]=useState("")
    

    console.log("userProfile" + userProfile)
    const profileInfo = JSON.stringify(userProfile);
    const objInfo = JSON.parse(profileInfo);

    if (!profileShow) {
        return null
    }


    const handleFirstName= (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setFirstName(event.target.value)
        
    }

    const handleLastName= (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setLastName(event.target.value)
        
    }

    const handlePassword= (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setPassword(event.target.value)
       
        
    }

    const handleUserName= (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setUserName(event.target.value)
      
        
    }


    const formHandler = (event) => {
        event.preventDefault()
        // const firstName = firstNameRef.current.value;
        // const lastName = lastNameRef.current.value;
        // const username = usernameRef.current.value;
        // const password = passwordRef.current.value;



        profileFormFn(firstName, lastName, userName,password)
        setFirstName("")
        setLastName("")
        setUserName("")
        setPassword("")

    }

    const userProfileView = (objInfo[0] !== null) ? <form onSubmit={formHandler}>
        <div>
            <span>First Name</span>
            <input  defaultValue={objInfo[0].firstName} id="firstName" name="firstName"
                onChange={handleFirstName} />
            <span />
        </div>
        < div>
            <span>Last Name</span>
            <input  defaultValue={objInfo[0].lastName}id="lastName" name="lastName"
                onChange={handleLastName} />
            <span />
        </div>
        < div>
            <span>Username</span>
            <input  defaultValue={objInfo[0].username} disabled />
            <span />
        </div>
        < div>
            <span>Password</span>
            <input  defaultValue={objInfo[0].password} id="password" name="password"
                onChange={handlePassword} />
            <span />
        </div>
        <div className="modal-footer">
            <button  className="button" type="submit">
                Update
            </button>
            <button onClick={props} className="button" type="submit">
                Close
            </button>
        </div>
    </form> : <div>
        <h2>No Profile available</h2>
    </div>


    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Update Profile</h4>
                </div>
                <div className="modal-body">
                    {userProfileView}
                </div>
            </div>
        </div>
    )
}
export default ProfileModal