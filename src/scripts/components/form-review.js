class FormReview extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
        <form class="form-review">
            <div id="alert"></div>
            <h3 class="form-title">Create New Review</h3>
            <div class="mb-3">
              <label for="input-name" class="form-label">Name</label>
              <input name="input-name" type="text" class="form-input" id="input-name">
            </div>
            <div class="mb-3">
              <label for="input-review" class="form-label">Review</label>
              <textarea name="input-review" type="text" class="form-input" id="input-review" rows="3"></textarea>
            </div>
            <button id="submit-review" type="submit" class="btn-submit">Submit</button>
        </form>
        `;
  }
}
customElements.define('form-review', FormReview);
