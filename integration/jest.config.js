module.exports = {
  setupFilesAfterEnv: [
    "../src/setupTests.js"
  ],
  preset: 'jest-puppeteer',
  testRegex: './*\\.(spec)\\.js$',
}