import Restaurant from '../../data/restaurant';
import UrlParser from '../../routes/url-parser';
import '../../components/post-detail';
import '../../components/form-review';

import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return /* html */ `
    <div id="content">
      <h1 class="post__label">Detail</h1>
      <post-detail>
        <div id="loader"></div>
      </post-detail>
      <div id="likeButtonContainer"></div>
      <form-review/>
    </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantDetail = await Restaurant.detail(url.id);
    const postDetail = document.querySelector('post-detail');
    postDetail.restaurant = restaurantDetail.restaurant;
    postDetail.reviews = restaurantDetail.restaurant.customerReviews;
    postDetail.render();
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: restaurantDetail.restaurant,
    });
    const inputName = document.querySelector('#input-name');
    const inputReview = document.querySelector('#input-review');
    const btnSubmit = document.querySelector('#submit-review');
    btnSubmit.addEventListener('click', async (e) => {
      e.preventDefault();
      if (inputName.value === '') {
        inputName.focus();
        inputName.placeholder = 'Input your name...';
      } else if (inputReview.value === '') {
        inputReview.focus();
        inputReview.placeholder = 'Input your review...';
      } else {
        console.log(e);
        const body = {
          id: url.id,
          name: inputName.value,
          review: inputReview.value,
        };
        const response = await Restaurant.review(body);
        if (!response.error) {
          inputName.value = '';
          inputReview.value = '';
          postDetail.reviews = response.customerReviews;
          postDetail.render();
        }
      }
    });
  },
};

export default Detail;
