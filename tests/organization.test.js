const request = require('supertest')
const app = require('../app')
describe('Organization API', () => {
    it('should create a new post', async (done) => {
        const res = await request(app)
            .get('/')
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual("Organization API's");
        done();
    })

    // it('should create a new post', async () => {
    //     const res = await request(app)
    //     .post('/')
    //     .send({
    //         userId: 1,
    //         title: 'test is cool',
    //     })
    //     expect(res.statusCode).toEqual(201)
    //     expect(res.body).toHaveProperty('post')
    // })
})