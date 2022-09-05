// custom routes have been created, the routes given before were not used

const express = require('express')
const auth = require('./controllers/auth')
const conv = require('./controllers/conversations')
const messages = require('./controllers/messages')

const router = express.Router()
 
router.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

router.post('/api/auth/register', auth.createSession)

//router.get('/auth/', auth.getUser)
router.post('/api/auth/', auth.getUser)

/*Added new routing for user profile*/
router.get('/api/userProfile/:id', auth.fetchUserProfile);

router.put('/api/updateUserProfile/:id', auth.updateUserProfile);

//router.post('/api/userProfile/', auth.getUserProfileInfo)

/* GET conversations returns a list of all current conservations */
router.get('/api/conversations/:id', conv.getConversations)

/* POST to conversations creates a new conversation */
router.post('/api/conversations', conv.createConversation)

/* GET a conversation returns the list of the last N conversations */
//router.get('/api/conversations/:id', messages.getMessages)

/* POST to a conversation to create a new message */
// router.post('/api/conversations/:id', messages.createMessage)
router.post('/api/messages', messages.createMessage)

/* GET a message URL to get details of a message */
router.get('/api/messages/:id', messages.getMessages)

/* DELETE to message URL to delete the message */
router.delete('/api/messages/:id', messages.deleteMessage)

/* PUT to update message with reaction*/
router.put('/api/messages/:id', messages.addReaction)



module.exports = router 