import CONFIG from '../global/config';

class Restaurant {
  static async list() {
    const response = await fetch(`${CONFIG.BASE_URL}/list`);
    return response.json();
  }

  static async detail(id) {
    const response = await fetch(`${CONFIG.BASE_URL}/detail/${id}`);
    return response.json();
  }

  static async review(body) {
    const response = await fetch(`${CONFIG.BASE_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response.json();
  }
}
export default Restaurant;
