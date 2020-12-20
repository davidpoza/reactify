describe('login form', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:5000');
  })

  it('should display title', async () => {
    await expect(page).toMatchElement(
      'h1',
      { text: 'Reactify' }
    );
  })

  it('do not login only if user and password is correct', async () => {
    await expect(page.url()).toBe('http://localhost:5000/login');

    await page.focus('#email');
    await page.keyboard.type('angel@gmail.com');
    await page.keyboard.press("Tab", { delay: 100 });
    await page.focus('#password');
    await page.keyboard.type('incorrect');
    await page.keyboard.press("Enter", { delay: 100 });

    // wait for request to server
    await page.waitForNavigation({
      waitUntil: 'networkidle0',
    });

    await expect(page.url()).toBe('http://localhost:5000/login');
  })

  // it('do login if user and password is correct', async () => {
  //   await expect(page.url()).toBe('http://localhost:5000/login');

  //   await page.focus('#email');
  //   await page.keyboard.type('angel@gmail.com');
  //   await page.keyboard.press("Tab", { delay: 100 });
  //   await page.focus('#password');
  //   await page.keyboard.type('demoReactify2020');
  //   await page.keyboard.press("Enter", { delay: 100 });

  //   // wait for request to server
  //   await page.waitForNavigation({
  //     waitUntil: 'networkidle0',
  //   });
  //   await page.evaluate(() => {
  //     localStorage.setItem("redux_store", "");
  //   });
  //   await expect(page.url()).toBe('http://localhost:5000/');
  // })


})