import { novaraTestData, guardianTestData, weatherTestData } from "../test-data/testData.js";
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
    let weatherObj = {};

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      var getPosition = function (options) {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      };
      await getPosition()
        .then(async (position) => {
          console.log(position);
          let { longitude, latitude } = position.coords;
          const res = await fetch(
            "http://localhost:5000/api/news-weather/weather",
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
              console.log(weatherObj);
            })
            .catch((err) => {
              console.log(err)
            });
        })
        .catch((err) => {
          console.error(err.message);
        });
    }

    return (Object.keys(weatherObj).length === 0 ? weatherTestData : weatherObj)
  }
}
