import "../src/styles/style.css";

// импорт модулей
import MainApi from './js/api/MainApi.js';
import NewsCard from './js/components/NewsCard.js';
import NewsCardList from './js/components/NewsCardList.js';
import Popup from './js/components/Popup.js';

// кнопки
const headerButton = document.querySelector('.header__button');
const headerIcon = document.querySelector('.header__icon');
const leadButton = document.querySelector('.lead__button');

//создаем экземпляр класса NewsCardList


const popupAccent = document.querySelector('.popup__accent');

// крестики, закрывающие попапы
const popupCloseEntrance = document.querySelector('.popup__close_entrance');
const popupCloseReg = document.querySelector('.popup__close_reg');


// попапы
const popupEntrance = document.querySelector('.popup_entrance');
const popupReg = document.querySelector('.popup_reg');
const popupRegSuccess = document.querySelector('.popup_reg_success');

// хедер
const headerNav = document.querySelector('.header__nav');

//форма поиска новостей
const leadSearchField = document.querySelector('.lead__search-field');

//контейнер, хранящий карточки
const cardsContainer = document.querySelector('.cards-container');







// создаем экземпляр класса NewsCardList
const newsCardList = new NewsCardList()

//константы, которые потом нужно будет куда-то перенести
//const NEWSAPI_URL = NODE_ENV === 'production' ? 'https://newsapi.org' : 'http://newsapi.org';
// const MAINAPI_URL = NODE_ENV === 'production' ? 'http://newsexplorer.gq' : 'http://localhost:3000';

// временное решение
const NEWSAPI_URL = 'http://newsapi.org';
const MAINAPI_URL = 'http://localhost:3000';

// объект для передачи классу NewsApi
const newsOptions = {
  url: `${NEWSAPI_URL}/v2/everything?country=ru&apiKey=11cb7338dad341b59a1be96b1daf9731`
  // 'q=Apple&' +
  // 'from=2020-10-17&' +
  // 'sortBy=popularity&';`
}

// объект для передачи классу MainApi
const mainOptions = {
  url: `${MAINAPI_URL}`
}

//создаем экземпляр класса mainApi
const mainApi = new MainApi(mainOptions);

//создаем экземпляр класса NewsCard
const newsCard = new NewsCard(cardsContainer, mainApi);

// создаем функцию createNewArticle для передачи классу NewsCardList (нужно перенести в папку utils)
function createNewArticle(someSourse, link, someDate, someTitle, someText,  someContent) {
  // const cards = new Card(placesList, popupCard, api);
  return newsCard.templateForApi(someSourse, link, someDate, someTitle, someText,  someContent);
}



// создаем экземпляр класса Popup для попапа входа
const eventPopupEntrance = new Popup (popupEntrance, headerButton, popupCloseEntrance);
eventPopupEntrance.eventListeners();

// создаем экземпляр класса Popup для попапа регистрации
const eventPopupReg = new Popup (popupReg, popupAccent, popupCloseReg);
eventPopupReg.eventListeners();