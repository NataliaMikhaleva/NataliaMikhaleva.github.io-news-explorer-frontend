import "../src/styles/style.css";
const { NODE_ENV } = process.env;

// импорт модулей
import MainApi from './js/api/MainApi.js';
import NewsApi from "./js/api/NewsApi";
import Form from "./js/components/Form";
import Header from "./js/components/Header";
import NewsCard from './js/components/NewsCard.js';
import NewsCardList from './js/components/NewsCardList.js';
import Popup from './js/components/Popup.js';
import PopupFromPopup from './js/components/PopupFromPopup.js';
//import SavedCards from './js/components/SavedCards';

// кнопки
const headerButton = document.querySelector('.header__button');
const headerIcon = document.querySelectorAll('.header__icon');
const leadButton = document.querySelector('.lead__button');
const popupButtonReg = document.querySelector('.popup__button_reg');
const popupButtonEntrance = document.querySelector('.popup__button_entrance');
const headerButtonLoggedIn = document.querySelector('.header__button_loggedIn');
const articleCardBookmark = document.querySelector('.article-card__bookmark');

//спаны для входа в попапы входа и авторизации
const popupAccent = document.querySelector('.popup__accent');
const popupAccentReg = document.querySelector('.popup__accent_reg');
const popupAccentSuccess = document.querySelector('.popup__accent_success');

// крестики, закрывающие попапы
const popupCloseEntrance = document.querySelector('.popup__close_entrance');
const popupCloseReg = document.querySelector('.popup__close_reg');
const popupCloseSuccess = document.querySelector('.popup__close_success');


// попапы
const popupEntrance = document.querySelector('.popup_entrance');
const popupReg = document.querySelector('.popup_reg');
const popupRegSuccess = document.querySelector('.popup_reg_success');

// формы
const authorization = document.forms.authorization;
const registration = document.forms.registration;
const searchNews =  document.forms.searchnews;

// хедеры (для авторизованного и неавторизованного пользователя, и все хедеры)
const headerNotLoggedIn = document.querySelector('.header_notLoggedIn');
const headerLoggedIn = document.querySelector('.header_loggedIn');
const headers = document.querySelectorAll('.header');

//форма поиска новостей
const leadSearchField = document.querySelector('.lead__search-field');

//контейнер, хранящий карточки
const cardsContainer = document.querySelector('.cards-container');

//секция результата поиска на главной странице
const searchRezults = document.querySelector('.search-results');

//лоудер
const loader = document.querySelector('.preloader');

// блок отсутствия новостей
const noRezults = document.querySelector('.no-results');



//константы
const NEWSAPI_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co/news' : 'http://newsapi.org';
const MAINAPI_URL = NODE_ENV === 'production' ? 'https://newsexplorer.gq' : 'http://localhost:3000';

// объект для передачи классу NewsApi
const newsOptions = {
  url: `${NEWSAPI_URL}`
}

// объект для передачи классу MainApi
const mainOptions = {
  url: `${MAINAPI_URL}`
}

//создаем экземпляр класса NewsApi для передачи классу NewsCardList
const newsApi = new NewsApi(newsOptions);

//создаем экземпляр класса mainApi для передачи классу Popup
const mainApi = new MainApi(mainOptions);


//создаем экземпляр класса NewsCard
const newsCard = new NewsCard(cardsContainer, mainApi);

// создаем функцию createNewArticle для передачи классу NewsCardList (нужно перенести в папку utils)
function createNewArticle(someId, someSourse, link, someDate, someTitle, someText,  someContent, someKeyword) {
  // const cards = new Card(placesList, popupCard, api);
  return newsCard.templateForApi(someId, someSourse, link, someDate, someTitle, someText,  someContent, someKeyword);
}

// создаем экземпляр класса NewsCardList
const newsCardList = new NewsCardList(cardsContainer, searchNews, searchRezults, loader, noRezults, newsApi, createNewArticle);
//newsCardList.renderResults();

// создаем экземпляр класса SavedCards
//const savedCards = new SavedCards(mainApi);


// создаем экземпляр класса Popup для попапа входа
const eventPopupEntrance = new Popup (popupEntrance, headerButton, popupCloseEntrance);
eventPopupEntrance.eventListeners();

// создаем экземпляр класса Popup для попапа успешной регистрации
const eventPopupRegSuccess = new Popup (popupRegSuccess, popupButtonReg, popupCloseSuccess, mainApi, registration, popupReg);
eventPopupRegSuccess.eventListenerForPopupSuccess();

// создаем экземпляр класса Popup для попапа регистрации
// const eventPopupReg = new Popup (popupReg, popupAccent, popupCloseReg);
// eventPopupReg.eventListeners();

// создаем экземпляр класса PopupFromPopup для открытия попапа входа из попапа регистрации
const popupEntranceFromReg = new PopupFromPopup (popupEntrance, popupAccentReg, popupCloseEntrance, popupReg);
popupEntranceFromReg.eventListeners();

// создаем экземпляр класса PopupFromPopup для открытия попапа регистрации из попапа входа
const popupRedFronEntrance = new PopupFromPopup (popupReg, popupAccent, popupCloseReg, popupEntrance);
popupRedFronEntrance.eventListeners();

// создаем экземпляр класса PopupFromPopup для открытия попапа входа из попапа успешной регистрации
const popupEntranceFromSuccessReg = new PopupFromPopup (popupEntrance, popupAccentSuccess, popupCloseEntrance, popupRegSuccess);
popupEntranceFromSuccessReg.eventListeners();


// создаем функцию закрытия попапа для передачи в класс Header
function popupIsClosed() {
  popupEntranceFromSuccessReg.close();
}

//создаем экземпляр класса Header
const header = new Header(mainApi, popupEntrance, authorization, popupIsClosed, headerNotLoggedIn, headerLoggedIn, headers);
// вызываем метод headerStateReload() для отрисовки необходимого хедера при перезагрузке страницы
header.headerStateReload();

// создаем экземпляp класса Form для формы входа
const authorizationForm = new Form (authorization);
authorizationForm.setEventListeners();

// создаем экземпляp класса Form для формы регистрации
const registrationForm = new Form (registration);
registrationForm.setEventListeners();

//вешаем слушатели
authorization.addEventListener('submit', header.updateHeaderAuth);
searchNews.addEventListener('submit', newsCardList.renderResults);
headerButtonLoggedIn.addEventListener('click', header.userExit);
headerIcon.forEach((elem) => {
  elem.addEventListener('click', header.setMobileMenu);
})

//articleCardBookmark.addEventListener('click', savedCards.saveCard);