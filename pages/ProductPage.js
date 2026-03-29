exports.ProductPage = class ProductPage{

    constructor(page){
        this.page = page;
        this.product_nav_link = page.locator('a[href="/products"]');
        this.search_box = page.locator('#search_product');
        this.search_button = page.locator('#submit_search');
        this.all_products_heading = page.getByText('All Products');
        this.searched_products_heading = page.getByText('Searched Products');
        this.categoryHeading = page.getByText("Category");
        this.brandHeading = page.getByText("Brands");
    }

    getProductName(name){
        return this.page.locator('.productinfo p').getByText(name);
    }

    getProductPrice(productName){
        return this.page.locator('.productinfo').filter({ hasText : productName }).locator('h2');
    }

    CartButton(productName){
        return this.page.locator('.productinfo').filter({hasText : productName}).locator('.add-to-cart');
    }

    viewProduct(productId){
        return this.page.locator(`a[href="/product_details/${productId}"]`);
    }

    selectCategory(categoryName){
        return this.page.locator(`a[href="#${categoryName}"]`);
    }

    selectSubCategory(CategoryId){
        return this.page.locator(`a[href="/category_products/${CategoryId}"]`);
    }

    selectBrand(brandName){
        return this.page.locator(`a[href="/brand_products/${brandName}"]`);
    }

    //Actions

     async gotoProductsPage(){
        await this.product_nav_link.click();
    }

    async searchProduct(productName){
        await this.search_box.fill(productName);
        await this.search_button.click();
    }

    async addProductToCart(productName){
        await this.CartButton(productName).click();
    }

    async viewProductDetails(productId){
        await this.viewProduct(productId).click();
    }

    async filterByCategory(categoryName){
        await this.selectCategory(categoryName).click();
    }

    async filterBySubCategory(CategoryId){
        await this.selectSubCategory(CategoryId).click();
    }

    async filterByBrand(brandName){
        await this.selectBrand(brandName).click();
    }

    async viewProductDetails(productId){
    await this.page.waitForLoadState('networkidle');
    await this.viewProduct(productId).click();
}

}