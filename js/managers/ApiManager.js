import {
  novaraTestData,
  guardianTestData,
  weatherTestData,
} from "../test-data/testData.js";

const route = 'https://fathomless-shelf-33526.herokuapp.com';

export default class ApiManager {
  async getNovaraNews() {
    let info;
    const res = await fetch(`${route}/api/news-weather/novara`)
      .then((response) => response.json())
      .then((data) => {
        info = data.posts;
      })
      .catch((err) => {
        console.log(err);
        info = novaraTestData;
      });
    // console.log(info);
    return info;
  }

  async getGuardianNews() {
    let info;

    const res = await fetch(`${route}/api/news-weather/guardian`)
      .then((response) => response.json())
      .then((data) => {
        info = data.response.results;
      })
      .catch((err) => {
        console.log(err);
        info = guardianTestData;
      });
    // console.log(info);
    return info;
  }

  async getWeather() {
    let weatherObj = {};

    // checking if location api is available
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      const getPosition = (options) => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      };
      await getPosition()
        .then(async (position) => {
          console.log(position);
          let { longitude, latitude } = position.coords;
          const res = await fetch(
            `${route}/api/news-weather/weather`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ longitude, latitude }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              weatherObj.temp_c = data.current.temp_c;
              weatherObj.location = data.location.name;
              weatherObj.icon = data.current.condition.icon;
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
    return Object.keys(weatherObj).length === 0 ? weatherTestData : weatherObj;
  }
}
