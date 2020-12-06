import Header from './Header';

export default class SavedArticlesHeader extends Header {
  constructor(api, header) {
    super(api)
    this.header = header;
  }
  // отрисовка имени на кнопке выхода
  _renderName(props) {
    if(props.isLoggedIn) {

      const headerButtonName = this.header.querySelector('.header__button_name');
      headerButtonName.textContent = props.userName;
      console.log(props.userName);
      return
    }
     else {
      window.location.href = './index.html';
    }
  }
    // метод получения данных пользователя из базы
  getUserData() {
    this.api.getUserData().then((res) => {

      const userName = res.data.name;
      const props = {
        isLoggedIn: true,
        userName: userName
      }
      //this.popupIsClosed();
      this._renderName(props);
    })
    .catch((err) => {
      // вставить текст ошибки вниз попапа входа
      // const errorMessageBack = this.somePopup.querySelector('.error-message-back');
      // errorMessageBack.textContent = err.message;
      const props = {
        isLoggedIn: false,
      }
      this._renderName(props);
    })
  }
   //метод, сбрасыващий авторизацию текущего пользователя
   userExit() {
    localStorage.removeItem('token');
    window.location.href = './index.html';
    document.location.reload();
  }
}