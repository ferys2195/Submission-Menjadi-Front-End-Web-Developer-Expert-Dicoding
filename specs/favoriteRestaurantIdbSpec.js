import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import FavoriteRestaurantdb from '../src/scripts/data/favourite';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurantdb.getAllRestaurants()).forEach(
      async (restaurant) => {
        await FavoriteRestaurantdb.deleteRestaurant(restaurant.id);
      }
    );
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantdb);
});
