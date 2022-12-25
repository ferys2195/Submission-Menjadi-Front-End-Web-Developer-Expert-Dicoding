const assert = require('assert');

Feature('Unliking Restaurant');
Before(({ I }) => {
  I.amOnPage('/#/favorit');
});

Scenario('Unliking one restaurant', async ({ I }) => {
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
  I.click(firstRestaurant);
  I.waitForElement('.detail-info .restaurant');
  I.waitForElement('#likeButton', 30);
  I.seeAttributesOnElements('#likeButton', {
    'aria-label': 'unlike this restaurant',
  });
  const favoritRestaurantTitle = await I.grabTextFrom('.restaurant');
  assert.strictEqual(likedRestaurantTitle, favoritRestaurantTitle);
  I.click('#likeButton');

  I.amOnPage('/#/favorit');
  I.seeElement('.error');
  I.see('Your Favourite is empty !', '#title');
});
