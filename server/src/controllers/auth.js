const models = require('../models')

/* Create a new session for a user */
const createSession = async (request, response) => {

    const session = new models.Session({
        username: request.body.username,
        password: request.body.password,
        firstName: request.body.firstName,
        lastName: request.body.lastName

    })

    const returned = await session.save()
        .catch((err) => {
            response.json({ "status": "username taken" })
        })

    if (returned) {
        if (session._id) {
            response.json({
                status: "success",
                username: returned.username,
                token: returned._id
            })
        }
    }
}


const getUser = async (request, response) => {

   
    const username = request.body.username;
    const password = request.body.password;
    console.log("username: " + username);
    console.log("password: " + password);
  
    try {
        // this will throw an error if token isn't of the right format
        const match = await models.Session.find({ 'username': username });
        console.log(match);
        if (username === match[0].username && password === match[0].password) {
            response.json({
                //status: "success",
                username: match[0].username,
                token: match[0]._id.valueOf(),
                status:"success"
            })
        }
        else {
            response.json({ status: "unsuccessful" })
        }
    }
    catch { }

    //}

}

const fetchUserProfile = async (request, response) => {
    const token = request.params.id;
    console.log('Token' +token);
    try {
        let match = await models.Session.find();
        match = match.filter(m=>m.id===token)
        console.log("Users found" + match);
        if (match !== null) {
            response.json(match)
        }
        else {
            response.json({ status: "unsuccessful" })
        }
    }
    catch { }
}

// When updating, hence replacing values, any unique fields cannot be replaced with a different or similar value
// such is the case for username when updating userProfile
const updateUserProfile = async (request, response) => {
    // params as param, hence not targeting the required token and returning null
    const token = request.params.id;
    console.log(token);
    console.log("request", request.body)
       
        const firstName = request.body.firstName
        const lastName = request.body.lastName
        const username = request.body.username
        const password = request.body.password

    models.Session.findByIdAndUpdate(token, {firstName: firstName, lastName: lastName, password: password}, {new: true}) 
    .then(result =>{
        response.json(result)
    })
}

/* 
 * validUser - check for a valid user via Authorization header
 *   return the username if found, false if not
*/
const validUser = async (request) => {

    const authHeader = request.get('Authorization')
    if (authHeader && authHeader.toLowerCase().startsWith('basic ')) {
        const token = authHeader.substring(6)
        const match = await models.Session.findOne({ _id: token })

        if (match) {
            return match._id
        }
    }
    return false
}

module.exports = { validUser, getUser, createSession,fetchUserProfile, updateUserProfile }
