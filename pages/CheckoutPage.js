exports.CheckoutPage = class CheckoutPage {

    constructor(page){
        this.page = page;
        this.heading = page.locator('h2.heading');
        this.cardname_input = page.locator('[data-qa="name-on-card"]');
        this.cardnumber_input = page.locator('[data-qa="card-number"]');
        this.cvc_input = page.locator('[data-qa="cvc"]');
        this.exp_month_input = page.locator('[data-qa="expiry-month"]');
        this.exp_year_input = page.locator('[data-qa="expiry-year"]');
        this.pay_button = page.locator('[data-qa="pay-button"]');
        this.order_placed_heading = page.locator('[data-qa="order-placed"]');
        this.success_message = page.getByText('Congratulations! Your order has been confirmed!');
        this.download_invoice = page.locator('a[href*="download_invoice"]');
        this.continue_button = page.locator('[data-qa="continue-button"]');
    }

    async enterCardDetails(cardName, cardNumber, cvc, expMonth, expYear){
        await this.cardname_input.fill(cardName);
        await this.cardnumber_input.fill(cardNumber);
        await this.cvc_input.fill(cvc);
        await this.exp_month_input.fill(expMonth);
        await this.exp_year_input.fill(expYear);
    }
    async clickPayButton(){
        await this.pay_button.click();
    }

    async downloadInvoice(){
    const downloadPromise = this.page.waitForEvent('download');
    await this.download_invoice.click();
    const download = await downloadPromise;
    return download;
}
    async clickContinueButton(){
        await this.continue_button.click();
    }
}