import ContentEditableManager from './managers/ContentEditableManager.js';
//DOM Elements
const nameInput = document.querySelector('#name-input'); 
const reminderInput = document.querySelector('#reminder-input'); 

//manager classes
const CEM = new ContentEditableManager(nameInput, reminderInput);

function setName(e) {
    CEM.setValue('name', e);
}

function setReminder(e) {
    CEM.setValue('focus', e);
}

nameInput.addEventListener('keypress', setName);
nameInput.addEventListener('blur', setName);
reminderInput.addEventListener('keypress', setReminder);
reminderInput.addEventListener('blur', setReminder);


//Run
CEM.getValue('name');
CEM.getValue('focus');