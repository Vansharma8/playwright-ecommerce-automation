import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { CommonPage } from '../../pages/CommonPage';

test.describe("Product Page Tests", () => {
    let Login;
    let Product;
    let Common;

    test.beforeEach(async({page}) => {
        Login = new LoginPage(page);
        Product = new ProductPage(page);
        Common = new CommonPage(page);
        await Login.gotoLoginPage();
        await Login.login('JohnNew@gmail.com', 'John@100');
        await Product.gotoProductsPage();
    });

    test('Verifying Products Page Loads @smoke @products', async({page}) => {

        await expect(Product.all_products_heading).toBeVisible();
        await expect(Product.categoryHeading).toBeVisible();
        await expect(Product.brandHeading).toBeVisible();
    });

    test('Verifying Product Search and Details @smoke @products', async({page}) => {

        await Product.searchProduct('Polo');
        await expect(Product.searched_products_heading).toBeVisible();
        await expect(Product.getProductName('Polo')).toBeVisible();
        await expect(Product.getProductPrice('Polo')).toHaveText('Rs. 1500');
    });

    test('Verifying Add to Cart and Product Filtering @products', async({page}) => {
        await Product.searchProduct('Polo');
        await Product.addProductToCart('Polo');
        await expect(Common.modal_title).toHaveText('Added!');
        await expect(Common.modal_body).toContainText('Your product has been added to cart.');
        await Common.continueShopping();
        await Product.viewProductDetails(30);
    }); 

        test('Verifying Product Filtering by Category, SubCategory, and Brand @products', async({page}) => {
        await Product.filterByCategory('Men');
        await Product.filterBySubCategory(3);
        await Product.filterByBrand('H&M');
    });
});