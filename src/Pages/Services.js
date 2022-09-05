import axios from "axios";

// services have all the crud operations needed to communicate with the backend 


// const baseURL = 'http://localhost:8102/auth'
// const convoURL = 'http://localhost:8102/api/conversations/'
// const msgURL = 'http://localhost:8102/api/messages'
// const userProfileURL = "http://localhost:8102/api/userProfile/"
const baseURL = 'http://localhost:8102/api'
// const convoURL = 'http://localhost:8102/api/conversations/'
// const msgURL = 'http://localhost:8102/api/messages'
// const userProfileURL = "http://localhost:8102/api/userProfile/"




//Get the user when logging in
const getUser = (newObject) => {
    return axios.post(baseURL+`/auth`, newObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}



//Fetch logged in user's profile information GET
const getUserProfile = (token) => {
    console.log("Token", token)
    return axios.get(baseURL+`/userProfile/${token}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}

const updateUserProfile = (token, body) => {
    console.log("Token", token)
    return axios.put(baseURL+`/updateUserProfile/${token}`,body, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}

//Create or Register a new User
const create = (newObject) => {
    return axios.post(baseURL + "/auth/register", newObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}

//Create a new conversation for a speciifc user
const createConvo = (newObject) => {
    return axios.post(baseURL+'/conversations/', newObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}

//Create a new Message specific to user and conversation
const createMessage = (newObject) => {
    return axios.post(baseURL+`/messages`, newObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}


//Get all messages specific to a conversation
const getUserMessages = async (messageId) => {
    const response = await axios.get(baseURL+`/messages`+`/${messageId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

//Get all conversations created for a specific user
const getConvo = (token) => {
    console.log("Token object", token)
    return axios.get(baseURL+`/conversations/${token}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}
// add reaction using messageid
const addReaction = (messageId,reaction) => {
    console.log("reaction-value", reaction)
    return axios.put(baseURL+`/messages`+`/${messageId}`,reaction,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}

//remove message using messageid
const removeMessage = (messageId) => {
    return axios.delete(baseURL+`/messages`+`/${messageId}`)
        .then(response => response.data)
}



export default { getUser, create, createConvo, getConvo, createMessage, getUserProfile, getUserMessages, updateUserProfile, addReaction, removeMessage }