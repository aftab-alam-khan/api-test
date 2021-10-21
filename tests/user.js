const request = require('supertest')
const app = require('../app')

describe('User API', () => {

    it('Create a new user', async (done) => {
        const res = await request(app)
        .post('/users/login')
        .set('Accept', 'application/json')
        .send({
            email: "test@gmail.com",
            password: "1234567"
        })
        console.log(await res);
        expect(res.status).toEqual(201);
        done()
    })
})

// POST  http://localhost:4000/api/users/login
// Content-Type: application/json

