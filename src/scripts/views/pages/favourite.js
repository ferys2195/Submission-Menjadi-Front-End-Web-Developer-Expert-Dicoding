import FavoriteRestaurantdb from '../../data/favourite';

const Favourite = {
  async render() {
    return /* html */ `
    <div id="content">
      <h1 class="post__label">Favourite</h1>
      <post-list>
        <div id="loader"></div>
      </post-list>
    </div>
    `;
  },

  async afterRender() {
    const posts = document.querySelector('post-list');
    const response = await FavoriteRestaurantdb.getAllRestaurants();
    posts.item = response;
  },
};

export default Favourite;
