// /* eslint func-names: "off"*/
// /* eslint no-unused-vars: "off"*/
// const config = require('../../../nightwatch.conf');

// module.exports = {
//   'SignUp Page': function (browser) {
//     browser
//       .url('http://localhost:5600')
//       .waitForElementVisible('body')
//       .assert.title('Ace-DMS')
//       .assert.urlEquals('http://localhost:5600/login')
//       .click('#signup-nav')
//       .pause(2000)
//       .assert.urlEquals('http://localhost:5600/signup')
//       .assert.title('Ace-DMS')
//       .setValue('input#firstname', 'Efhy')
//       .setValue('input#lastname', 'MmaEfanga')
//       .setValue('input#email', 'bibiWonder@gmail.com')
//       .setValue('input#password', 'wonder!@#')
//       .click('button[type="submit"]')
//       .pause(2500)
//       .waitForElementVisible('body')
//       .assert.urlEquals('http://localhost:5600/')
//       .waitForElementVisible('body')
//       .end();
//   }
// };
