const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Given(/^I open Hagetaka page$/, () => {
  return client.url('http://localhost:8080').waitForElementVisible('body', 1000);
});

When(/^click Login$/, () => {
  client.click('#auth')
})

When(/^click Go to Login Page$/, () => {
  client.click('a[role=menuitem]')
})

Then(/^the title is "([^"]*)"$/, title => {
  return client.assert.title(title);
});

Then(/^the navigation bar exists$/, () => {
  return client.assert.visible('div[id="nav"]');
});

Then(/^the login form exists$/, () => {
  return client.assert.visible('h4.card-title');
});