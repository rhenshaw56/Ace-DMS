/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const config = require('../../../nightwatch.conf');

module.exports = {
  'Ace-DMS': function (browser) {
    browser
      .url('http://localhost:5600')
      .waitForElementVisible('body')
      .click('#email-login')
      .assert.urlEquals('http://localhost:5600/login')
      .assert.title('Ace-DMS')
      .saveScreenshot('ace-dms-login.png')
      .end();
  },

  'Login Users': function (browser) {
    browser
      .url('http://localhost:5600')
      .waitForElementVisible('body')
      .click('#email-login')
      .assert.urlEquals('http://localhost:5600/login')
      .setValue('input[type=email]', 'user2@testMail.com')
      .setValue('input[type=password]', 'user2 password')
      .click('button[type="submit"]')
      .pause(5000)
      .waitForElementVisible('i')
      .assert.urlEquals('http://localhost:5600/')
      .end();
  }
};
