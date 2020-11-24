import { novaraTestData, guardianTestData } from "../test-data/testData.js";
export default class ApiManager {
  async getNovaraNews() {
    let info;
    const res = await fetch("http://localhost:5000/api/news-weather/novara")
      .then((response) => response.json())
      .then((data) => {
        info = data.posts;
      })
      .catch((err) => {
        console.log(err);
        info = novaraTestData;
      });
    console.log(info);
    return info;
  }

  async getGuardianNews() {
    let info;
    const res = await fetch("http://localhost:5000/api/news-weather/guardian")
      .then((response) => response.json())
      .then((data) => {
        info = data.response.results;
      })
      .catch((err) => {
        console.log(err);
        info = guardianTestData;
      });
    console.log(info);
    return info;
  }

  async getWeather() {
    const weatherObj = {};
    const res = await fetch("http://localhost:5000/api/news-weather/weather")
      .then((response) => response.json())
      .then((data) => {
        weatherObj.temp_c = data.current.temp_c;
        weatherObj.location = data.location.name;
        weatherObj.icon = data.current.condition.icon;
        console.log(weatherObj);
      })
      .catch((err) => console.log(err));
    return weatherObj;
  }
}
