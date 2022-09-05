/**
 * This is where we handle our conversation from the back-end server.
 * 
 */

const auth = require('./auth')
const models = require('../models')

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * creating conversations between speicific users and 
 * store the user token in a list for group conversations 
 * 
 */

const createConversation = async (request, response) => {

    const title = request.body.title;
    const token = request.body.token;
    const participantName = request.body.name;
    const tokenList = [];
    tokenList.push(token)

    console.log("this is the participant name",participantName);
    const user = await models.Session.find({ 'username': participantName });
    console.log("returned user",user)


    if (user !== null) {
        tokenList.push(user[0]._id.valueOf())
        const conversation = new models.Conversation({ title, tokenList });
        const returned = await conversation.save();
        if (returned) {
            response.json({ title: title, tokenList: tokenList, message: 0 })
        } else {
            response.json({ status: "error" })
        }
    } else {
        response.json({status: "error"})
    }




}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * 
 * filtering the coversation title between specific users 
 * user will see their conversatoin only otherwise it is going to 
 * list all the user conversatoin. Handy for group conversation as everyone 
 * is under one token list.
 */

const getConversations = async (request, response) => {

    
    console.log(request.params);
    const token = request.params.id;
    console.log('hello', token);
    let conversation = await models.Conversation.find();
    
    // filter conversations using conversation id which is params.id 
    conversation = conversation.filter(c=>c.tokenList.includes(token)===true)


    if (conversation.length !== 0) {
        response.json(conversation)
    } else {
        response.send({ status: "null" })
    }

}

module.exports = {
    createConversation,
    getConversations
}