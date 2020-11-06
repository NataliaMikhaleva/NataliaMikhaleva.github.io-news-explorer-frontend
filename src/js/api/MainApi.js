export default class MainApi {
  constructor(options) {
      this.baseUrl = options.url;
    }

  signup(someEmail, someName, somePassword) {
    return fetch (`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: someEmail,
        password: somePassword,
        name: someName,
      })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Произошла ошибка');
      })
    })
  }

  signin(someEmail, somePassword) {
    return fetch (`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: someEmail,
        password: somePassword,
      })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Произошла ошибка');
      })
    })
  }

  getUserData() {
    return fetch (`${this.baseUrl}/users/me`)
    .then(res => {
      if(res.ok) {
        return res.json();
      }
    return Promise.reject('Произошла ошибка');
    })
  }

  getArticles () {
    return fetch (`${this.baseUrl}/articles`)
    .then(res => {
      if(res.ok) {
        return res.json();
      }
    return Promise.reject('Произошла ошибка');
    })
  }

  createArticle(someKeyword, someTitle, someText, someDate, someSource, someLink, someImage) {
    return fetch (`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        // authorization: '5f964995-7da7-4204-b259-11a4aa038056',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keyword: someKeyword,
        title: someTitle,
        text: someText,
        date: someDate,
        source: someSource,
        link: someLink,
        image: someImage
      })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Произошла ошибка');
      })
    })
  }

  removeArticle(articleId) {
    return fetch(`${this.baseUrl}/cards/${articleId}`, {
      method: 'DELETE',
      headers: {
        // authorization: '5f964995-7da7-4204-b259-11a4aa038056',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
    }
    return Promise.reject('Произошла ошибка');
    })
  }
}