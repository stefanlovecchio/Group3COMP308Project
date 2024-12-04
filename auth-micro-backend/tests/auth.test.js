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
                signup(username: "unitTestUser", email: "unitTest@email.com")
            }
        `;

        const response = await request(app)
        .post('/graphql')
        .send({ query });
    
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
    });
});
        