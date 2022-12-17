import './post-item';

class Posts extends HTMLElement {
  set item(item) {
    this._item = item;
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.className = 'posts';
    this._item.forEach((item) => {
      const postItem = document.createElement('post-item');
      postItem.item = item;
      this.appendChild(postItem);
    });
  }
}
customElements.define('post-list', Posts);
