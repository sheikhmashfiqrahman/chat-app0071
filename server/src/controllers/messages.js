const { model } = require('mongoose');
const models = require('../models')
const auth = require('./auth')


/**
 * 
 * @param {*} request 
 * @param {*} response 
 * creator id is our specific user (check schema)
 */

const createMessage = async (request, response) => {
    const text = request.body.text;
    const conversationId = request.body.conversationId;
    const creatorId = request.body.creatorId;

    const message = new models.Message({ text, conversationId, creatorId });
    const returned = await message.save();
    if (returned) {
        response.json({ messageId: returned._id.valueOf(), text: text, conversationId: conversationId, creatorId: creatorId })
    } else {
        response.json({ status: "error" });
    }

}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * 
 * filter the messages of user specifics 
 */

const getMessages = async (request, response) => {

    const conversationId = request.params.id;
    console.log("conversationID", conversationId)
    const messages = await models.Message.find()
   
    const conversationMessages = messages.filter(m => m.conversationId === conversationId);

    if (conversationMessages !== null) {
        response.json(conversationMessages)
    } else {
        response.send("Not Found")
    }

    
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */

const getMessage = async (request, response) => {

    const user = await auth.validUser(request)

    if (user) {
        const msgid = request.params.msgid
        const result = await models.Message.findById(msgid).populate('creator')
        response.json(result)
    } else {
        response.sendStatus(401)
    }

}


/**
 * 
 * @param {*} request 
 * @param {*} response 
 * deletes message from the db  using params id,
 * message id send from the url  
 * 
 */
const deleteMessage = async (request, response) => {


    const messageId = request.params.id;
    console.log("messageId", messageId);
   
    const result = await models.Message.findByIdAndDelete(messageId)
    if (result) {
        response.json({ status: 'success' })

    } else {
        response.json({ 'status': 'unable to delete message' })
        response.sendStatus(400) // not quite the right status but will do
    }
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * it adds reaction to the database as true or false for like and dislike,
 * params id is send from the url 
 * 
 */


const addReaction = async (request, response) => {
    const messageId = request.params.id;
    const reaction = request.body.reaction;
    console.log(reaction);
    const result = await models.Message.findByIdAndUpdate(messageId, { reaction: reaction })
    if (result) {
        response.json({ status: 'success' })
    } else {
        response.json({ 'status': 'unable to add reaction' })
        response.sendStatus(400);
    }

}

module.exports = {
    createMessage,
    getMessages,
    getMessage,
    deleteMessage,
    addReaction
}