### Description of the chat application

I have created a chat application following the requirements however, I made my own interpretations for making it a Real life application. The chat service consists of a landing page which asks the user to register first, The user will put his/her username, password, First name, last Name. Then the user would be able to login from a login page. 

After login, the user would be provided with a conversation page where the user would be able to Create conversation, update profile information. The user would be able to see the list of conversation title on the left side of the page where all the conversation title would be listed, Under each conversation title there will be messages of the user and the recipients. The user is provided with a group conversation option as well. 

The messages are clickable for the users to react and delete specific messages of the users. The user would be able to logout from the system and go back to the login page. 

# Core react concepts used: 

 Hooks: useEffect, useState, useRef, useNavigate, Custom componens etc.  

# Folder/File structure: 

1. There are three components created inside the [Components Folder](src/Components). (Modal.js, MessageModal.js, ProfileModal.js.)

2. Under [Pages Folder](src/Pages) there are 4 js files, which are used to render our application. ( Conversations.js, Landing.js, Login.js, Services.js)

3. A description of each file given inside the code components. Please check for further details of what each script is doing. 

#### Functionalities created 

1. Registering users : (If not already in the database, show message if the user already exists in the system)

2. login users : (login using username and password. After succesful login, navigates to the conversation page. Used local storage token for login )

3. Conversation view will show the list of titles created by the user.

4. Upon clicking the title they would be able to see the messages on the chat box.

5. Users can delete their own messages.

6. Users can Navigate back to the list of conversations. 

7. Users can create conversations : ( after conversation is created the list of coversation title gets updated)

8. Users can update profile information: ( users can update the firsname, lastname and password. username is not updatable as it is unique) 

9. Users can do group conversations. 

10. Users can react to messages giving thumbs up (like) or thumbs down (dislike). 

11. Cross device use of the users. Users can login from a another device with a password 

12. Users can logout of the application. 

### Design implementations 

The front end design was inspired by the smash magazine article [https://www.smashingmagazine.com/2022/06/build-group-chat-app-vanillajs-twilio-nodejs/]. I have used the idea of their design for my UI however, 
the functionalities are different.

The design consists a register page, a login page and chat user interface having a list of conversation titles, a chat box with a title of the conversation clicked in the middle of the page, a create conversation, 
user profile option on the top right corner and a logout button. Modals ( dialogue box) are created for creating conversations, updating profile and for clicking a specific message. The user would be able to see the like, dislike and delete icon in the dialogue box. 

#### Instructions for using the Chat Application 

1. The user will see a registration form at first, asking their username, password, firstname and last name. A new user is required to do that. If a user exists in the database it will give the user an alert. 

2. If a user is already registered or is an existing user they can directly login from clicking on login under the register button. 

3. On the login page there is a login form created, the user is required to put his/her username and password. If the required information is correct, they will be navigated to the conversation page otherwise the user will see an alert message that they are not registered. 

4. After successfully logging into the application the user would see on the left hand side a column. On top of the column, 
there will be a heading called Conversations. At first it would show no conversation title in that list of converations as a new user but for an existing user,
it will show the titles of the conversation that they create. 

5. To create a conversation title the user needs to insert a valid participant/recipients name and conversation title. A create conversation modal is created for the user on the top right side. 

After clicking, a dialogue box will pop up blurring the background. The user can create the conversation title  and the list of conversations will be updated with the title. 

Also after clicking on the tilte, title name will be shown on the top.

6. There is another modal called update profile which can be clicked. It is similar to the create conversation modal however, user just updates their information inside that box. 

7. To send a message, the user needs to click on the conversation title. After clicking the conversation title, the user can use the chat box to type messages and after clicking send, the messages 
will be shown on the chat box having the username on the right side of the message. The messages get updated instantly.

8. The user can have multiple participants under one conversation title allowing the user to create a group conversation. As the backend has list of conversationId which allows users having that id 
to have access to each others messages. 

9. The users can click on the message. After clicking a specific message the user would be able like, dislike or delete a message. The delete operation will be given for ones individual message. Otherwise,
everyone can delete everyones messages.

10. Users can logout by clicking on the logout button on top right corner of the page. 

#### Check [ApplicationScreenshot folder](ApplicationScreenshot)

#### Backend Server

As I have changed the back-end server to my needs, I have changed [Server Model Folder](server/src/models/index.js). I have changed [Server Route](server/src/routes.js). I have also changed the following folders [Server Controller Folder](server/src/controllers/auth.js), [Server Controller Folder](server/src/controllers/conversations.js), [Server Folder](server/src/controllers/messages.js).

1. Message schema, conversation schema, session schema have been updated. I am using local storage token for authentication which is unique. check the menioned source folder for further details on the schemas under the models folder. 

2. Routes have been changed for get, post, update and delete operations. 

3. Controllers have been updated to give respons from the back-end. 


### Bugs need to be fixed: 
After the user clicks on the like or dislike button, the page needs to be refreshed to see the result. there's a bug with my useeffect. Same thing happens with the delete operation. However, everything updates on real time when re-rendering. 

### Deployment Issue:

Production build was not successful therefore could not deploy the app on the internet. 
## Configuration

Copy the file `.env.dist` to `.env` and edit the file with your own
settings - in particular your MongoDB settings if you are doing server
side development.  Note that these settings are only relevant to the
server implementation, not the front-end.

## Frontend Project start up instructions

The `src` folder contains a template front-end React project to get you
started.

To install React and all the required packages, run:

```bash
npm install
```

To run the front-end development server:

```bash
npm run start
```

This will run the server on port 3000.

You can run the front-end tests as usual with:

```bash
npm run test
```

Which will run any tests you have added to the front-end project under `src`.  Currently it
runs one dummy test.



