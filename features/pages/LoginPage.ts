import { $, browser } from '@wdio/globals';

class LoginPage {
    // Selectors
    get usernameInput() { return $('[data-testid="username-input"]') }
    get passwordInput() { return $('[data-testid="password-input"]') }
    get loginButton() { return $('[data-testid="login-button"]') }
    get errorMessage() { return $('.text-red-500') }

    // Actions
    async open() {
        await browser.url('/');
    }

    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.getText();
    }
}

export const loginPage = new LoginPage();