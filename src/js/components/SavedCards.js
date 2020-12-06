//import NewsCardList from './NewsCardList';

export default class SavedCards {
  constructor(api, createSavedCards, container) {
    this.api = api;
    this.createSavedCards = createSavedCards;
    this.container = container;

    this.addCard = this.addCard.bind(this);
    this.createSavedCards = this.createSavedCards.bind(this);
  }
  // метод отрисовывающий карточки на странице сохраненных статей
  renderSavedCards() {
    this.api.getArticles().then((res) => {
      const articlesArray = res.data;
      articlesArray.forEach((article) => {
        const newArticle = this.addCard(article._id, article.link, article.image, article.keyword, article.date, article.title, article.text, article.source);
        if(article.image === 'null') {
          newArticle.querrySelector('.article-card__image').setAttribute('src', 'https://cdn.pixabay.com/photo/2020/11/14/17/50/night-sky-5742416_960_720.jpg');

        }

        this.container.appendChild(newArticle);

      })
    })
    .catch((err) => {
      alert(err.message);
    })
  }
  addCard(someId, someSourse, link, someKeyword, someDate, someTitle, someText, someContent) {
    return this.createSavedCards(someId, someSourse, link, someKeyword, someDate, someTitle, someText, someContent) ;
  }
}