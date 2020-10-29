export default class ApiManager {

  async getNovaraNews() {
    const res = await fetch('http://localhost:5000/novara').then(response => response.json());
    return res.posts;
  }

  getGuardianNews() {
    
  }

  getWeather() {

  }

}