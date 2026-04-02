import { test, expect } from '@playwright/test';

test.describe('Login API Tests', () => {
    let baseUrl;

    test.beforeEach(() => {
        baseUrl = 'https://automationexercise.com/api';
    });

    test('API 7: Verify Login with valid credentials @api @auth', async ({ request }) => {
        const response = await request.post(`${baseUrl}/verifyLogin`, 
           {
            form:{
                email: 'JohnNew@gmail.com',
                password: 'John@100'
            }
        }
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        console.log('Login API Response:', responseBody);
    });

    test('API 8: Verify Login without email parameter @negative @auth', async ({ request }) => {
    const response = await request.post(`${baseUrl}/verifyLogin`, {
        form: {
            password: 'John@100'
        }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log('Missing Email Response:', responseBody);

    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toContain('Bad request, email or password parameter is missing');
});

    test('API 9: Verify Login with invalid credentials @negative @auth', async ({ request }) => {
        const response = await request.post(`${baseUrl}/verifyLogin`, 
           {
            form:{
                email: 'JohnAbc@gmail.com',
                password: 'John4566'
            }
        }
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(404);
        console.log('Login API Response:', responseBody);
    });

   test('API 10: DELETE To Verify Login @negative @auth', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/verifyLogin`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log('DELETE Invalid Method Response:', responseBody);

    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toContain('This request method is not supported');
});
});