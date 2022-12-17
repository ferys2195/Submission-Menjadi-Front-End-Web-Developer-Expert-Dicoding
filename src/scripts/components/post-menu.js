class PostMenu extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set menus(menus) {
    this._menus = menus;
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.className = 'post-menu';
    const { foods, drinks } = this._menus;
    const foodOl = document.createElement('ul');
    const drinkOl = document.createElement('ul');

    const containerFood = document.createElement('div');
    containerFood.className = 'post-menu-container';
    containerFood.innerHTML =
      '<h3><i class="fa-solid fa-utensils"></i> Foods</h3>';

    const containerDrink = document.createElement('div');
    containerDrink.className = 'post-menu-container';
    containerDrink.innerHTML =
      '<h3><i class="fa-solid fa-glass"></i> Drinks</h3>';

    this.appendChild(containerFood);
    this.appendChild(containerDrink);

    foods.forEach((food) => {
      const li = document.createElement('li');
      li.append(food.name);
      foodOl.appendChild(li);
    });
    drinks.forEach((drink) => {
      const li = document.createElement('li');
      li.append(drink.name);
      drinkOl.appendChild(li);
    });

    containerFood.appendChild(foodOl);
    containerDrink.appendChild(drinkOl);
  }
}
customElements.define('post-menu', PostMenu);
