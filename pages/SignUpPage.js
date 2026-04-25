export class SignUpPage {

    //Intoduce all the locators and assign to a variable name using the constructor method
    constructor(page) {
        this.page = page;
        this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
        this.signupName = page.getByTestId('signup-name');
        this.signupEmail = page.getByTestId('signup-email');
        this.signupButton = page.getByTestId('signup-button');
        this.userTitle = page.locator('#id_gender1');
        this.password = page.getByTestId('password');
        this.dayOfBirth = page.getByTestId('days');
        this.monthOfBirth = page.getByTestId('months');
        this.yearOfBirth = page.getByTestId('years');
        this.newsletterCheckbox = page.locator('#newsletter');
        this.specialOffersCheckbox = page.locator('#optin');
        this.firstName = page.getByTestId('first_name');
        this.lastname = page.getByTestId('last_name');
        this.company = page.getByTestId('company');
        this.address1 = page.getByTestId('address');
        this.address2 = page.getByTestId('address2');
        this.country = page.getByTestId('country');
        this.state = page.getByTestId('state');
        this.city = page.getByTestId('city');
        this.zipcode = page.getByTestId('zipcode');
        this.mobileNumber = page.getByTestId('mobile_number');
        this.registerButton = page.getByTestId('create-account');

    }

    //Action required before performing any action on the register page

    async navigate() {
        await this.signupLoginLink.click();
    }


    // Actions performed on the register page
    async signUp(name, email, password, day, month, year, firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupButton.click();
        await this.userTitle.click();
        await this.password.fill(password);
        await this.dayOfBirth.selectOption(day);
        await this.monthOfBirth.selectOption(month);
        await this.yearOfBirth.selectOption(year);
        await this.newsletterCheckbox.check();
        await this.specialOffersCheckbox.check();
        await this.firstName.fill(firstName);
        await this.lastname.fill(lastName);
        await this.company.fill(company);
        await this.address1.fill(address1);
        await this.address2.fill(address2);
        await this.country.selectOption(country);
        await this.state.fill(state);
        await this.city.fill(city);
        await this.zipcode.fill(zipcode);
        await this.mobileNumber.fill(mobileNumber);
        await this.registerButton.click();

    }
}