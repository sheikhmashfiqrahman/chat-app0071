const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/app')
const models = require('../src/models')

const api = supertest.agent(app)

describe('api', () => {

    beforeEach(async () => {
        await models.Session.deleteMany({username: 'bobalooba'})
    })

    test('make a  message', async () => {

        let conversation
        let token

        await api.post('/auth/register')
            .send({username: 'bobalooba'})
            .expect(200)
            .expect((response) => {
                expect(response.body.status).toBe('success')
                expect(response.body.username).toBe('bobalooba')
                expect(response.body.token).not.toBeNull()
                token = response.body.token
            })

        await api.post('/api/conversations')
            .set('Authorization', `Basic ${token}`)
            .send({title: "A test conversation"})
            .expect(200)
            .then(response => {
                conversation = response.body
            })

        await api.post(`/api/conversations/${conversation.id}`)
            .set('Authorization', `Basic ${token}`)
            .send({text: "A test message"})
            .expect(200)
            .expect(response => {
                const val = response.body
                if (!val.status == 'success') throw new Error(`Expected status "success" but got ${val.status}`)
            })
    })

    /* 
    test('make a message - not authorised', async () => {

        await api.post('/api/conversations')
            .send({title: "A test message"})
            .expect(401)
    })
    */
   
    test('get list of messages', async () => {

        let conversation
        let token 

        await api.post('/auth/register')
            .send({username: 'bobalooba'})
            .expect(200)
            .expect((response) => {
                expect(response.body.status).toBe('success')
                expect(response.body.username).toBe('bobalooba')
                expect(response.body.token).not.toBeNull()
                token = response.body.token
            })

        await api.post('/api/conversations')
            .set('Authorization', `Basic ${token}`)
            .send({title: "A test conversation"})
            .expect(200)
            .then(response => {
                conversation = response.body
            })

        await api.post(`/api/conversations/${conversation.id}`)
            .set('Authorization', `Basic ${token}`)
            .send({text: "1 A test message"})
            .expect(200)

        await api.post(`/api/conversations/${conversation.id}`)
            .set('Authorization', `Basic ${token}`)
            .send({text: "2 Another test message"})
            .expect(200)

        await api.post(`/api/conversations/${conversation.id}`)
            .set('Authorization', `Basic ${token}`)
            .send({text: "3 and another"})
            .expect(200)
            
        await api.get(`/api/conversations/${conversation.id}`) 
            .set('Authorization', `Basic ${token}`)
            .expect(200)
            .expect(response => {
                const val = response.body 
                if (!val.messages) throw new Error('expected conversations in response')
            }) 
            
    })


   
    test('get a message', async () => {

        let conversation
        let message
        let token 

        await api.post('/auth/register')
            .send({username: 'bobalooba'})
            .expect(200)
            .expect((response) => {
                expect(response.body.status).toBe('success')
                expect(response.body.username).toBe('bobalooba')
                expect(response.body.token).not.toBeNull()
                token = response.body.token
            })

        await api.post('/api/conversations')
            .set('Authorization', `Basic ${token}`)
            .send({title: "A test conversation"})
            .expect(200)
            .then(response => {
                conversation = response.body
            })

        await api.post(`/api/conversations/${conversation.id}`)
            .set('Authorization', `Basic ${token}`)
            .send({text: "1 A test message"})
            .expect(200)
            .then(response => {
                message = response.body
            })

        await api.get(`/api/conversations/${conversation.id}/${message.id}`) 
            .set('Authorization', `Basic ${token}`)
            .expect(200)
            .expect(response => {
                const val = response.body 
                if (!val.text) throw new Error('expected text in response')
            }) 
            
    })


    /*
    test('get list of messages - not authorised', async () => {

        await api.get('/api/messages')
            .expect(401)
    })

    */

    test('delete a  message', async () => {

        let conversation
        let message
        let token 

        await api.post('/auth/register')
            .send({username: 'bobalooba'})
            .expect(200)
            .expect((response) => {
                expect(response.body.status).toBe('success')
                expect(response.body.username).toBe('bobalooba')
                expect(response.body.token).not.toBeNull()
                token = response.body.token
            })

        await api.post('/api/conversations')
            .set('Authorization', `Basic ${token}`)
            .send({title: "A test conversation"})
            .expect(200)
            .then(response => {
                conversation = response.body
            })

        await api.post(`/api/conversations/${conversation.id}`)
            .set('Authorization', `Basic ${token}`)
            .send({text: "A test message"})
            .expect(200)
            .expect(response => {
                message = response.body
                if (!message.status == 'success') throw new Error(`Expected status "success" but got ${message.status}`)
            })

        /* now try to delete it */
        await api.delete(`/api/conversations/${conversation.id}/${message.id}`)
            .set('Authorization', `Basic ${token}`)
            .expect(200)
            .expect({'status': 'success'})

    })

    afterAll(() => {
        mongoose.connection.close()
    })

})