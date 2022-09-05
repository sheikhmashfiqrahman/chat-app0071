
//All imports
import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Services from './Services';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
//import './style.css'

/**
 * This is our landing page, which allows the user to register them into the system 
 * using username, password, firstname and lastname. 
 * 
 * @returns renders our landing page with a registration form and a form handler 
 */
const Register = () => {
    const navigate = useNavigate();

    /**
     * username, password, firstname and lastname are stored as a mutable value which
     * does not require any re-render when the page is updated
     * 
     *  */ 
    const userNameRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    /**
     * @param {*} event 
     * when register event is triggered the body is sent back to the backend to register the user 
     * in the database by createUser()
     * 
     */

    const createUser = (event) => {

        event.preventDefault();
        // user information body 
        const body = {
            username: userNameRef.current.value,
            password: passwordRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value
        }
        Services.create(body)
            .then(object => {
               
                // if user is unique
                if (object.status === "success") {
                    // using localStorage token
                    localStorage.setItem('username', object.username);
                    localStorage.setItem('token', object.token);
                    alert("Registration Successful!")
                    //navigate back to login page
                    navigate('/login')
                }
                else {
                    // if same user information exists
                    alert("Registration Failed. Please try again");
                }
            })
    }
   
    // rendering of the register page
    return (
        <div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-t-30 p-b-50">
                        <span className="login100-form-title p-b-41">Register</span>
                        <form onSubmit={createUser} className="login100-form validate-form p-b-33 p-t-5">
                            <div
                                className="wrap-input100"
                            >
                                <input
                                    className="input100"
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    ref={userNameRef}
                                    required
                                />
                                <span className="focus-input100" />
                            </div>
                            <div
                                className="wrap-input100"
                            >
                                <input
                                    className="input100"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    ref={passwordRef}
                                    required
                                />
                                <span className="focus-input100" />
                            </div>
                            <div
                                className="wrap-input100"

                            >
                                <input
                                    className="input100"
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    ref={firstNameRef}
                                    required
                                />
                                <span className="focus-input100" />
                            </div>
                            <div
                                className="wrap-input100"
                            >
                                <input
                                    className="input100"
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    ref={lastNameRef}
                                    required
                                />
                                <span className="focus-input100" />
                            </div>
                            <div className="container-login100-form-btn m-t-32">
                                <button type="submit" className="login100-form-btn">Register</button>
                            </div>
                            <div style={{ textAlign: "center", color: "#ffffff" }}>
                                <Link to="/login" >Login</Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );

}



export default Register;