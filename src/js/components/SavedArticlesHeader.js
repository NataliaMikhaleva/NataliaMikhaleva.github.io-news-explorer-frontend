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
    //document.location.reload();
  }
  // метод отрисовки мобильного меню на странице "сохраненные статьи"
  setMobileMenu() {
    const headerIcon = this.header.querySelector('.header__icon');
    const headerNav = this.header.querySelector('.header__nav');

    const bar1 = headerIcon.querySelector('.header__bar1');
    const bar2 = headerIcon.querySelector('.header__bar2');

    const headerSubtitle = this.header.querySelector('.header__subtitle');

    bar1.classList.toggle('header__bar1_change');
    bar1.classList.toggle('header__bar1_theme_white');
    bar2.classList.toggle('header__bar2_change');
    bar2.classList.toggle('header__bar2_theme_white');
    headerNav.classList.toggle('header__nav_opened');
    headerNav.classList.toggle('header_theme_dark');
    headerSubtitle.classList.toggle('header__subtitle_theme_white');
    this.header.classList.toggle('header_theme_dark');

  }
}