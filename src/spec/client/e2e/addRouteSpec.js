module.exports = {
  'Test the home page adding a route': function(browser) {
    browser
      .url('http://localhost:3000/')
      .assert.title('Mockr')
      .waitForElementPresent('button', 1000)
      .moveToElement('button', 10, 10)
      .click('.loginButton button')
      .setValue('#login_field', ['mockr.app@gmail.com'])
      .setValue('#password', ['MockMe2015'])
      .submitForm('#login form')
      .pause(500)
      .setValue('form input', 'testroute/goes/here')
      .click('input[type="checkbox"]')
      .pause(500)
      .submitForm('form')
      .pause(500)
      .assert.containsText('.routeInRoutes a', 'testroute/goes/here')
      .click('.routeInRoutes a')
      .pause(2000)
      .assert.containsText('h1', 'Edit Route')
      .end();
  }
};
