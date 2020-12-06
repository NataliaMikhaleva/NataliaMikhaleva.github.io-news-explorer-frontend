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

  }
// метод для отрисовки результатов при клике на кноку "искать"
  renderResults() {
    event.preventDefault();
    this.loader.style.display = 'flex';
    const keyword = this.someForm.keyword.value;
    this.newsApi.getNews(keyword).then((res) => {
      const articlesArray = res.articles;
     console.log(articlesArray);
     if(articlesArray.length === 0) {
      this.noResults.style.display = 'flex';
      this.loader.style.display = 'none';
      return
     }
     this.noResults.style.display = 'none';
      articlesArray.forEach((article) => {
        const newarticle = this.addCard(article._id, article.url, article.urlToImage, article.publishedAt, article.title, article.description, article.source.name, keyword);
        if(article.urlToImage === 'null') {
          article.urlToImage = 'https://cdn.pixabay.com/photo/2020/11/14/17/50/night-sky-5742416_960_720.jpg';
        }

        this.container.appendChild(newarticle);

      })
      this.loader.style.display = 'none';
      this.sectionResults.style.display = 'flex';
    })
    .catch((err) => {
      renderError(err);

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
// кнопку находим через sectionResults
  }
  addCard(someId, someSourse, link, someDate, someTitle, someText, someContent, someKeyword) {
    return this.createNewArticle(someId, someSourse, link, someDate, someTitle, someText, someContent, someKeyword) ;
  }


  eventListeners() {
    this.showMoreButton.addEventListener('click', this.showMore);
  }
}