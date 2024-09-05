import { test, expect } from 'playwright-test-coverage';

test('purchase with login', async ({ page }) => {
    await page.route('*/**/api/order/menu', async (route) => {
      const menuRes = [
        { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
        { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: menuRes });
    });
  
    await page.route('*/**/api/franchise', async (route) => {
      const franchiseRes = [
        {
          id: 2,
          name: 'LotaPizza',
          stores: [
            { id: 4, name: 'Lehi' },
            { id: 5, name: 'Springville' },
            { id: 6, name: 'American Fork' },
          ],
        },
        { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
        { id: 4, name: 'topSpot', stores: [] },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: franchiseRes });
    });
  
    await page.route('*/**/api/auth', async (route) => {
      const loginReq = { email: 'd@jwt.com', password: 'a' };
      const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
      expect(route.request().method()).toBe('PUT');
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    });
  
    await page.route('*/**/api/order', async (route) => {
      const orderReq = {
        items: [
          { menuId: 1, description: 'Veggie', price: 0.0038 },
          { menuId: 2, description: 'Pepperoni', price: 0.0042 },
        ],
        storeId: '4',
        franchiseId: 2,
      };
      const orderRes = {
        order: {
          items: [
            { menuId: 1, description: 'Veggie', price: 0.0038 },
            { menuId: 2, description: 'Pepperoni', price: 0.0042 },
          ],
          storeId: '4',
          franchiseId: 2,
          id: 23,
        },
        jwt: 'eyJpYXQ',
      };
      expect(route.request().method()).toBe('POST');
      expect(route.request().postDataJSON()).toMatchObject(orderReq);
      await route.fulfill({ json: orderRes });
    });
  
    await page.goto('http://localhost:5173/');
  
    // Go to order page
    await page.getByRole('button', { name: 'Order now' }).click();
  
    // Create order
    await expect(page.locator('h2')).toContainText('Awesome is a click away');
    await page.getByRole('combobox').selectOption('4');
    await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
    await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
    await expect(page.locator('form')).toContainText('Selected pizzas: 2');
    await page.getByRole('button', { name: 'Checkout' }).click();
  
    // Login
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
  
    // // Pay
    await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
    await expect(page.locator('tbody')).toContainText('Veggie');
    await expect(page.locator('tbody')).toContainText('Pepperoni');
    await expect(page.locator('tfoot')).toContainText('0.008 ₿');
    await page.getByRole('button', { name: 'Pay now' }).click();
  
    // Check balance
    await expect(page.getByText('0.008')).toBeVisible();
  });

  test('user registration', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
      const requestMethod = route.request().method();
      const postData = route.request().postDataJSON();
      let response = {};
  
      if (requestMethod === 'POST') {
        const registerReq = { name: 'John Doe', email: 'john@jwt.com', password: 'password123' };
        const registerRes = { user: { id: 5, name: 'John Doe', email: 'john@jwt.com', roles: [{ role: 'diner' }] }, token: 'ghijklm' };
        expect(postData).toMatchObject(registerReq);
        response = { json: registerRes };
      } else if (requestMethod === 'DELETE') {
        const deleteRes = { user: { id: 5, name: 'John Doe', email: 'john@jwt.com', roles: [{ role: 'diner' }] }, token: 'ghijklm' };
        response = { json: deleteRes };
      }
      await route.fulfill(response);
    });
  
    await page.goto('http://localhost:5173/register');
    await page.getByPlaceholder('Name').fill('John Doe');
    await page.getByPlaceholder('Email address').fill('john@jwt.com');
    await page.getByPlaceholder('Password').fill('password123');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByLabel('Global')).toContainText('JWT Pizza');
    
    await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
    await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByLabel('Global')).toContainText('JWT Pizza');
  });
  
  test('get user after login', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
      const loginReq = { email: 'd@jwt.com', password: 'a' };
      const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
      expect(route.request().method()).toBe('PUT');
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    });
  
    await page.goto('http://localhost:5173/login');
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
  
    await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
    await page.getByRole('link', { name: 'KC' }).click();
    await expect(page.getByRole('main')).toContainText('Kai Chen');
    await expect(page.getByRole('main')).toContainText('d@jwt.com');
    await expect(page.getByRole('main')).toContainText('diner');
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');
    await expect(page.getByRole('alert')).toContainText('If you are already a franchisee, pleaseloginusing your franchise account');
    await page.getByText('JWT Pizza', { exact: true }).click();
    await page.getByRole('link', { name: 'home' }).click();
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.getByRole('main')).toContainText('The secret sauce');
    await page.getByRole('link', { name: 'History' }).click();
    await expect(page.getByRole('heading')).toContainText('Mama Rucci, my my');
    await page.getByRole('contentinfo').getByRole('link', { name: 'Franchise' }).click();
    await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');
    
  });

  test('docs', async ({ page }) => {
    await page.goto('http://localhost:5173/docs');
    await expect(page.getByRole('main')).toContainText('JWT Pizza API');
    await page.goto('http://localhost:5173/close-franchise');
    await page.goto('http://localhost:5173/delivery');
  });

  
  test('admin login', async ({ page }) => {
    await page.route('*/**/api/franchise', async (route) => {
      if (route.request().method() == 'POST'){
        return
      }
      const expectedRequestMethod = 'GET';
      const response = [{ id: 1, name: 'pizzaPocket', stores: [{ id: 1, name: 'SLC', totalRevenue: 5  }], admins: [{ user: { id: 1, name: 'ADMIN Chen', email: 'admin@jwt.com', roles: [{ role: 'admin' }] }, token: 'admintoken' }] }];
  
      expect(route.request().method()).toBe(expectedRequestMethod);
      await route.fulfill({ json: response });
    });

    await page.route('*/**/api/auth', async (route) => {
      const loginReq = { email: 'admin@jwt.com', password: 'ad' };
      const loginRes = { user: { id: 1, name: 'ADMIN Chen', email: 'admin@jwt.com', roles: [{ role: 'admin' }] }, token: 'admintoken' };
      expect(route.request().method()).toBe('PUT');
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    });
  
    await page.goto('http://localhost:5173/login');
    await page.getByPlaceholder('Email address').fill('admin@jwt.com');
    await page.getByPlaceholder('Password').fill('ad');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByRole('heading')).toContainText('Mama Ricci\'s kitchen');
    await expect(page.locator('tbody')).toContainText('pizzaPocket');
    await expect(page.getByRole('main')).toContainText('Add Franchise');
    await page.getByRole('button', { name: 'Add Franchise' }).click();
    await expect(page.getByRole('heading')).toContainText('Create franchise');
    await page.getByPlaceholder('franchise name').click();
    await page.getByPlaceholder('franchise name').fill('newFranchise');
    await page.getByPlaceholder('franchise name').press('Tab');
    await page.getByPlaceholder('franchisee admin email').fill('franch@gmail.com');
    await page.getByRole('button', { name: 'Create' }).click();
  });