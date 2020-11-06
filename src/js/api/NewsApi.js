export default class NewsApi {
  constructor(options) {
    this.baseUrl = options.url;
  }
  getNews(keyword) {
    return fetch(`${this.baseUrl}/v2/everything?q=${keyword}&apiKey=11cb7338dad341b59a1be96b1daf9731&pageSize=100`)
  .then(res => {
    if(res.ok) {
      return res.json();
    }
  return Promise.reject('Произошла ошибка');
})
  }
}