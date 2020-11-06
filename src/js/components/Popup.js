export default class Popup {
  constructor(somePopup, openButton, closeButton) {
    this.somePopup = somePopup;
    this.openButton = openButton;
    this.closeButton = closeButton;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

  }
  open() {
    this.somePopup.classList.add('popup_is_opened');
  }

  close() {
    this.somePopup.querySelector('.popup__form').reset();
    this.somePopup.classList.remove('popup_is_opened');
  }

  clearContent() {

  }

  setContent(){

  }

  eventListeners() {
    this.openButton.addEventListener('click', this.open);
    this.closeButton.addEventListener('click', this.close);
  }
}