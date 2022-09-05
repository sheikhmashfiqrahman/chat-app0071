const dotenv = require('dotenv')

if (process.env.NODE_ENV != 'production') {
    dotenv.config();
}
// added strings because cannot identify env file
//const corsClientDomain =  process.env.CORS_CLIENT_DOMAIN
const corsClientDomain = "http://localhost:3000"
//const mongoDBUrl = process.env.MONGODB_URL
const mongoDBUrl = "mongodb+srv://Sheikh:hello@cluster0.ov8d2g4.mongodb.net/?retryWrites=true&w=majority";
//const sessionSecret =  process.env.SESSION_DB_SECRET || 'notVerySecretSecret'
const sessionSecret = "reallysecretsecret" || "notVerySecretSecret"

const port = process.env.PORT || '8000'

module.exports = { corsClientDomain, sessionSecret, port, mongoDBUrl }