import { test, expect } from '@playwright/test';

test.describe('Brands API Tests', () => {
    let baseUrl;

    test.beforeEach(() => {
        baseUrl = 'https://automationexercise.com/api';
    });

    test('API 3: Get All Brands List @api @brands', async ({ request }) => {
        const response = await request.get(`${baseUrl}/brandsList`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.brands.length).toBeGreaterThan(0);

        console.log(`Total brands: ${responseBody.brands.length}`);
        console.log('First brand:', responseBody.brands[0]);
    });

    test('API 4: PUT To All Brands List @api @brands', async ({ request }) => {
        const response = await request.put(`${baseUrl}/brandsList`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.responseCode).toBe(405); 
        console.log('Update Brands List response:', responseBody.message);
    });
});