describe('', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:5000');
  })

  it('should display title', async () => {
    await expect(page).toMatchElement(
      'h1',
      { text: 'Reactify' }
    );
  })
})