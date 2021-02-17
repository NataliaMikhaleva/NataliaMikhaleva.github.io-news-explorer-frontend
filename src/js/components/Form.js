export default class Form {
  constructor(someForm) {
    this.someForm = someForm;

    this._validateForm = this._validateForm.bind(this);
    this._validateInputElement = this._validateInputElement.bind(this);
  }

  setServerError() {


  }

  _validateInputElement(someInput) {
    const errorElement = someInput.nextElementSibling;

    if(!someInput.checkValidity()) {

      if(someInput.value !== '' && someInput.type === 'email') {
        const errorMessage = 'Неправильный формат email';
        errorElement.textContent = errorMessage;
      }
      if(someInput.type === 'text') {
        const errorMessage = 'Это обязательное поле';
        errorElement.textContent = errorMessage;
      }
      return false
    } else {
     errorElement.textContent = '';
      return true;
    }
  }

  _notActiveButton(someButton) {
    someButton.classList.remove('popup__button_active');
    someButton.setAttribute('disabled', 'disabled');
  }

  _activeButton(someButton) {
    someButton.classList.add('popup__button_active');
    someButton.removeAttribute('disabled', 'disabled');
  }

  _validateForm() {

    const input = event.target;
    const array = Array.from(this.someForm.elements);
    const someButton = this.someForm.querySelector('.popup__button');
    delete array[array.length - 1];
    this._validateInputElement(input);
    if (!array.every(this._validateInputElement)) {
       this._notActiveButton(someButton);
    } else {
      this._activeButton(someButton);
    }
  }
  _clear() {

  }
  _getInfo() {

  }
  setEventListeners() {
    this.someForm.addEventListener('input', this._validateForm);
  }
}