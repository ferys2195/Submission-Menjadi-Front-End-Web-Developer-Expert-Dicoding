import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantdb from '../src/scripts/data/favourite';

describe('Unliking A Restaurant', () => {
  const restaurantId = 'rqdv5juczeskfw1e867';
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantdb.putRestaurant({ id: restaurantId });
  });

  afterEach(async () => {
    await FavoriteRestaurantdb.deleteRestaurant(restaurantId);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurantId,
      },
    });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurantId,
      },
    });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurantId,
      },
    });
    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurantId,
      },
    });
    // hapus dulu restaurant dari daftar restaurant yang disukai
    await FavoriteRestaurantdb.deleteRestaurant(restaurantId);
    // kemudian, simulasikan pengguna menekan widget batal menyukai restaurant
    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantdb.getAllRestaurants()).toEqual([]);
  });
});
