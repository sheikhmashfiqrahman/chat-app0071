const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/app')
const auth = require('../src/controllers/auth')
const models = require('../src/models')


const api = supertest(app)

describe('auth', () => {

    beforeEach(async () => {
        await models.Session.deleteMany({username: 'bobalooba'})
    })

    test('post to register makes a token', async () => {
        await api.post('/auth/register')
            .send({username: 'bobalooba'})
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect((response) => {
                expect(response.body.status).toBe('success')
                expect(response.body.username).toBe('bobalooba')
                expect(response.body.token).not.toBeNull()
            }) 
    })

    test('get user details', async () => {

        let token 

        await api.post('/auth/register')
            .send({username: 'bobalooba'})
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect((response) => {
                expect(response.body.status).toBe('success')
                expect(response.body.username).toBe('bobalooba')
                token = response.body.token
            }) 

        await api.get('/auth/')
            .set('Authorization', `Basic ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect((response) => {
                expect(response.body.status).toBe('success')
                expect(response.body.username).toBe('bobalooba')
            }) 
    })

    test('get user details - no auth', async () => {
 

        await api.get('/auth/') 
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect((response) => {
                expect(response.body.status).toBe('unregistered') 
            }) 
    })

    test('get user details - bad token', async () => {

        let token = "not a good token"

        await api.get('/auth/')
            .set('Authorization', `Basic ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect((response) => {
                expect(response.body.status).toBe('unregistered')
            }) 
    })


    test('second registration give an error status', async () => {
        await api.post('/auth/register')
            .send({username: 'bobalooba'})
            .expect(200)
            .expect((response) => {
                expect(response.body.status).toBe('success')
            }) 

        await api.post('/auth/register')
            .send({username: 'bobalooba'})
            .expect(200)
            .expect({status: 'username taken'})
    })

    afterAll(() => {
        mongoose.connection.close()
    })

})