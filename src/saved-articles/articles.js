import "../styles/style.css";
const { NODE_ENV } = process.env;

// импорт модулей
import SavedCards from '../js/components/SavedCards';
import NewsCard from '../js/components/NewsCard';
import MainApi from '../js/api/MainApi';
import SavedArticlesHeader from '../js/components/SavedArticlesHeader';
import  ArticlesInfo from '../js/components/ArticlesInfo';


// переменные
const cardsContainer = document.querySelector('.cards-container');
const header = document.querySelector('.header');
const headerButton = document.querySelector('.header__button');
const leadContentSubtitle = document.querySelector('.lead__content-subtitle');
const leadText = document.querySelector('.lead__text');

//константы, которые потом нужно будет куда-то перенести
const MAINAPI_URL = NODE_ENV === 'production' ? 'https://newsexplorer.gq' : 'http://localhost:3000';

// объект для передачи классу MainApi
const mainOptions = {
  url: `${MAINAPI_URL}`
}

// экземпляры классов
const mainApi = new MainApi(mainOptions);
const newsCard = new NewsCard(cardsContainer, mainApi);

// создаем функцию createSavedCards для передачи классу NewsCard
function createSavedCards(someId, someSourse, link, someKeyword, someDate, someTitle, someText, someContent) {
  return newsCard.templateForArray(someId, someSourse, link, someKeyword, someDate, someTitle, someText, someContent);
}

//создаем экземляр класса SavedCards
const savedArticles = new SavedCards(mainApi, createSavedCards, cardsContainer);
savedArticles.renderSavedCards();

// создаем экземпляр класса SavedArticlesHeader
const savedArticlesHeader = new SavedArticlesHeader(mainApi, header);
savedArticlesHeader.getUserData();

//создаем экзепляр класса ArticlesInfo
const articlesInfo = new ArticlesInfo(mainApi, leadContentSubtitle, leadText);
 articlesInfo.getUserName();
 articlesInfo.getArticlesAmount();
articlesInfo.getKeywords();

// вешаем слушатели
headerButton.addEventListener('click', savedArticlesHeader.userExit);