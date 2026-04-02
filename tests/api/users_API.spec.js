import { test, expect } from '@playwright/test';

test.describe('Users API Tests', () => {
    let baseUrl;
    let testEmail;
    let password = 'John@123';

    test.beforeEach(() => {
        baseUrl = 'https://automationexercise.com/api';
        testEmail = `johnapi${Date.now()}@gmail.com`; // Generate unique email for each test run
    });

    test('API 11: Create User Account @api @users', async ({ request }) => {
        const response = await request.post(`${baseUrl}/createAccount`, {
            form: {
                name: 'John API',
                email: testEmail,
                password: password,
                title: 'Mr',
                birth_date: '10',
                birth_month: 'May',
                birth_year: '1998',
                firstname: 'John',
                lastname: 'Doe',
                company: 'QA Labs',
                address1: 'Street 1',
                address2: 'Near Market',
                country: 'India',
                zipcode: '140001',
                state: 'Haryana',
                city: 'Gurugram',
                mobile_number: '9999999999'
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log('Create User Response:', responseBody);

        expect(responseBody.responseCode).toBe(201);
        expect(responseBody.message).toContain('User created!');
    });

     test('API 12: Delete Created User Account @api @users', async ({ request }) => {
        // Delete the account created in the previous test
        await request.post(`${baseUrl}/createAccount`, {
            form: {
                name: 'John API',
                email: testEmail,
                password,
                title: 'Mr',
                birth_date: '10',
                birth_month: 'May',
                birth_year: '1998',
                firstname: 'John',
                lastname: 'Doe',
                company: 'QA Labs',
                address1: 'Street 1',
                address2: 'Near Market',
                country: 'India',
                zipcode: '140001',
                state: 'Haryana',
                city: 'Gurugram',
                mobile_number: '9999999999'
            }
        });

        const deleteResponse = await request.delete(`${baseUrl}/deleteAccount`, {
            form: {
                email: testEmail,
                password
            }
        });

        const deleteBody = await deleteResponse.json();

        expect(deleteBody.responseCode).toBe(200);
        console.log('Delete User Response:', deleteBody);
    });

    test('API 13: Update Created User Account @api @users', async ({ request }) => {
    
    await request.post(`${baseUrl}/createAccount`, {
        form: {
            name: 'John API',
            email: testEmail,
            password,
            title: 'Mr',
            birth_date: '10',
            birth_month: 'May',
            birth_year: '1998',
            firstname: 'John',
            lastname: 'Doe',
            company: 'QA Labs',
            address1: 'Street 1',
            address2: 'Near Market',
            country: 'India',
            zipcode: '140001',
            state: 'Punjab',
            city: 'Karimpur',
            mobile_number: '9999999999'
        }
    });

    const updateResponse = await request.put(`${baseUrl}/updateAccount`, {
        form: {
            name: 'Updated John',
            email: testEmail,
            password,
            firstname: 'Updated',
            lastname: 'Doe',
            address1: 'Updated Street',
            country: 'India',
            zipcode: '140001',
            state: 'Punjab',
            city: 'Karimpur',
            mobile_number: '8888888888'
        }
    });

    const updateBody = await updateResponse.json();

    expect(updateBody.responseCode).toBe(200);
    console.log('Update User Response:', updateBody);
    expect(updateBody.message).toContain('User updated!');
});

test('API 14: Get User Account Detail by Email @api @users', async ({ request }) => {
    await request.post(`${baseUrl}/createAccount`, {
        form: {
            name: 'John API',
            email: testEmail,
            password,
            title: 'Mr',
            birth_date: '10',
            birth_month: 'May',
            birth_year: '1998',
            firstname: 'John',
            lastname: 'Doe',
            company: 'QA Labs',
            address1: 'Street 1',
            address2: 'Near Market',
            country: 'India',
            zipcode: '140001',
            state: 'Punjab',
            city: 'Karimpur',
            mobile_number: '9999999999'
        }
    });

    //fetch by email
    const response = await request.get(`${baseUrl}/getUserDetailByEmail`, {
        params: {
            email: testEmail
        }
    });

    const responseBody = await response.json();

    console.log('Fetched User:', responseBody.user.name);

    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.user.email).toBe(testEmail);
});

});