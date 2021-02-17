export default class NewsCardList {
  constructor(container, someForm, sectionResults, loader, noResults, newsApi, createNewArticle) {
    this.container = container;
    this.someForm = someForm;
    this.sectionResults = sectionResults;
    this.loader = loader;
    this.noResults = noResults;

    this.newsApi = newsApi;

    this.createNewArticle = createNewArticle;

    this.showMore = this.showMore.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.addCard = this.addCard.bind(this);

    // this.cardsArray = this.container.querySelectorAll('.article-card');
    this.articlesArray = [];
    this.keyword = '';

  }

  _saveRequestResult(articles, key) {
    this.articlesArray = articles;
    this.keyword = key;

  }
  _returnRequestResults() {
    return this.articlesArray;
  }
  _returnKeyword() {
    return this.keyword;
  }
  _returnDate(str) {
    let year = str.slice(0, 4);
    let month = str.slice(5, 7);


    switch (month) {
      case '01':
        month = 'Января'
        break;
      case '02':
        month = 'Февраля'
        break;
      case '03':
        month = 'Марта'
        break;
      case '04':
        month = 'Апреля'
        break;
      case '05':
        month = 'Мая'
        break;
      case '06':
        month = 'Июня'
        break;
      case '07':
        month = 'Июля'
        break;
      case '08':
        month = 'Августа'
        break;
      case '09':
        month = 'Сентября'
        break;
      case '10':
        month = 'Октября'
        break;
      case '11':
        month = 'Ноября'
        break;
      case '12':
        month = 'Декабря'
        break;
    }

    let day = str.slice(8, 10);
    if (Number(day) < 10) {
      day = day.slice(1);
    }

    return `${day} ${month}, ${year}`;

  }
  // метод для отрисовки результатов при клике на кноку "искать"
  renderResults() {
    event.preventDefault();
    const cardsArray = this.container.querySelectorAll('.article-card');
    if (cardsArray !== null) {
      cardsArray.forEach((elem) => {
        this.container.removeChild(elem);
      })
    }

    this.loader.style.display = 'flex';
    const keyword = this.someForm.keyword.value;


    this.newsApi.getNews(keyword).then((res) => {
      const articlesArray = res.articles;
      this._saveRequestResult(articlesArray, keyword);
      if (articlesArray.length <= 3) {
        this.sectionResults.querySelector('.search-results__button').style.display = 'none';
      } else {
        this.sectionResults.querySelector('.search-results__button').style.display = 'block';
      }

      if (articlesArray.length === 0) {
        this.noResults.style.display = 'flex';
        this.loader.style.display = 'none';
        return
      }
      this.noResults.style.display = 'none';

      // articlesArray.forEach((article) => {
      //   const newarticle = this.addCard(article._id, article.url, article.urlToImage, article.publishedAt, article.title, article.description, article.source.name, keyword);
      //   if(article.urlToImage === 'null') {
      //     article.urlToImage = 'https://cdn.pixabay.com/photo/2020/11/14/17/50/night-sky-5742416_960_720.jpg';
      //   }

      //   this.container.appendChild(newarticle);

      // })
      for (let i = 0; i < 3 && i < articlesArray.length; i++) {
        const article = articlesArray[i];
        let date = this._returnDate(article.publishedAt);
        // date.setDate(article.publishedAt);

        const newarticle = this.addCard(article._id, article.url, article.urlToImage, date, article.title, article.description, article.source.name, keyword);
        if (article.urlToImage === 'null') {
          article.urlToImage = 'https://cdn.pixabay.com/photo/2020/11/14/17/50/night-sky-5742416_960_720.jpg';
        }

        this.container.appendChild(newarticle);
      }

      this.loader.style.display = 'none';
      this.sectionResults.style.display = 'flex';
    })
      .catch((err) => {
        this.renderError(err);

      })
  }

  renderLoader() {
    this.sectionResults.appendChild(this.loader);
    this.loader.style.display = flex;
  }
  // метод, показывающий пользователю пришедшие с бэка ошибки
  renderError(err) {
    alert(err.message);
  }
  showMore() {
    const articlesArray = this._returnRequestResults();
    const cardsArray = this.container.querySelectorAll('.article-card');

    for (let i = cardsArray.length; i < cardsArray.length + 3 && i < articlesArray.length; i++) {
      if (i === articlesArray.length - 1) {
        this.sectionResults.querySelector('.search-results__button').style.display = 'none';
      }
      const article = articlesArray[i];
      const keyword = this._returnKeyword();
      let date = this._returnDate(article.publishedAt);
      const newarticle = this.addCard(article._id, article.url, article.urlToImage, date, article.title, article.description, article.source.name, keyword);
      if (article.urlToImage === 'null') {
        article.urlToImage = 'https://cdn.pixabay.com/photo/2020/11/14/17/50/night-sky-5742416_960_720.jpg';
      }

      this.container.appendChild(newarticle);
    }
    // кнопку находим через sectionResults


  }
  addCard(someId, someSourse, link, someDate, someTitle, someText, someContent, someKeyword) {
    return this.createNewArticle(someId, someSourse, link, someDate, someTitle, someText, someContent, someKeyword);
  }


  eventListeners() {
    this.showMoreButton.addEventListener('click', this.showMore);
  }
}