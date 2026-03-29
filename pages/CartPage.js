exports.CartPage = class CartPage {

    constructor(page){
        this.page = page;
        this.cart_checkout = page.locator('.check_out');
        this.checkout_heading = page.locator('.heading h2');
        this.address_details = page.locator('.address item .box');
        this.total_amount = page.getByText('Total Amount');
        this.place_order = page.locator('a[href="/payment"]');
    }

    getCartProductName(productId){
        return this.page.locator(`a[href="/product_details/${productId}"]`);
    }

   getCartProductPrice(productName){
    return this.page.locator('tr')
        .filter({hasText: productName})
        .locator('.cart_price p');
    }

    getCartProductQuantity(productName){
    return this.page.locator('tr')
        .filter({hasText: productName})
        .locator('.cart_quantity button');
    }

   getCartProductDelete(productName){
    return this.page.locator('tr')
        .filter({hasText: productName})
        .locator('.cart_quantity_delete');
    }

    getGrandTotal(){
        return this.page.locator('.cart_total_price').last();
    }

    //Actions
    async proceedToCheckout(){
        await this.cart_checkout.click();
    }
    async productDelete(productName){
    await this.getCartProductDelete(productName).click();
}
    async placeOrder(){
        await this.place_order.click();
    }
};