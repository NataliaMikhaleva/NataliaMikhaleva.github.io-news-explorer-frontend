export default class NewsCard {
  constructor(container, mainApi) {
    this.container = container;
    this.mainApi = mainApi;

    this._remove = this._remove.bind(this);
    this._renderIcon = this._renderIcon.bind(this);
    this.templateForArray = this.templateForArray.bind(this);
    this.templateForApi = this.templateForApi.bind(this);

  }
// шаблон карточки, котораая д.б. создана из массива карточек, хранящихся в базе данных, на странице "сохраненые статьи"
  templateForArray(someId, someSourse, link, someKeyword, someDate, someTitle, someText, someContent) {
    const templateString = `<div id="${someId}" class='article-card'><a class='article-card__link' href="${someSourse}" target="_blank"></a>
    <div class='article-card__main'>
      <img class='article-card__image' src='${link}'>
          <button class='article-card__keyword'>${someKeyword}</button>
          <div class='article-card__delete-buttons'>
            <button class="article-card__delete"></button>
        </div>
    </div>
    <p class='article-card__date'>${someDate}</p>
    <p class='article-card__title'>${someTitle}</p>
    <p class='article-card__text'>${someText}</p>
    <p class='article-card__source'>${someContent}</p>
  </div>`;
    const element = document.createElement('div');
    element.insertAdjacentHTML('beforeend', templateString.trim());

    this.cardElementSaved = element.firstChild;

    this.setEventListenersForSavedArticle();
    return this.cardElementSaved;
  }
// шаблон карточки, которая д.б. создана при запросе на newsApi с главной страницы
  templateForApi(someId, someSourse, link, someDate, someTitle, someText, someContent, someKeyword) {
    const templateString = `<div id="${someId}" class='article-card'><a class='article-card__link' href="${someSourse}" target="_blank"></a>
    <div class='article-card__main'>
      <img class='article-card__image' src='${link}' alt='картинка статьи'>
      <button class='article-card__keyword' style='display: none'>${someKeyword}</button>
      <button class="article-card__notLoggedIn">Войдите, чтобы сохранять статьи</button>
      <button class="article-card__bookmark"></button>
    </div>
    <p class='article-card__date'>${someDate}</p>
    <p class='article-card__title'>${someTitle}</p>
    <p class='article-card__text'>${someText}</p>
    <p class='article-card__source'>${someContent}</p>
  </div>`;
    const element = document.createElement('div');
    element.insertAdjacentHTML('beforeend', templateString.trim());

    this.cardElement = element.firstChild;

    this.setEventListenersForArticle();
    return this.cardElement;
  }
// метод отрисовки состояния иконки статьи для страницы "сохраненные статьи"
  _renderIcon() {
    const token = localStorage.getItem('token');
    if(!token) {
      event.target.previousElementSibling.style.display = 'block';
      return
    } else {
      const card = event.target.closest('.article-card');
      const someKeyword = card.querySelector('.article-card__keyword').textContent;
      const someTitle = card.querySelector('.article-card__title').textContent;
      const someText = card.querySelector('.article-card__text').textContent;
      const someDate = card.querySelector('.article-card__date').textContent;
      const someSource = card.querySelector('.article-card__source').textContent;
      const someLink = card.querySelector('.article-card__link').getAttribute('href');
      const someImage = card.querySelector('.article-card__image').getAttribute('src');


      this.mainApi.createArticle(someKeyword, someTitle, someText, someDate, someSource, someLink, someImage).then((res) => {
        card.querySelector('.article-card__bookmark').classList.add('article-card__bookmark_active');
      })
      .catch((err) => {
        alert(err.message);
      });
    }

  }
// вешаем слушатели на карточку на главной странице
  setEventListenersForArticle() {
    this.cardElement.querySelector('.article-card__bookmark').addEventListener('click', this._renderIcon);
  }

// вешаем слушатели на сохраненную карточку
setEventListenersForSavedArticle() {
  this.cardElementSaved.querySelector('.article-card__delete').addEventListener('click', this._remove);
}
// метод для удаления заметки для страницы "сохраненные статьи"
  _remove() {
    if(window.confirm("Вы действительно хотите удалить эту заметку?")) {
      const article = event.target.closest('.article-card');
      this.mainApi.removeArticle(article.id).then(() => {
        this.container.removeChild(article);
      })
      .catch((err) => {
        alert(err.message);
      })
    }
  }
}