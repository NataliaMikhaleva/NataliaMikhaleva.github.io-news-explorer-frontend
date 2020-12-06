export default class Popup {
  constructor(somePopup, openButton, closeButton, api, someForm, somePopupToClose) {
    this.somePopup = somePopup;
    this.openButton = openButton;
    this.closeButton = closeButton;
    this.api = api;
    this.someForm = someForm;
    this.somePopupToClose = somePopupToClose;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.setContent = this.setContent.bind(this);


    this.errorMessage = this.somePopup.querySelectorAll('.error-message');

  }
  // метод, открывающий попап
  open() {
    this.errorMessage.forEach(element => {
      element.textContent = ''
    });
    this.somePopup.classList.add('popup_is_opened');

  }
// метод, закрывающий попап (одновременно сбрасывает форму)
  close() {
    this.somePopup.querySelector('.popup__form').reset();
    this.somePopup.classList.remove('popup_is_opened');
    this.errorMessage.forEach(element => {
      element.textContent = ''
    });
  }

  clearContent() {

  }
// метод, открывающий попап успешной регистрации при успешной регистрации
  setContent(){
    event.preventDefault();
    const someEmail = this.someForm.useremail.value;
    const someName = this.someForm.username.value;
    const somePassword = this.someForm.userpassword.value;
    this.api.signup(someEmail, someName, somePassword).then((res) => {
      this.somePopup.classList.add('popup_is_opened');
      this.somePopupToClose.classList.remove('popup_is_opened');

    })
    .catch((err) => {
      //если регистрация не удалась, вставляем ошибку, пришедшую с сервера
      const errorMessageBack = this.somePopupToClose.querySelector('.error-message-back');
      errorMessageBack.textContent = err.message;
    })
  }

  eventListeners() {
    this.openButton.addEventListener('click', this.open);
    this.closeButton.addEventListener('click', this.close);
  }
  eventListenerForPopupSuccess() {
    this.someForm.addEventListener('submit', this.setContent);
  }
}