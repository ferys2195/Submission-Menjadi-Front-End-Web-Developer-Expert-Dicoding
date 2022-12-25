Feature('Customer Reviews');
Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Add Review to one restaurant', ({ I }) => {
  I.seeElement('post-item');
  I.seeElement('.post-item__title a');

  const firstRestaurant = locate('.post-item__title a').first();
  I.click(firstRestaurant);

  const name = 'Fery';
  const review = 'restaurant favorit untuk dikunjungi bersama teman, keluarga';
  I.seeElement('form-review');
  I.fillField('#input-name', name);
  I.fillField('#input-review', review);
  I.click('#submit-review');

  I.waitForValue('#input-name', '');
  I.waitForValue('#input-review', '');
  I.waitForElement('.alert-success');
  I.seeElement('.alert-success');
});
