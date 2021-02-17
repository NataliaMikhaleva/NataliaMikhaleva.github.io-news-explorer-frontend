import Popup from './Popup';

export default class PopupFromPopup extends Popup {
  constructor(somePopup, openButton, closeButton, somePopupToClose) {
    super(somePopup, openButton, closeButton);
    this.somePopupToClose = somePopupToClose;

    this.open = this.open.bind(this);

    this.someButton = this.somePopup.querySelector('.popup__button');
  }

  open() {
    this.errorMessages.textContent = '';
    this.someButton.setAttribute('disabled', 'disabled');
    this.somePopup.classList.add('popup_is_opened');
    if(!this.somePopupToClose.classList.contains('popup_reg_success')) {
      this.somePopupToClose.querySelector('.popup__form').reset();
    }
       this.somePopupToClose.classList.remove('popup_is_opened');

  }

  eventListeners() {
    this.openButton.addEventListener('click', this.open);
    this.closeButton.addEventListener('click', this.close);
  }
}