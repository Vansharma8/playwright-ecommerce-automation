exports.ProductDetailPage = class ProductDetailPage{

    constructor(page){
        this.page = page;
        this.quantity_input = page.locator('#quantity');
        this.add_to_cart_button = page.locator('.cart');
        this.product_name = page.locator('.product-information h2');
        this.product_category = page.locator('.product-information p').filter({hasText: 'Category:'});
        this.product_price = page.locator('.product-information span span');
        this.product_availability = page.locator('.product-information p').filter({hasText: 'Availability:'});
        this.product_condition = page.locator('.product-information p').filter({hasText: 'Condition:'});
        this.product_brand = page.locator('.product-information p').filter({hasText: 'Brand:'});
    }

    async setQuantity(quantity){
        await this.quantity_input.waitFor({ state: 'visible' });
        await this.quantity_input.fill(quantity.toString());
    }

    async addToCart(){
        await this.add_to_cart_button.click();
    }
}