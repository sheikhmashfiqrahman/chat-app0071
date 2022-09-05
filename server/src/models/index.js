/**
 * We create our database schema here under the module models.  
 *
 */

const mongoose = require('mongoose')
const config = require('../config')

// firstname, lastname, password added to the schema for login and registration

const sessionSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String }
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })

sessionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Session = mongoose.model('Session', sessionSchema)


// conversation schema updated for group conversation, The token of users would be added to a list of tokens
const conversationSchema = new mongoose.Schema({
  title: { type: String },
  tokenList: []
 
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })

conversationSchema.virtual('messages', {
  ref: 'Message', // The model to use
  localField: '_id', // Find messages where `localField`
  foreignField: 'conversation', // is equal to `foreignField`
  count: true // And only get the number of docs
});

conversationSchema.methods.toJSON = function () {
  const cObj = this.toObject()
  cObj.id = cObj._id.toString()
  delete cObj._id
  delete cObj.__v
  return cObj
}

const Conversation = mongoose.model('Conversation', conversationSchema)


// message schema updated
// reaction, creatorId, conversationId added and updated.
const messageSchema = new mongoose.Schema({
  text: String,
  conversationId: { type: String },
  creatorId: { type: String },
  reaction: {type: Boolean},
  timestamp: { type: Date, default: Date.now }
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }

    //creator: {type: mongoose.Types.ObjectId, ref: 'Session'},
    //conversation: {type: mongoose.Types.ObjectId, ref: 'Conversation'}
  })

messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()

    if (document.creator) {
      returnedObject.creator = document.creator.username
    }

    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Message = mongoose.model('Message', messageSchema)

const initDB = async () => {
  await mongoose
    .connect(config.mongoDBUrl)
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
    })
}

module.exports = { Session, Conversation, Message, initDB }
