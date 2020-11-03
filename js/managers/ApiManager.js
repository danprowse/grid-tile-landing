export default class ApiManager {

  async getNovaraNews() {
    const res = await fetch('http://localhost:5000/api/news-weather/novara')
    .then(response => response.json());
    console.log(res.posts)
    return res.posts;
  }

  async getGuardianNews() {
    const res = await fetch('http://localhost:5000/api/news-weather/guardian')
    .then(response => response.json());
    console.log(res.response.results);
    return res.response.results;
  }

  async getWeather() {
    const res = await fetch('http://localhost:5000/api/news-weather/weather')
    .then(response => response.json());
    console.log(res);
    return res;
  }

}