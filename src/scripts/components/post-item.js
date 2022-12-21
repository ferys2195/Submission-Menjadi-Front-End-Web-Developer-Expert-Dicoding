class PostItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set item(item) {
    this._item = item;
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
        <article class="post_item">
          <img class="post-item__thumbnail lazyload" data-src="https://restaurant-api.dicoding.dev/images/small/${this._item.pictureId}"
            alt="Restoran ${this._item.name} di kota ${this._item.city} dengan rating ${this._item.rating}">
          <div class="post-item__content">
            <h1 class="post-item__title"><a href="/#/detail/${this._item.id}">${this._item.name}</a></h1>
            <div class="post-item__info">
              <h2 class="city">${this._item.city}</h2>
              <h2 class="rating">${this._item.rating}</h2>
            </div>
            <p class="post-item__description">${this._item.description}</p>
          </div>
        </article>
        `;
  }
}
customElements.define('post-item', PostItem);
