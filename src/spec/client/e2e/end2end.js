var $ = require('jquery');

module.exports = {
  'Step 1: Login': function(browser) {
    browser
      .url('http://localhost:3000/')
      .assert.title('Mockr')
      .waitForElementPresent('button', 1000)
      .click('.loginButton button')
      .setValue('#login_field', ['mockr.app@gmail.com'])
      .setValue('#password', ['MockMe2015'])
      .submitForm('#login form')
      .pause(500)
      .assert.containsText('h3', 'Create a Route')
  },
  'Step 2: Test Valid field entries': function(browser) {
    browser
      .setValue('form input', '/')
      .verify.cssClassPresent('form input', 'ng-invalid')
      .clearValue('form input')

      .setValue('form input', 'test//hello')
      .verify.cssClassPresent('form input', 'ng-invalid')
      .clearValue('form input')

      .setValue('form input', 'test@/hello')
      .verify.cssClassPresent('form input', 'ng-invalid')
      .clearValue('form input')

      .setValue('form input', 'test<script></script>')
      .verify.cssClassPresent('form input', 'ng-invalid')
      .clearValue('form input')

      .setValue('form input', 'test?=<script></script>')
      .verify.cssClassPresent('form input', 'ng-invalid')
      .clearValue('form input')

      .setValue('form input', '%')
      .verify.cssClassPresent('form input', 'ng-invalid')
      .clearValue('form input')
  },
  'Step 3: Validate GET Form entries': function(browser) {
    /**
    * Work around for the .clearValue() not working as expected for
    * input fields with type=number.  Clicks the -inputBox to ad then remove the
    * box to clear it.
    */

    browser
      .setValue('form input', 'testroute/goes/here')
      .submitForm('form')

      .click('.GET-inputBox')
      .setValue('.status', 'abc')
      .verify.cssClassPresent('.status', 'ng-invalid')
      .click('.GET-inputBox')

      .click('.GET-inputBox')
      .setValue('.status', '200')
      .verify.cssClassNotPresent('.status', 'ng-invalid')
      .setValue('.response-body', 'Hello World!')
      .verify.cssClassNotPresent('.response-body', 'ng-invalid')
      .clearValue('.response-body')
      .click('.GET-inputBox')
  },
  'Step 4: Validate POST Form entries': function(browser) {
    browser
      .click('.POST-inputBox')
      .setValue('.status', 'abc')
      .verify.cssClassPresent('.status', 'ng-invalid')
      .click('.POST-inputBox')

      .click('.POST-inputBox')
      .setValue('.status', '200')
      .verify.cssClassNotPresent('.status', 'ng-invalid')
      .setValue('.response-body', 'Hello World!')
      .verify.cssClassNotPresent('.response-body', 'ng-invalid')
      .clearValue('.response-body')
      .click('.POST-inputBox')
  },
  'Step 4: Validate PUT Form entries': function(browser) {
    browser
      .click('.PUT-inputBox')
      .setValue('.status', 'abc')
      .verify.cssClassPresent('.status', 'ng-invalid')
      .click('.PUT-inputBox')

      .click('.PUT-inputBox')
      .setValue('.status', '200')
      .verify.cssClassNotPresent('.status', 'ng-invalid')
      .setValue('.response-body', 'Hello World!')
      .verify.cssClassNotPresent('.response-body', 'ng-invalid')
      .clearValue('.response-body')
      .click('.PUT-inputBox')
  },
  'Step 4: Validate DELETE Form entries': function(browser) {
    browser
      .click('.DELETE-inputBox')
      .setValue('.status', 'abc')
      .verify.cssClassPresent('.status', 'ng-invalid')
      .click('.DELETE-inputBox')

      .click('.DELETE-inputBox')
      .setValue('.status', '200')
      .verify.cssClassNotPresent('.status', 'ng-invalid')
      .setValue('.response-body', 'Hello World!')
      .verify.cssClassNotPresent('.response-body', 'ng-invalid')
      .clearValue('.response-body')
      .click('.DELETE-inputBox')
  },
  'Step 5: Add a Route': function(browser) {
    browser
      .verify.containsText('h1', 'New Route')
      .click('.GET-inputBox')
      .setValue('.status', '200')
      .setValue('.response-body', 'Hello World!')
      .click('.btn-primary')

      //pause is required here to make the test pass
      .pause(300)
      .verify.containsText('.routeInRoutes .ng-binding', 'testroute/goes/here')
      .click('.routeInRoutes .ng-binding')
      .verify.containsText('h1', 'Edit Route')
      .end();
  }
};
