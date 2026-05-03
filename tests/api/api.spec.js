import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com';

test.describe('API Tests', () => {

    test('GET all products returns 200 @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/productsList`);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(Array.isArray(body.products)).toBeTruthy(); // Verify products returns an array 
        expect(body.products.length).toBeGreaterThan(0); // Verify there is at least one product    
        expect(body.products[0]).toHaveProperty('id');
        expect(body.products[0]).toHaveProperty('name');
        expect(body.products[0]).toHaveProperty('price');
        console.log(body);
    });

});

test('POST login with valid credentials returns 200 @api', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/api/verifyLogin`, {
    form: {
      email: process.env.LOGIN_EMAIL,
      password: process.env.LOGIN_PASSWORD
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  
  expect(body.responseCode).toBe(200);
  expect(body.message).toBe('User exists!');
});

test('POST login with invalid credentials returns 404 @api', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/api/verifyLogin`, {
    form: {
      email: 'invalid@email.com',
      password: 'wrongpassword'
    }
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  
  expect(body.responseCode).toBe(404);
  expect(body.message).toBe('User not found!');
});


test('POST create user account returns 201 @api', async ({ request }) => {
  const email = `user${Date.now()}@maildrop.cc`;
  console.log(`Registered email: ${email}`);

  const response = await request.post(`${BASE_URL}/api/createAccount`, {
    form: {
      name: 'Cyber Guru',
      email: email,
      password: process.env.REGISTER_PASSWORD,
      title: 'Mr',
      birth_date: '1',
      birth_month: 'January',
      birth_year: '2000',
      firstname: 'Cyber',
      lastname: 'Guru',
      company: 'MCP Company',
      address1: '43 Cyber Street',
      address2: 'MCP Address 2',
      country: 'Ireland',
      zipcode: '002134',
      state: 'MCP State',
      city: 'MCP City',
      mobile_number: '15978652369'
    }
  });

  const body = await response.json();
  console.log(body);

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(201);
  expect(body.message).toBe('User created!');
});



test('DELETE user account returns 200 @api', async ({ request }) => {

  // Create new user
  const email = `user${Date.now()}@maildrop.cc`;
  
  await request.post(`${BASE_URL}/api/createAccount`, {
    form: {
      name: 'Cyber Guru',
      email: email,
      password: process.env.REGISTER_PASSWORD,
      title: 'Mr',
      birth_date: '1',
      birth_month: 'January',
      birth_year: '2000',
      firstname: 'Cyber',
      lastname: 'Guru',
      company: 'MCP Company',
      address1: '43 Cyber Street',
      address2: 'MCP Address 2',
      country: 'Ireland',
      zipcode: '002134',
      state: 'MCP State',
      city: 'MCP City',
      mobile_number: '15978652369'
    }
  });

  // Delete created user
  const response = await request.delete(`${BASE_URL}/api/deleteAccount`, {
    form: {
      email: email,
      password: process.env.REGISTER_PASSWORD
    }
  });

  const body = await response.json();
  console.log(body);
  
  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(200);
  expect(body.message).toBe('Account deleted!');
});