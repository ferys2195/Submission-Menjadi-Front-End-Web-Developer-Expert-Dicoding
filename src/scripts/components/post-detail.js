import './post-review';
import './post-menu';

class PostDetail extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
  }

  set reviews(reviews) {
    this._reviews = reviews;
  }

  render() {
    this.className = 'post-detail';
    this.innerHTML = /* html */ `
        <div class="detail-header">
          <img class="thumbnail" src="https://restaurant-api.dicoding.dev/images/small/${this._restaurant.pictureId}"
                alt="Restoran ${this._restaurant.name} di kota ${this._restaurant.city} dengan rating ${this._restaurant.rating}">
          <div class="detail-info">
            <h1 class="restaurant">${this._restaurant.name}</h1>
            <h2 class="city"><i class="fa-solid fa-city fa-sm" aria-hidden="true"></i> ${this._restaurant.city}</h2>
            <p class="address"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${this._restaurant.address}</p>
            <h2 class="rating">${this._restaurant.rating}</h2>
          </div>
        </div>
        <ul class="tabs">
            <li><a href="javascript:void(0)" data-view="descriptions" class="link-active">Descriptions</a>
            </li>
            <li><a href="javascript:void(0)" data-view="menus">Menus</a></li>
            <li><a href="javascript:void(0)" data-view="reviews">Reviews</a></li>
        </ul>
        <div id="tabs-content">
            <div id="descriptions" class="active content">
            </div>
            <div id="menus" class="content">
            </div>
            <div id="reviews" class="content">
            </div>
        </div>
    `;
    const descriptionContainer = document.querySelector('#descriptions');
    const reviewContainer = document.querySelector('#reviews');
    const menusContainer = document.querySelector('#menus');
    descriptionContainer.innerHTML = `<p>${this._restaurant.description}</p>`;
    const menusItem = document.createElement('post-menu');
    menusItem.menus = this._restaurant.menus;
    menusContainer.appendChild(menusItem);
    const postReview = document.createElement('post-review');
    postReview.reviews = this._reviews;
    reviewContainer.appendChild(postReview);

    const links = document.querySelectorAll('li');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const borderBottom = document.querySelector('.link-active');
        if (borderBottom !== null) borderBottom.classList.remove('link-active');

        const dataTarget = e.target;
        dataTarget.className = 'link-active';
        const id = dataTarget.getAttribute('data-view');

        const allLayout = document.querySelectorAll('.content');
        allLayout.forEach((layout) => {
          if (layout.id === id) layout.classList.add('active');
          else layout.classList.remove('active');
        });
      });
    });
  }
}
customElements.define('post-detail', PostDetail);
