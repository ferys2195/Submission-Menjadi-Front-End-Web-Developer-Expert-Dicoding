class PostReview extends HTMLElement {
  set reviews(reviews) {
    this._reviews = reviews;
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.className = 'post-review';
    this._reviews.forEach(({ name, review, date }) => {
      const item = /* html */ `
      <div class="review-item">
            <h3 class="review-name">${name} <i class="fa-solid fa-comment-dots" aria-hidden="true"></i></h3>
            <q class="review-content">${review}</q>
            <p class="review-date">${date}</p>
        </div>
      `;
      this.innerHTML += item;
    });
  }
}
customElements.define('post-review', PostReview);
