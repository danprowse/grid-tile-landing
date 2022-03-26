export default class ContentEditableManager {
  
  constructor(name, reminder) {
    this.nameInputElement = name;
    this.reminderInputElement = reminder;
  }

  getName() {
    return this.nameInputElement;
  }
  setValue(value, e) {    
    if (e.type === 'keypress') {
      //make sure keypress is enter
      if (e.which == 13 || e.keyCode == 13) {
          if(value === 'name') {
            localStorage.setItem(value, this.getName().innerText);
            this.#nameInputElement.blur();
          } else {
            localStorage.setItem(value, this.reminderInputElement.innerText);
            this.#reminderInputElement.blur();
          }
      }
    } else {
      if(value === 'name') {
        localStorage.setItem(value, this.nameInputElement.innerText);
      } else {
        localStorage.setItem(value, this.reminderInputElement.innerText);
      }
    }
  }

  getValue(value) {
    if(localStorage.getItem(value) === null) {
      if(value === 'name') {
        this.nameInputElement.textContent = `[Enter ${value}]`;
      } else {
        this.reminderInputElement.textContent = `[Enter ${value}]`;
      }
    } else {
        if(value === 'name') {
          this.nameInputElement.textContent = localStorage.getItem(value);;
        } else {
          this.reminderInputElement.textContent = localStorage.getItem(value);;
        }
    }
  }
}
