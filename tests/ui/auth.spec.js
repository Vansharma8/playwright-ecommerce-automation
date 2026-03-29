import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Authentication Tests', () => {

    let Login;

    test.beforeEach(async ({ page }) => {
        Login = new LoginPage(page);
        await Login.gotoLoginPage();
    });

    test('Valid Login Test @positive @auth', async ({ page }) => {
        await Login.login('JohnNew@gmail.com', 'John@100');
        await expect(Login.successmessage()).toBeVisible();
    });

    test('Invalid Login Test @negative @auth', async ({ page }) => {
        await Login.login('abc@gmail.com', 'abc@123');
        await expect(Login.errormessage()).toBeVisible();
    });

});

