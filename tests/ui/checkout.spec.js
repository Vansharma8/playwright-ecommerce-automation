import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CartPage } from '../../pages/CartPage';
import { CommonPage } from '../../pages/CommonPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import path from 'path';

test.describe('Checkout Tests', () => {
    let Login, Product, ProductDetail, Cart, Checkout, Common;

    test.beforeEach(async ({ page }) => {
        Login = new LoginPage(page);
        Product = new ProductPage(page);
        ProductDetail = new ProductDetailPage(page);
        Cart = new CartPage(page);
        Checkout = new CheckoutPage(page);
        Common = new CommonPage(page);

        await Login.gotoLoginPage();
        await Login.login('JohnNew@gmail.com', 'John@100');
        await Product.gotoProductsPage();
        await Product.viewProductDetails(30);
        await ProductDetail.setQuantity(2);
        await ProductDetail.addToCart();
        await Common.viewCart();
        await Cart.proceedToCheckout();
        await Cart.placeOrder();
    });

    test('Verify Payment Page UI @smoke @checkout', async ({page}) => {
        await expect(Checkout.heading).toBeVisible();
        await expect(page.getByText('Name on Card')).toBeVisible();
        await expect(page.getByText('Card Number')).toBeVisible();
        await expect(page.getByText('CVC')).toBeVisible();
        await expect(page.getByText('Expiration')).toBeVisible();
    });

    test('Verify Successful Payment Flow @regression @checkout', async ({page}) => {
        await Checkout.enterCardDetails('JohnD','556833775', '552', '10', '2029');
        await Checkout.clickPayButton();

        await expect(Checkout.order_placed_heading).toBeVisible();
        await expect(Checkout.success_message).toBeVisible();
        await expect(Checkout.download_invoice).toBeVisible();
        await expect(Checkout.continue_button).toBeVisible();
    });

    test('Verify Invoice Download @regression @download', async ({page}) => {
        await Checkout.enterCardDetails( 'John D', '556833775', '552', '10', '2029');
        await Checkout.clickPayButton();
        await expect(Checkout.order_placed_heading).toBeVisible();
        const download = await Checkout.downloadInvoice();
        const filePath = path.join('downloads', download.suggestedFilename());
        await download.saveAs(filePath);
        expect(download.suggestedFilename()).toContain('invoice');

    });

});