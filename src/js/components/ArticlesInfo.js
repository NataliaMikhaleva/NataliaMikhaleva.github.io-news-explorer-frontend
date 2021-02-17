export default class ArticlesInfo {
  constructor(api, subtitle, text) {
    this.api = api;
    this.subtitle = subtitle;
    this.text = text;

    // this.getUserName = this.getUserName.bind(this);
    // this.getArticlesAmount = this.getArticlesAmount.bind(this);
    // this.setArticlesInfo = this.setArticlesInfo.bind(this);
  }
  //получаем имя пользователя и отображаем на странице
  getUserName() {
    const userName = undefined;
    this.api.getUserData().then((res) => {
      const userName = res.data.name;
      this.subtitle.querySelector('.lead__username').textContent = userName;
    })
  }
  //получаем количество статей и отображаем на странице
  getArticlesAmount() {
    this.api.getArticles().then((res) => {
      const articlesAmount = res.data.length;
      this.subtitle.querySelector('.lead__articles').textContent = articlesAmount;
    })
  }
  // достаем ключевые слова и отображаем на странице
  getKeywords() {
    this.api.getArticles().then((res) => {
     const cardsArray = res.data;
     const keywords = cardsArray.map((elem) => {
       return elem.keyword;
     })
     const keywordsAmount = keywords.reduce(function (acc, curr) {
       if (typeof acc[curr] == 'undefined') { acc[curr] = 1; }
         else { acc[curr] += 1; }
         return acc; }, {});

     const keywordsArr = Object.keys(keywordsAmount).sort(function(a,b){return keywordsAmount[a]-keywordsAmount[b]});

     this._setKeywordsInfo(keywordsArr);
    })
    .catch((err) => {
      alert(err);
    })
  }
  _setKeywordsInfo(arr) {
    const leadKeywordFirst = this.text.querySelector('.lead__keyword_first');
    const leadKeywordSecond = this.text.querySelector('.lead__keyword_second');
    const leadInt = this.text.querySelector('.lead__int');
    if(arr.length === 0) {
      this.text.style.display = 'none';
      return
    }
    else if(arr.length === 1) {
      this.text.textContent = `По ключевым словам: ${arr[0]}`;
      return
    }
    else if(arr.length === 2) {
      this.text.textContent = `По ключевым словам: ${arr[1]}, ${arr[0]}`;
      return
    }
    else {
      leadKeywordFirst.textContent = arr[arr.length-1];
      leadKeywordSecond.textContent = arr[arr.length-2];
      leadInt.textContent = arr.length-2;
      return
    }
  }
}