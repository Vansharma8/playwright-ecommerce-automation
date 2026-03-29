import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CommonPage } from '../../pages/CommonPage';

test.describe("Product Detail Page Tests", () => {
    let Login;
    let Product;
    let Common;
    let ProductDetail;

    test.beforeEach(async({page}) => {
        Login = new LoginPage(page);
        Common = new CommonPage(page);
        Product = new ProductPage(page);
        ProductDetail = new ProductDetailPage(page);
        await Login.gotoLoginPage();
        await Login.login('JohnNew@gmail.com', 'John@100');
        await Product.gotoProductsPage();
        await Product.viewProductDetails(30);
    });

    test('Verify Product Details @smoke @productdetails', async({page}) => {
        await expect(ProductDetail.product_name).toContainText('Polo T-Shirt');
        await expect(ProductDetail.product_category).toContainText('Category: Men');
        await expect(ProductDetail.product_price).toHaveText('Rs. 1500');
        await expect(ProductDetail.product_availability).toContainText('Availability: In Stock');
        await expect(ProductDetail.product_condition).toContainText('Condition: New');
        await expect(ProductDetail.product_brand).toContainText('Brand: Polo');

        await ProductDetail.setQuantity(5);
        await ProductDetail.addToCart();

        await expect(Common.modal_title).toHaveText('Added!');
        await Common.continueShopping();
    });
});