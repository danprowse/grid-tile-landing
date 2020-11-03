import ContentEditableManager from './managers/ContentEditableManager.js';
import ApiManager from './managers/ApiManager.js';
//DOM Elements
const nameInput = document.querySelector('#name-input'); 
const reminderInput = document.querySelector('#reminder-input');
const weatherIcon = document.querySelector('.icon'); 
const currentTemp = document.querySelector('.current-temp'); 
const feelLikeTemp = document.querySelector('.feels-like-temp'); 

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
    currentTemp.innerHTML = `<p class="temp">${weather.temp_c}&#176;C</p>`
    feelLikeTemp.innerHTML = `<p class="feels-temp">Feels like: ${weather.feels_like_c}&#176;C</p>`
    // console.log(weather);
}

nameInput.addEventListener('keypress', setName);
nameInput.addEventListener('blur', setName);
reminderInput.addEventListener('keypress', setReminder);
reminderInput.addEventListener('blur', setReminder);

window.addEventListener('DOMContentLoaded', getWeather);


//Run
CEM.getValue('name');
CEM.getValue('focus');
AM.getNovaraNews();
AM.getGuardianNews();
AM.getWeather();