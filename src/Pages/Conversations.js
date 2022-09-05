//All imports 
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import Services from './Services';
import Modal from '../Components/Modal';
import ProfileModal from '../Components/ProfileModal';
import MessageModal from '../Components/MessagesModal';
import Convo from './ListConvo';
import '../Styles/chat.css';
import '../Styles/main.css';


/**
 * The conversation page has the list of conversation title rendered
 * under each title there are user messages among different users.
 * @returns a rendered conversation page with user conversation page and messages under the titles
 */

const Conversations = () => {

    // Initializing all the state variables for messages and conversation 

    const messageRef = useRef();

    const [show, setShow] = useState(false);

    const [profileShow, setProfileShow] = useState(false);

    const [messageModalShow, setMesssageModalShow] = useState(false)

    const [conversationsList, setConversationsList] = useState([]);

    const [messagesList, setMessagesList] = useState([]);

    const [convTitle, setConvTitle] = useState('');

    const [convId, setConvId] = useState('');

    const [userProfile, setUserProfile] = useState({});

    const [messageId, setMessageId] = useState('');

    const navigate = useNavigate()


    /**
     * 
     * @param {*conversation title} title  
     * @param {*recipients name} name 
     * For creating a converstion title addConvo is being used. 
     * 
     */

    const addConvo = (title, name) => {
        console.log(title, name)

        const body = {
            title: title,
            name: name,
            token: localStorage.getItem("token")
        }
        console.log(body)

        Services.createConvo(body)
            .then(object => {
                
                setConversationsList(conversationsList => [...conversationsList, object])
                // console.log(conversations)
                // bug fixed
                //setConversationsList(object)
                alert("conversation created with the requested recipient")

            })
        const token = localStorage.getItem('token')
    }

    /**
     * 
     * @param {*} event 
     * 
     * Creating messages for specic users 
     */

    const addMessage = (event) => {

        event.preventDefault();
        const Text = messageRef.current.value;
        const Creatorid = localStorage.getItem('username');
        const ConversationId = convId;
        console.log("This conersation", ConversationId);

        const body = {
            text: Text,
            conversationId: ConversationId,
            creatorId: Creatorid
        }

        Services.createMessage(body)
            .then(object => {
                console.log("post", object)
                // console.log(conversations)
                setMessagesList([...messagesList, object])

            })

    }

    /**
     * 
     * @param {*} reaction 
     * @param {*} messageId 
     * 
     * update react request from front end
     */

    const addReaction = (reaction, messageId) => {
        console.log("This is reaction", reaction, "This is messageId" + messageId)
        const body = {
            reaction: reaction
        }
        Services.addReaction(messageId, body)
            .then(object => {
                console.log("received reaction", object)
            })
    }

    /**
     * 
     * @param {*} messageId 
     * 
     * delete message request send to the back end 
     */


    const deleteMessage = (messageId) => {
        console.log("This is messageId" + messageId)
        Services.removeMessage(messageId)
            .then(object => {
                console.log("message Deleted", object)
            })
    }


    /**
     * 
     * @param {*} event 
     * when profile modal is clicked we show the user their information by getUserProfile()
     */
    const getUserProfile = (event) => {

        event.preventDefault();
        const userToken = localStorage.getItem('token')

        Services.getUserProfile(userToken)
            .then(object => {
                console.log("post", object)
                setUserProfile(object)
                setProfileShow(true);
            })

    }

    //TO DO 
    /**
     * 
     * @param {*} firstName 
     * @param {*} lastName 
     * @param {*} username 
     * @param {*} password 
     * 
     * updateProfile() updates the existing users details (firstname, lastnamem, password)
     * 
     * 
     */
    const updateProfile = (firstName, lastName, username, password) => {
        console.log(firstName, lastName, username, password)
        const userToken = localStorage.getItem('token')
        
        const body = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }
        console.log(body);
        Services.updateUserProfile(userToken, body)
            .then(object => {
                console.log("profile object", object)
                alert("userprofile updated")

            })

    }


    /**
     * 
     * @param {*} event 
     * @param {*} key 
     * @param {*} title 
     * 
     * getConversationId is used to set our messages for specific users in the state variable.
     */
    const getConversationId = (event, key, title) => {
        event.preventDefault();
        console.log("conversation key", key);
        console.log("title", title);
        setConvTitle(title);
        setConvId(key);
        Services.getUserMessages(convId)
            .then(object => {
                console.log("messages", object)
                setMessagesList(object)
            })
    }

    /**
     * 
     * @param {*} event 
     * 
     * This method is added for logout, token is removed and navigated back to to login page 
     * using useNavigate hook 
     * 
     */


    const logoutHandler = (event) => {
        event.preventDefault();
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        //window.open("/login");
        navigate("/login")
    }

    /**
     * 
     * @param {*} event 
     * A click handle for our individual messages
     * 
     */

    const messageClickHandler = (event) => {
        event.preventDefault();
        // uid is message id here. 
        // event.current.id was not reading for some reason. had to store it in a variable 
        const uid = event.currentTarget.id
        setMessageId(uid)
        setMesssageModalShow(true);
    }

    /**
     * 
     * @param {*} reaction 
     * @returns 
     * 
     * 
     */

    const reactionRender = (reaction) => {
        // reaction is true, thumbs up shown 
        if(reaction == true) {
            return <div className="fa fa-thumbs-up"></div>
        }
        // reaction is false, thumb down show
        else if(reaction == false) {
            return <div className="fa fa-thumbs-down"></div>
        }

        else {
            return <div></div>
        }
    }


    // creating message list for the users
    const convoMessageList = messagesList.length !== undefined && messagesList.map((m, i) => {

        return (
            <li key={i} id={m.id} onClick={messageClickHandler}><b>{m.creatorId}:</b> {m.text} {reactionRender(m.reaction)}</li>
        )
    })


    // creating the conversation title list using a list, 
    const convoList = conversationsList.length !== undefined && conversationsList.map((c, i) => {
        return (
            <li id="chat-nav" onClick={event => getConversationId(event, c.id, c.title)} key={i}>{c.title}</li>
        )
    })

    // setting the conversation title list when page refreshing using useEffect 
    // set the conversation list from the token 

    useEffect(() => {
        const token = localStorage.getItem('token')
        Services.getConvo(token)
            .then(object => {
                console.log('promise fulfilled', object)

                setConversationsList(object)
                console.log("this new", object)
            })


    }, [])

    // setting the messege list by re rendering the page instantly using useEffect

    useEffect(() => {
    // set 
        Services.getUserMessages(convId)
            .then(object => {
                console.log("messages", object)
                setMessagesList(object)
            })


    }, [convId])


    
// rendering the whole coversation page by using modal, profile modal, message modal as components, 
    return (
        <div>

            <title>Conversations</title>

            <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💬</text></svg>" />

            <link rel="stylesheet" type="text/css" href="../styles/main.css" />

            <link rel="stylesheet" type="text/css" href="../styles/chat.css" />

            <div id="error-message">
                <p id="error-text" />
                <button id="error-button" onClick="hideError(); return false">X</button>
            </div>

            <div className="container">
                <div className="side">
                    <div>
                        <p className="title">Conversations</p>
                    </div>
                    <div id="side-nav">
                        <ul>
                            {convoList}
                        </ul>

                    </div>

                </div>
                <div id="chat-area" className="main">

                    <div id="chat-nav">

                        <p id="chat-title" className="title">{convTitle}</p>

                        <button onClick={() => setShow(true)} className="chat-button">
                            Create Conversation
                        </button>

                        <Modal formFn={addConvo} show={show} props={() => setShow(false)} />

                        <button onClick={getUserProfile} className="chat-button" >
                            Profile
                        </button>

                        <ProfileModal profileFormFn={updateProfile} profileShow={profileShow} props={() => setProfileShow(false)} userProfile={userProfile} />

                        <button onClick={logoutHandler} id="logout-button" className="chat-button" type="submit" >
                            Logout
                        </button>

                    </div>

                    <div id="messages">
                        <ul>
                            {convoMessageList}
                        </ul>
                        <MessageModal deleteFn={deleteMessage} reactionFn={addReaction} messageShow={messageModalShow} messageId={messageId} props={() => setMesssageModalShow(false)} />
                    </div>

                    <form id="message-input">

                        <textarea id="chat-message" name="chat-message" defaultValue={""} ref={messageRef} />

                        <button onClick={addMessage} id="submitMessage" className="chat-button" type="submit" onclick="sendMessage();return false">
                            <p>Send</p>
                        </button>

                    </form>

                </div>
            </div>

        </div>
    );
}

export default Conversations;