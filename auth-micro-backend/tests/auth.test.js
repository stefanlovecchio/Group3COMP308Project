const request = require('supertest');
const app = require('../server');

describe('Auth Mutation Tests', () => {
    test('signup mutation- success', async () => {
        const query = `
            mutation {
                signup(username: "unitTestUser", email: "unitTest@email.com", password: "pass")
            }
        `;

        const response = await request(app)
        .post('/graphql')
        .send({ query });
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data.signup');
        expect(response.body.data.signup).toBe("User registered successfully!");
    });

    test('signup mutation - missing fields', async () => {
        const query = `
            mutation {
                signup(username: "unitTestUserFail", email: "unitTest@fail.com")
            }
        `;
        const response = await request(app)
        .post('/graphql')
        .send({ query });
    
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toMatch(/Signup failed/);
        expect(response.body).toHaveProperty('errors');
    });

    test('login mutation - success', async () => {
        const query = `
            mutation {
                login(email: "slovecch@my.centennailcollege.ca", password: "pass")
            }
        `;
        const response = await request(app)
        .post('/graphql')
        .send({ query });
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data.login');
    });
});
        