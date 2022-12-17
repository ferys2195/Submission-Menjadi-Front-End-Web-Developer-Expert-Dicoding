import '../../components/posts';
import Restaurant from '../../data/restaurant';

const Home = {
  async render() {
    return /* html */ `
    <div id="content">
      <h1 class="post__label">Explore Restaurant</h1>
      <post-list>
        <div id="loader"></div>
      </post-list>
    </div>
    `;
  },

  async afterRender() {
    const posts = document.querySelector('post-list');
    const response = await Restaurant.list();
    posts.item = response.restaurants;
  },
};

export default Home;
