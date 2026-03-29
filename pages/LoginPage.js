exports.LoginPage = class LoginPage {

    constructor(page){
        this.page = page;
        this.login_nav_link = page.locator('a[href="/login"]');
        this.username_textBox = page.locator('[data-qa="login-email"]');
        this.password_textBox = page.locator('[data-qa="login-password"]');
        this.login_button = page.locator('[data-qa="login-button"]');
        this.login_error_message = page.getByText('Your email or password is incorrect!');
        this.login_sucess = page.getByText('Logged in as John Doe');
    }

    async gotoLoginPage() {
        await this.page.goto('https://automationexercise.com/');
        await this.login_nav_link.click();
    }

    async login(username, password) {
        await this.username_textBox.fill(username);
        await this.password_textBox.fill(password);
        await this.login_button.click();
    }

    errormessage(){
        return this.login_error_message;
    }

    successmessage(){
        return this.login_sucess;
    }
}