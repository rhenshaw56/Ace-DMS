/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const faker = require('faker');

const config = require('../../../nightwatch.conf');

module.exports = {
  'Create Document': function (browser) {
    browser
      .url('http://localhost:5600')
      .waitForElementVisible('body')
      .click('#email-login')
      .assert.urlEquals('http://localhost:5600/login')
      .setValue('input[type=email]', 'rowland.henshaw@andela.com')
      .setValue('input[type=password]', 'resonate')
      .click('button[type="submit"]')
      .pause(2500)
      .waitForElementVisible('body')
      .assert.urlEquals('http://localhost:5600/')
      .waitForElementVisible('body')
      .pause(3000)
      .click('#create-doc')
      .pause(2500)
      .assert.urlEquals('http://localhost:5600/editor')
      .setValue('input#doc-title', 'The Life of Pablo')
      .setValue('select#access', 'public')
      .execute(`tinyMCE.activeEditor.setContent('${faker.lorem.words()}')`)
      .pause(3000)
      .click('button[id="save"]')
      .end();
  },
  'Edit Documents': function (browser) {
    browser
      .url('http://localhost:5600')
      .waitForElementVisible('body')
      .click('#email-login')
      .assert.urlEquals('http://localhost:5600/login')
      .setValue('input[type=email]', 'rowland.henshaw@andela.com')
      .setValue('input[type=password]', 'resonate')
      .click('button[type="submit"]')
      .pause(2500)
      .waitForElementVisible('body')
      .pause(2500)
      .assert.urlEquals('http://localhost:5600/')
      .pause(3000)
      .click('#edit-doc')
      .pause(3000)
     .assert.urlEquals('http://localhost:5600/editor')
     .execute(`tinyMCE.activeEditor.setContent('${faker.lorem.words()}')`)
     .pause(3000)
     .click('button[id="save"]')
     .expect.element('div.toast-message')
     .text.to.contain('Document updated succesfully');
  },
  'Delete Documents': function (browser) {
    browser
      .url('http://localhost:5600')
      .assert.urlEquals('http://localhost:5600/')
      .waitForElementVisible('body')
      .pause(10000)
      .assert.title('Ace-DMS')
     .click('#delete-doc')
     .pause(3000)
     .waitForElementVisible('button.confirm')
     .click('button.confirm')
     .assert.urlEquals('http://localhost:5600/')
     .pause(20000)
     .end();
  }
};
