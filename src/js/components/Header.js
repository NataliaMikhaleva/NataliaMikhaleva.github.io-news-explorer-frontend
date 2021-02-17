export default class Header {
  constructor(api, somePopup, someForm, popupIsClosed, headerNotLoggedIn, headerLoggedIn, header) {
    this.api = api;
    this.somePopup = somePopup;
    this.someForm = someForm;
    this.popupIsClosed = popupIsClosed;
    this.headerNotLoggedIn = headerNotLoggedIn;
    this.headerLoggedIn = headerLoggedIn;
    this.header = header;

    this.updateHeaderAuth = this.updateHeaderAuth.bind(this);
    this.setMobileMenu = this.setMobileMenu.bind(this);

  }
  //метод отрисовывает тот или иной хедер в зависимости от того, авторизован ли пользователь
  _render(props) {
    if(props.isLoggedIn) {

      this.headerNotLoggedIn.classList.add('header_is_closed');

      this.headerLoggedIn.classList.toggle('header_is_closed');

     // const headerButtonLoggedIn = this.headerLoggedIn.querySelector('.header__button_loggedIn');
      const headerButtonName = this.headerLoggedIn.querySelector('.header__button_name');
      //headerButtonLoggedIn.textContent = props.userName; //`<img class= 'header__button_image' src= '<%=require('./images/Exit.svg')%>' alt= 'кнопка выхода'>`;
      headerButtonName.textContent = props.userName;
      return
    }
     else {
      this.headerNotLoggedIn.classList.add('header_is_opened');
      this.headerLoggedIn.classList.add('header_is_closed');
    }
  }
  // отдельно выносим метод получения данных пользователя из базы
  _getUserData() {
    this.api.getUserData().then((res) => {

      const userName = res.data.name;
      const props = {
        isLoggedIn: true,
        userName: userName
      }
      this.popupIsClosed();
      this._render(props);
    })
    .catch((err) => {
      // вставить текст ошибки вниз попапа входа
      const errorMessageBack = this.somePopup.querySelector('.error-message-back');
      errorMessageBack.textContent = err.message;
      const props = {
        isLoggedIn: false,
      }
      this.render(props);
    })
  }
  //метод, обновляющий хедер при авторизации пользователя из формы авторизации
  updateHeaderAuth() {
    event.preventDefault();
    const someEmail = this.someForm.useremail.value;
    const somePassword = this.someForm.userpassword.value;
    this.api.signin(someEmail, somePassword).then((res) => {
    this._getUserData();
    })
    .catch((err) => {
      const errorMessageBack = this.somePopup.querySelector('.error-message-back');
      errorMessageBack.textContent = err.message;
      const props = {
        isLoggedIn: false,
      }
      this._render(props);
    })
  }
  // метод, обновляющий хедер при перезагрузке страницы
  headerStateReload() {
    const token = localStorage.getItem('token');
    if(!token) {
      const props = {
        isLoggedIn: false,
      }
      this._render(props);
    } else {
      this._getUserData();
    }


  }
  // метод, сбрасыващий авторизацию текущего пользователя
  userExit() {
    localStorage.removeItem('token');
    document.location.reload();
  }
  // метод, отвечающий за рендеринг мобильного меню
  setMobileMenu() {
    this.header.forEach(elem => {
      const headerIcons = elem.querySelectorAll('.header__icon');
      const headerNavs = elem.querySelectorAll('.header__nav');
      headerIcons.forEach((elem) => {
        const bars1 = elem.querySelectorAll('.header__bar1');
        const bars2 = elem.querySelectorAll('.header__bar2');
        bars1.forEach((elem) => {
          elem.classList.toggle('header__bar1_change');
        });
        bars2.forEach((elem) => {
          elem.classList.toggle('header__bar2_change');
        });
      })
      headerNavs.forEach((elem) => {
        elem.classList.toggle('header__nav_opened');
      })
      elem.classList.toggle('header_theme_dark');
    });
  }
}
