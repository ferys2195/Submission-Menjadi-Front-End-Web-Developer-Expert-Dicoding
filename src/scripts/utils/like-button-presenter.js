import FavoriteRestaurantdb from '../data/favourite';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;
    if (await this._isRestaurantExist(id)) {
      this._renderUnLike();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = /* html */ `
      <button aria-label="like this restaurant" id="likeButton" class="like">
          <i class="fa-regular fa-heart" aria-hidden="true"></i>
      </button>
      `;
    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantdb.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderUnLike() {
    this._likeButtonContainer.innerHTML = /* html */ `
      <button aria-label="unlike this restaurant" id="likeButton" class="like">
          <i class="fa-solid fa-heart" aria-hidden="true"></i>
      </button>
      `;
    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
