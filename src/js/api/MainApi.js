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
      // credentials: 'include',
      body: JSON.stringify({
        email: someEmail,
        password: somePassword,
        name: someName,
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        //return Promise.reject('Произошла ошибка');
        return json.then(Promise.reject.bind(Promise));
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
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        // return Promise.reject('Произошла ошибка');
         return json.then(Promise.reject.bind(Promise))
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
      });
  }

  getUserData() {
    return fetch (`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
    // return Promise.reject('Произошла ошибка');
    return json.then(Promise.reject.bind(Promise))
    })
  }

  getArticles () {
    return fetch (`${this.baseUrl}/articles`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
    return json.then(Promise.reject.bind(Promise))
    })
  }

  createArticle(someKeyword, someTitle, someText, someDate, someSource, someLink, someImage) {
    return fetch (`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
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
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return json.then(Promise.reject.bind(Promise))
      })

  }

  removeArticle(articleId) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
    }
    return json.then(Promise.reject.bind(Promise))
    })
  }
}