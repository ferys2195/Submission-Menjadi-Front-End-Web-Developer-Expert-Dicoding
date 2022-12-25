const assert = require('assert');

Feature('Liking Restaurant');
Before(({ I }) => {
  I.amOnPage('/#/favorit');
});
Scenario('liking one restaurant', async ({ I }) => {
  I.seeElement('.error');
  I.see('Your Favourite is empty !', '#title');
  I.amOnPage('/');
  I.seeElement('post-item');
  I.seeElement('.post-item__title a');

  const firstRestaurant = locate('.post-item__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 30);

  I.click('#likeButton');

  I.amOnPage('/#/favorit');
  I.seeElement('post-item');

  const likedRestaurantTitle = await I.grabTextFrom('.post-item__title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
