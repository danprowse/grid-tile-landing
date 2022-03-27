import ContentEditableManager from "./managers/ContentEditableManager.js";
import ApiManager from "./managers/ApiManager.js";

//DOM Elements
const nameInput = document.querySelector("#name-input");
const reminderInput = document.querySelector("#reminder-input");
const weatherIcon = document.querySelector(".icon");
const currentTemp = document.querySelector(".current-temp");
const currentLocation = document.querySelector(".current-location");
const novaraSlider = document.querySelector(".novara-slider");
const guardianSlider = document.querySelector(".guardian-slider");

//manager classes
const CEM = new ContentEditableManager(nameInput, reminderInput);
const AM = new ApiManager();

let guardianNewsTransition;
let novaraNewsTransition;

function setName(e) {
  CEM.setValue("name", e);
}

function setReminder(e) {
  CEM.setValue("todo", e);
}

async function getWeather() {
  const weather = await AM.getWeather();
  weatherIcon.src = `${weather.icon}`;
  currentTemp.innerHTML = `<p class="temp">${weather.temp_c}&#176;C</p>`;
  currentLocation.innerHTML = `<p class="location">${weather.location}</p>`;
}

async function getNovaraNews() {
  const novaraNewsData = await AM.getNovaraNews();
  let heightOfSlider = novaraNewsData.length * 100;
  novaraNewsTransition = 100 / novaraNewsData.length;
  novaraSlider.style.height = `${heightOfSlider}%`;
  
  //loop through and foreach create div with content and add to section.
  novaraNewsData.forEach((el) => {
    let text = el.short_desc;
    // removing html tags
    text = text.replace(/(<([^>]+)>)/gi, "");
    novaraSlider.innerHTML += `
        <section class="news-content">
            <div class="text-content">
                <div class="content-container">
                    <p class="news-title">${el.title}</p>
                    <div class="news-desc">
                      <div>
                        <p class="desc">${text}</p>
                      </div>
                    </div>
                    <div class="news-link-container">
                        <a href="${el.permalink}" target="_blank" class="link">
                            <i class="fas fa-external-link-square-alt icon"></i>
                            full article
                            </a>
                    </div>
                </div>
            </div>
            <div class="news-img-container">
                <img src="${el.thumb_small}" class="news-img"/>
            </div>
        </section>
        `;
  });
}

async function getGuardianNews() {
  const guardianNewsData = await AM.getGuardianNews();
  let heightOfSlider = guardianNewsData.length * 100;
  guardianNewsTransition = 100 / guardianNewsData.length;
  guardianSlider.style.height = `${heightOfSlider}%`;

  guardianNewsData.forEach((el) => {
    guardianSlider.innerHTML += `
        <section class="news-content">
            <div class="text-content">
                <div class="content-container">
                    <p class="news-title">${el.sectionName}</p>
                    <p class="desc">${el.webTitle}</p>
                    <div class="news-link-container">
                        <a href="${el.webUrl}" target="_blank" class="link">
                            <i class="fas fa-external-link-square-alt icon"></i>
                            full article
                        </a>
                    </div>
                </div>
            </div>
        </section>
        `;
  });
}
/* 
function does not work on its own due to transition issues
only when removing it and altering transform can we reset 
it before this gets called again 
*/
function novaraNextNewsPost() {
  setInterval(() => {
    novaraSlider.style.transform = `translateY(-${novaraNewsTransition}%)`;
    console.log("moving...");
  }, 5000);
}

function guardianNextNewsPost() {
  setInterval(() => {
    guardianSlider.style.transform = `translateY(-${guardianNewsTransition}%)`;
    console.log("moving...");
  }, 5000);
}

function handleTransition(slider) {
  slider.appendChild(slider.firstElementChild);
  slider.style.transition = "none";
  slider.style.transform = "translate(0)";
  setTimeout(() => {
    slider.style.transition = "all ease-in-out .75s";
  });
}

novaraSlider.addEventListener("transitionend", () => handleTransition(novaraSlider));
guardianSlider.addEventListener("transitionend", () => handleTransition(guardianSlider));


nameInput.addEventListener("keypress", setName);
nameInput.addEventListener("blur", setName);
reminderInput.addEventListener("keypress", setReminder);
reminderInput.addEventListener("blur", setReminder);

//get weather and news
window.addEventListener("DOMContentLoaded", getWeather);
window.addEventListener("DOMContentLoaded", getNovaraNews);
window.addEventListener("DOMContentLoaded", getGuardianNews);
window.addEventListener("DOMContentLoaded", novaraNextNewsPost);
window.addEventListener("DOMContentLoaded", guardianNextNewsPost);

//Run
CEM.getValue("name");
CEM.getValue("todo");
