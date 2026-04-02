import { test, expect } from '@playwright/test';

test.describe('Products API Tests', () => {
    let baseUrl;

    test.beforeEach(() => {
        baseUrl = 'https://automationexercise.com/api';
    });

    test('API 1: Get All Products List @api @products', async ({ request }) => {
        const response = await request.get(`${baseUrl}/productsList`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.products.length).toBeGreaterThan(0);

        console.log(`Total products retrieved: ${responseBody.products.length}`);
        console.log('First product details:', responseBody.products[0]);
    });

    test('API 2: POST To All Products List @api @products', async ({ request }) => {
        const response = await request.post(`${baseUrl}/productsList`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(405);
        console.log('Response message:', responseBody.message);
    });
});