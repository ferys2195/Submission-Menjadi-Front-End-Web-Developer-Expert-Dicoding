import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantdb from '../src/scripts/data/favourite';

describe('Liking A Restaurant', () => {
  const restaurantId = 'rqdv5juczeskfw1e867';
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => addLikeButtonContainer());

  it('should show the like button when the restaurant has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurantId,
      },
    });
    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeTruthy();
  });

  it('should show the unlike button when the restaurant has not been unlike before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurantId,
      },
    });
    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeFalsy();
  });

  it('should be able to like the movie', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurantId,
      },
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantdb.getRestaurant(restaurantId);

    expect(restaurant).toEqual({ id: restaurantId });

    FavoriteRestaurantdb.deleteRestaurant(restaurantId);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurantId,
      },
    });
    // Tambahkan restaurant dengan ID restaurantID ke daftar restaurant yang disukai
    await FavoriteRestaurantdb.putRestaurant({ id: restaurantId });
    // Simulasikan pengguna menekan tombol suka restaurant
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // tidak ada restaurant yang ganda
    expect(await FavoriteRestaurantdb.getAllRestaurants()).toEqual([
      { id: restaurantId },
    ]);
    FavoriteRestaurantdb.deleteRestaurant(restaurantId);
  });

  it('should not add a restaurant when it has no id', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {},
    });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantdb.getAllRestaurants()).toEqual([]);
  });
});
