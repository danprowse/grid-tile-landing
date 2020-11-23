import ContentEditableManager from './managers/ContentEditableManager.js';
import ApiManager from './managers/ApiManager.js';
//DOM Elements
const nameInput = document.querySelector('#name-input'); 
const reminderInput = document.querySelector('#reminder-input');
const weatherIcon = document.querySelector('.icon'); 
const currentTemp = document.querySelector('.current-temp'); 
const currentLocation = document.querySelector('.current-location');
const novaraSlider = document.querySelector('.novara-slider');
const guardianSlider = document.querySelector('.guardian-slider');

//manager classes
const CEM = new ContentEditableManager(nameInput, reminderInput);
const AM = new ApiManager();

function setName(e) {
    CEM.setValue('name', e);
}

function setReminder(e) {
    CEM.setValue('focus', e);
}

async function getWeather() {
    //get response
    const weather = await AM.getWeather();
    //add to DOM
    weatherIcon.src = `${weather.icon}`;
    currentTemp.innerHTML = `<p class="temp">${weather.temp_c}&#176;C</p>`;
    currentLocation.innerHTML = `<p class="location">${weather.location}</p>`;
}

async function getNovaraNews() {
    const novaraNewsData = await AM.getNovaraNews();
    //loop through and foreach create div with content and add to section.
    let sumHeight = novaraNewsData.length * 100;
    novaraSlider.style.height = `${sumHeight}%`;
    novaraNewsData.forEach(el => {
        novaraSlider.innerHTML += `
        <section class="news-content">
            <div class="text-content">
                <div class="content-container">
                    <p class="news-title">${el.title}</p>
                    <div class="news-desc">
                        <p class="desc">${el.short_desc}</p>
                    </div>
                    <div class="news-link-container">
                        <a href="${el.permalink}" class="link">
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
        `       
    });
}

async function getGuardianNews() {
    const guardianNewsData = await AM.getGuardianNews();
    let sumHeight = guardianNewsData.length * 100;
    guardianSlider.style.height = `${sumHeight}%`;
    guardianNewsData.forEach(el => {
        guardianSlider.innerHTML += `
        <section class="news-content">
            <div class="text-content">
                <p>${el.sectionName}</p>
                <p>${el.webTitle}</p>
            </div>
            <div>
                <a href="${el.webUrl}">Click for full article.</p>
            </div>
        </section>
        `       
    });
}

nameInput.addEventListener('keypress', setName);
nameInput.addEventListener('blur', setName);
reminderInput.addEventListener('keypress', setReminder);
reminderInput.addEventListener('blur', setReminder);

//get weather and news
window.addEventListener('DOMContentLoaded', getWeather);
window.addEventListener('DOMContentLoaded', getNovaraNews);
window.addEventListener('DOMContentLoaded', getGuardianNews);

//Run
CEM.getValue('name');
CEM.getValue('focus');
// AM.getNovaraNews();
// AM.getGuardianNews();
// AM.getWeather();