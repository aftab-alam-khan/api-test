const request = require('supertest')
const app = require('../app')



// test('login', () => {
//     await request(app)
//         .post('/organizations')
//     .send({
//         "name": "Juanito",
//         "description": "Best Juanito",
//         "url": "www.juanito.com",
//         "code": "222",
//         "type": "store2"
//     })
//         .set('Accept', 'application/json')
//     .expect()
    
// });


describe('Organization API', async() => {
    it('should create a new post', async () => {
        const res = await request(app)
            .get('/')
        .expect(res.statusCode).toEqual(200)
        .expect(res.text).toEqual("Organization API's")
        .done();
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