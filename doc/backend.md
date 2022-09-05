# Backend Server

The project provides a backend service to support real time chat.   Users can
register and create new conversation topics, post and join conversations.
Real time chat is supported via web sockets.

To star the backend, run:

```bash
npm run server
```

To run the backend tests:

```bash
npm run test-server
```

## Routes

All API calls except for `/auth/register` should have
an `Authorization` header set to `Basic xxxxxx`  where `xxxxx` is the token returned when
the user registers.  

`/auth/register`

* `POST` - register a new username
  * request: `{"username": "bob"}`
  * response: `{"status": "username taken"}` or `{"status": "success", "username": "bob", "token": "xxxxxx"}`
    * The returned `token` value is used for authorization is subsequent requests.

`/auth/`

* GET - get the user details
  * response: {"status": "unregistered"} or `{"status": "success", "username": "bob", "token": "xxxxxx"}`

`/api/conversations/`

* `POST` - create a new conversation
  * requires a valid session cookie
  * request: `{"title": "conversation title"}`
  * response: `{"status": "success" | "unauthorised", "id": "conversation id"}

* `GET` - list conversations
  * requires a valid session cookie
  * response: `{"conversations": [{"title": "xyzzy", "messages": 99, "id": "conversation id"}]}`

`/api/conversations/:id`

* `GET` - list recent messages
  * requires a valid session cookie
  * query parameter `N` - number of messages, default 10
  * response: `{"messages": [{"creator": "username", "text": "message text", "timestamp": "TTT", "id": "message id"}]}`

* `POST` - post a new message
  * requires a valid session cookie
  * request: `{"text": "message text"}`
  * response: `{"status": "success" | "unauthorised", "id": "message id"}`

`/api/conversations/:id/:messageid`

* `GET` - get message detail
  * requires a valid session cookie
  * response: `{"creator": "usernamae", "text": "message text", "timestamp": "TTT", "id": "message id"}`

* `DELETE` - delete message
  * requires a valid session cookie for the user who created the message
  * response: `{"status": "success" | "unauthorised"}

## Database

We use MongoDB to store data with the following tables.  To run the server yourself you
need to create a MongoDB database, for example with
[MongoDB Atlas](https://www.mongodb.com/atlas/database) as described in
[the textbook](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db).  
You will need to add the access URL to your `.env` file for the server to work.

### Sessions

```json
{
    "_id": "session id used as authorization token",
    "username": "unique username registered"
}
```

### Conversations

```json
{
    "_id": "conversation id",
    "title": "conversation title",
    "creator": "username of creator"
}
```

### Messages

```json
{
    "_id": "message id",
    "conversation": "conversation id",
    "user": "username of author",
    "timestamp": "ISO timestamp for message",
    "text": "markdown text of the message"
}
```
