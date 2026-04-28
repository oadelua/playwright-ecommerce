export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginEmail = page.getByTestId('login-email');
    this.loginPassword = page.getByTestId('login-password');
    this.loginButton = page.getByTestId('login-button');
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.errorMessage = page.getByText('Your email or password is incorrect!');
  }

  async navigate() {
     await this.page.goto('/login');
  }

  async login(email, password) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }
}