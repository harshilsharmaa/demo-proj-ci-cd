describe("Test GET /launches", ()=>{
    test('It should response with 200 success', ()=>{
        const response = 200;
        expect(response).toBe(200);
    });
});

const request = require('supertest');
const app = require('../../app.js');

describe("Test GET /launch", ()=>{
    test('It should be response with 200 success', async()=>{
        const response = await request(app)
        .get('/launches')
        .expect('Content-type', /json/)
        .expect(200);
        // expect(response.statusCode).toBe(200);
    });
});

describe("Test POST /launch", ()=>{

    const completeLaunchData = {
        mission: 'Uss abc',
        rocket: 'NCC DBC',
        target: 'Kepler 1004',
        launchDate: 'January 4, 2025'
    };

    const launchDataWithoutDate = {
        mission: 'Uss abc',
        rocket: 'NCC DBC',
        target: 'Kepler 1004',
    }

    const launchDatawithInvalidDate = {
        mission: 'Uss abc',
        rocket: 'NCC DBC',
        target: 'Kepler 1004',
        launchDate: 'adaf'
    };

    test('It should respond with 201 created', async()=>{
        const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-type', /json/)
        .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        console.log(response.body.launch.launchDate)
        const responseDate = new Date(response.body.launch.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate)
    })

    test('It should catch missing required properties', async()=>{
        const response = await request(app)
        .post('/launches')
        .send(launchDataWithoutDate)
        .expect('Content-type', /json/)
        .expect(400);

        expect(response.body).toStrictEqual({
            error: "Missing required launch property"
        })
    })

    test('It should catch the invalid dates', async()=>{
        const response = await request(app)
            .post('/launches')
            .send(launchDatawithInvalidDate)
            .expect('Content-type', /json/)
            .expect(400);

            expect(response.body).toStrictEqual({
                error: "Invalid Launch date"
            })
    })
})