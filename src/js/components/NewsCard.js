export default class NewsCard {
  constructor(container, mainApi) {
    this.container = container;
    this.mainApi = mainApi;

    this._remove = this._remove.bind(this);
    this._renderIcon = this._renderIcon.bind(this);
  }

  templateForArray(someSourse, link,  someKeyword, someDate, someTitle, someText,  someContent) {
    const templateString = `<a class='article-card' href="${someSourse}" target="_blank">
    <div class='article-card__main'>
      <img class='article-card__image' src='url(${link})'>
          <button class='article-card__keyword'>${someKeyword}</button>
          <div class='article-card__delete-buttons'>
            <button class="article-card__delete"></button>
        </div>
    </div>
    <p class='article-card__date'>${someDate}</p>
    <p class='article-card__title'>${someTitle}</p>
    <p class='article-card__text'>${someText}</p>
    <p class='article-card__link'>${someContent}</p>
  </a>`;
    let element = document.createElement('div');
    element.insertAdjacentHTML('beforeend', templateString.trim());

    this.cardElementSaved = element.firstChild;

    this.setEventListeners();
    return cardElementSaved;
  }

  templateForApi(someSourse, link, someDate, someTitle, someText,  someContent) {
    const templateString = `<a class='article-card' href="${someSourse}" target="_blank">
    <div class='article-card__main'>
      <img class='article-card__image' src='url(${link})'>
      <button class="article-card__bookmark"></button>
    </div>
    <p class='article-card__date'>${someDate}</p>
    <p class='article-card__title'>${someTitle}</p>
    <p class='article-card__text'>${someText}</p>
    <p class='article-card__link'>${someContent}</p>
  </a>`;
    let element = document.createElement('div');
    element.insertAdjacentHTML('beforeend', templateString.trim());

    this.cardElement = element.firstChild;

    this.setEventListeners();
    return cardElement;
  }

  _renderIcon(event) {
    this.api.createArticle(someKeyword, someTitle, someText, someDate, someSource, someLink, someImage).then(() =>{
      this.cardElement.querySelector('.article-card__bookmark').classList.add('.article-card__bookmark_active');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  setEventListeners() {
    this.cardElementSaved.querySelector('.article-card__delete').addEventListener('click', this._remove);
    this.cardElement.querySelector('.article-card__bookmark').addEventListener('click', this._renderIcon);
  }

  _remove(event) {
    if(window.confirm("Вы действительно хотите удалить эту заметку?")) {
      const article = event.target.closest('.article-card');
      this.mainApi.removeArticle(articleId).then(() => {
        this.container.removeChild(article);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
}