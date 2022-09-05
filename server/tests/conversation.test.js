const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/app')
const auth = require('../src/controllers/auth')
const models = require('../src/models')

const api = supertest.agent(app)

describe('api', () => {

    beforeEach(async () => {
        await models.Session.deleteMany({username: 'bobalooba'})
    })

    test('make a  conversation', async () => {

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
            .expect((response) => {
                const val = response.body
                if (val.status !== 'success') throw new Error(`expected status=success in response, got ${val.status}`)
            })            
    })

    test('make a conversation - not authorised', async () => {

        await api.post('/api/conversations')
            .send({title: "A test conversation"})
            .expect(401)
    })

    test('get list of conversations', async () => {

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

        await api.get('/api/conversations')
            .set('Authorization', `Basic ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                const val = response.body
                if (!val.conversations) throw new Error('expected conversations in response')
            })         
    })

    test('get list of conversations - not authorised', async () => {

        await api.get('/api/conversations')
            .expect(401)
    })

    afterAll(() => {
        mongoose.connection.close()
    })

})