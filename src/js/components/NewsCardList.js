export default class NewsCardList {
  constructor(container, sectionResults, loader, noResults, showMoreButton, newsApi, someForm, createNewArticle) {
    this.container = container;
    this.sectionResults = sectionResults;
    this.loader = loader;
    this.noResults = noResults;
    this.showMoreButton = showMoreButton;
    this.newsApi = newsApi;
    this.someForm = someForm;
    this.createNewArticle = createNewArticle;

    this.showMore = this.showMore.bind(this);
  }

  renderResults() {
    event.preventDefault();
    this.newsApi.getNews(this.someForm.elements.keyword.value).then((res) => {
      const newArticle = this.addCard(res.source, res.urlToImage, res.publishedAt, res.title, res.description, res.content);
      this.container.appendChild(newCard);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  renderLoader() {
    this.sectionResults.appendChild(this.loader);
    this.loader.style.display = flex;
  }
  renderError() {

  }
  showMore() {

  }
  addCard(someSourse, link, someDate, someTitle, someText,  someContent) {
    return this.createNewArticle(someSourse, link, someDate, someTitle, someText,  someContent) ;
  }

  eventListeners() {
    this.showMoreButton.addEventListener('click', this.showMore);
  }
}