/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const faker = require('faker');

const config = require('../../../nightwatch.conf');

module.exports = {
  'Create Document': function (browser) {
    browser
      .url('http://localhost:5600')
      .waitForElementVisible('body')
      .assert.title('Ace-DMS')
      .assert.urlEquals('http://localhost:5600/login')
      .click('#signup-nav')
      .pause(2000)
      .assert.urlEquals('http://localhost:5600/signup')
      .assert.title('Ace-DMS')
      .setValue('input#firstname', 'Tommy')
      .setValue('input#lastname', 'Duyile')
      .setValue('input#email', 'codingPoet@gmail.com')
      .setValue('input#password', 'codingpoet!@gmail.com')
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
      .click('#signup-nav')
      .pause(2000)
      .assert.urlEquals('http://localhost:5600/signup')
      .assert.title('Ace-DMS')
      .setValue('input#firstname', 'Bolaji')
      .setValue('input#lastname', 'andela')
      .setValue('input#email', 'bolaji@andela.com')
      .setValue('input#password', 'damilola')
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
     .end();
  },
  'Delete Documents': function (browser) {
    browser
      .url('http://localhost:5600')
      .waitForElementVisible('body')
      .click('#email-login')
      .assert.urlEquals('http://localhost:5600/login')
      .assert.title('Ace-DMS')
      .setValue('input[type=email]', 'user2@testMail.com')
      .setValue('input[type=password]', 'user2 password')
      .click('button[type="submit"]')
      .pause(2500)
      .waitForElementVisible('body')
      .pause(2500)
      .assert.urlEquals('http://localhost:5600/')
      .pause(3000)
      .click('#delete-doc')
      .pause(3000)
     .assert.urlEquals('http://localhost:5600/')
     .pause(3000)
     .end();
  }
};
