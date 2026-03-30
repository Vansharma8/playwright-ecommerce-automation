import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CartPage } from '../../pages/CartPage';
import { CommonPage } from '../../pages/CommonPage';

test.describe("Cart Tests", () => {
    let Login;
    let Product;
    let ProductDetail;
    let Cart;
    let Common;

test.beforeEach(async ({ page }) => {
    Login = new LoginPage(page);
    Product = new ProductPage(page);
    ProductDetail = new ProductDetailPage(page);
    Cart = new CartPage(page);
    Common = new CommonPage(page);

    await Login.gotoLoginPage();
    await Login.login('JohnNew@gmail.com', 'John@100');
});

test('Verify Cart Functionality @smoke @cart', async ({ page }) => {

    // add product 1
    await Product.gotoProductsPage();
    await Product.viewProductDetails(30);
    await ProductDetail.setQuantity(2);
    await ProductDetail.addToCart();
    await Common.continueShopping();

    // add product 2
    await Product.gotoProductsPage();
    await Product.viewProductDetails(1);
    await ProductDetail.setQuantity(3);
    await ProductDetail.addToCart();
    await Common.viewCart();

    await expect(Cart.getCartProductName(30)).toContainText('Polo T-Shirt');
    await expect(Cart.getCartProductPrice('Premium Polo T-Shirts')).toBeVisible();
    await expect(Cart.getCartProductQuantity('Premium Polo T-Shirts')).toBeVisible();

    await expect(Cart.getCartProductDelete('Blue Top')).toBeVisible();
    await Cart.productDelete('Blue Top');
    await expect(Cart.getCartProductName(1)).not.toBeVisible();

    await expect(Cart.getGrandTotal()).toBeVisible();
    await Cart.proceedToCheckout();
    await Cart.placeOrder();

});
});