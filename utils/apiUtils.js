const BASE_URL = 'https://automationexercise.com';

export async function createUser(request, email, password) {
  const response = await request.post(`${BASE_URL}/api/createAccount`, {
    form: {
      name: 'Cyber Guru',
      email: email,
      password: password,
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
  return body;
}

export async function deleteUser(request, email, password) {
  const response = await request.delete(`${BASE_URL}/api/deleteAccount`, {
    form: {
      email: email,
      password: password
    }
  });

  const body = await response.json();
  return body;
}