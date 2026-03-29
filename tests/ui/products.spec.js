import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';

test.describe("Product Page Tests", () => {
    let Login;
    let Product;

    test.beforeEach(async({page}) => {
        Login = new LoginPage(page);
        Product = new ProductPage(page);
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
        await expect(Product.cartModal_title).toHaveText('Added!');
        await expect(Product.cartModal_body).toContainText('Your product has been added to cart.');
        await Product.cartModal_close_button.click();
        await Product.viewProductDetails(30);
    }); 

        test('Verifying Product Filtering by Category, SubCategory, and Brand @products', async({page}) => {
        await Product.filterByCategory('Men');
        await Product.filterBySubCategory(3);
        await Product.filterByBrand('H&M');
    });
});