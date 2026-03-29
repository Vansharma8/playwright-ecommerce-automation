exports.CommonPage = class CommonPage {
    constructor(page) {
        this.page = page;
        this.modal_title = page.locator('.modal-title');
        this.modal_body = page.locator('.modal-body');
        this.modal_continue_shopping = page.locator('.close-modal');
        this.modal_view_cart = page.locator('.modal-body a[href="/view_cart"]');
    }

    async continueShopping() {
        await this.modal_continue_shopping.click();
    }

    async viewCart() {
        await this.modal_view_cart.click();
    }
}