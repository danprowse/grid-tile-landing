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
    const weatherObj = {};
    const res = await fetch('http://localhost:5000/api/news-weather/weather')
    .then(response => response.json())
    .then(data => {
      weatherObj.temp_c = data.current.temp_c;
      weatherObj.feels_like_c = data.current.feelslike_c;
      weatherObj.icon = data.current.condition.icon;
      console.log(weatherObj);
    });
    // const weatherObj = {
    //   temp: res.current.temp_c,
    //   feels_like: res.current.temp_c,
    //   icon: res.current.condtion.icon
    // }
    // console.log(weatherObj);
    return weatherObj;
  }

}