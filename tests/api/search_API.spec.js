import { test, expect } from '@playwright/test';

test.describe('Search API Tests', () => {
    let baseUrl;

    test.beforeEach(() => {
        baseUrl = 'https://automationexercise.com/api';
    });

    test('API 5: POST To Search Product @api @search', async ({ request }) => {
        const response = await request.post(`${baseUrl}/searchProduct`, 
           {
            form:{
                search_product: 'jeans'
            }
        }
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.products.length).toBeGreaterThan(0);

        console.log(`Total products retrieved: ${responseBody.products.length}`);
        console.log('First product details:', responseBody.products[0]);
    });

    test('API 6: POST To Search Product without search_product parameter @api @search', async ({ request }) => {
    const response = await request.post(`${baseUrl}/searchProduct`, {
        form: {}
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log('Missing Search Param Response:', responseBody);

    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toContain('Bad request');
});
});