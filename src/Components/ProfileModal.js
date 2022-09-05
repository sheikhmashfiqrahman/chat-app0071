
// all imports
import { useState, useRef } from 'react'
import React from 'react';
import '../Styles/modal.css';
import { set } from 'mongoose';

/**
 * The user can update first name last and password from the box. Username is set permanently
 * @param {*} param0 
 * @returns returns profile modal dialogue box for updating user profile
 */

const ProfileModal = ({ profileFormFn, profileShow, props, userProfile }) => {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    // make the object passed from the conversation as strings. 
    const profileInfo = JSON.stringify(userProfile);
    const objInfo = JSON.parse(profileInfo);

    //if profile show is not true 
    if (!profileShow) {
        return null
    }


    

    //Added back the refs because the handlers were not able to capture the values hence was 
    //showing empty string in both front end and back end.
    const formHandler = (event) => {
        event.preventDefault()
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        profileFormFn(firstName, lastName, username,password)   

    }
    // creating a component for the user profile view for conditional render
    // condition check for object info of the user profile
    const userProfileView = (objInfo[0] !== null) ? <form onSubmit={formHandler}>
        <div>
            <span>First Name</span>
            <input  defaultValue={objInfo[0].firstName} id="firstName" name="firstName"
                ref={firstNameRef} />
            <span />
        </div>
        < div>
            <span>Last Name</span>
            <input  defaultValue={objInfo[0].lastName}id="lastName" name="lastName"
                ref={lastNameRef} />
            <span />
        </div>
        < div>
            <span>Username</span>
            <input  defaultValue={objInfo[0].username} disabled  ref={usernameRef}/>
            <span />
        </div>
        < div>
            <span>Password</span>
            <input  defaultValue={objInfo[0].password} id="password" name="password"
                ref={passwordRef} />
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