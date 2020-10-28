//DOM Elements
const nameInput = document.querySelector('#name-input'); 
const reminderInput = document.querySelector('#reminder-input'); 

//get name
function getName() {
  //check local
  if(localStorage.getItem('name') === null) {
      nameInput.textContent = '[Enter Name]'
  } else {
      nameInput.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  
  if (e.type === 'keypress') {
      //make sure keypress is enter
      if (e.which == 13 || e.keyCode == 13) {
          localStorage.setItem('name', e.target.innerText);
          nameInput.blur();
      }
      
  } else {
      localStorage.setItem('name', e.target.innerText);
  }
}

function getFocus() {
  //check local
  if(localStorage.getItem('focus') === null) {
      reminderInput.textContent = '[Enter Focus]'
  } else {
      reminderInput.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  
  if (e.type === 'keypress') {
      //make sure keypress is enter
      if (e.which == 13 || e.keyCode == 13) {
          localStorage.setItem('focus', e.target.innerText);
          reminderInput.blur();
      }
      
  } else {
      localStorage.setItem('focus', e.target.innerText);
  }
}

nameInput.addEventListener('keypress', setName);
nameInput.addEventListener('blur', setName);
reminderInput.addEventListener('keypress', setFocus);
reminderInput.addEventListener('blur', setFocus);



//Run
getName();
getFocus();