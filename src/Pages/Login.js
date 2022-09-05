// all the imports 

import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Services from './Services';
import { eventWrapper } from '@testing-library/user-event/dist/utils';

/**
 * 
 * This is the login page for our user to login to the chat application,
 * If login is successful, the users will be navigated to the conversation.js page.
 * The page focuses on our login applications. 
 * @returns renders the login page with a formhandler
 * 
 */
const Login = () => {

    // useNavigate hook is used for switching the pages from login to conversation page. 
    const navigate = useNavigate();

    /**
     * username and passwords are stored as a mutable value which
     * does not require any re-render when the page is updated
     * 
     *  */ 

    const userNameRef = useRef();  
    const passwordRef = useRef();


    /**
     * @param {*} event 
     * loginHandler method is used to handle the form of our login and this is passed as 
     * function for on submit.
     * 
     */
    const loginHandler = (event) => {
        event.preventDefault();
        // login body holding the username and password, for checking with the back-end using get method later.
    
        const body = {
            username: userNameRef.current.value,
            password: passwordRef.current.value,
        }

        // console.log(body);
        // Services are in a separate module. 
        // Check if we have the current user (body) in the DB 
        // If user exists the login will be successful
        // Used local storage token for authentication
        
        Services.getUser(body)
            .then(object => {

                console.log("post", object);
                console.log("status", object.status)

                if (object.status === 'success') {

                    localStorage.setItem("username", object.username)
                    localStorage.setItem("token", object.token)
                    //window.open('/conversations')
                    navigate('/conversations')
                }

                else{

                    alert('Login Unsuccessfull. Wrong Username/Password Combination. ')
                }



            })
    }
   
// rendering the login page 

    return (
        <div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-t-30 p-b-50">
                        <span className="login100-form-title p-b-41">Login</span>

                        <form onSubmit={loginHandler} className="login100-form validate-form p-b-33 p-t-5">
                            <div
                                className="wrap-input100"
                            >
                                <input
                                    className="input100"
                                    id="username"
                                    type="text"
                                    name="username"
                                    placeholder="User name"
                                    ref={userNameRef}
                                    required
                                />
                                <span className="focus-input100" data-placeholder="" />
                            </div>
                            <div
                                className="wrap-input100"
                            >
                                <input
                                    className="input100"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    ref={passwordRef}
                                    required
                                />
                                <span className="focus-input100" data-placeholder="" />
                            </div>
                            <div className="container-login100-form-btn m-t-32">
                                <button type="submit" className="login100-form-btn">Login</button>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <Link to="/" >Register</Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>


    )






}



export default Login;