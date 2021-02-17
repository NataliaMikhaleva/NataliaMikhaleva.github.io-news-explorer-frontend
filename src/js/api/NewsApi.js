export default class NewsApi {
  constructor(options) {
    this.baseUrl = options.url;
  }
  getNews(keyword) {
    let date = new Date();
    date.setDate(date.getDate() - 7);

    let curr_date = date.getDate();
    if(Number(curr_date) < 10) {
      curr_date = "0" + curr_date;
    }

    let curr_month = date.getMonth() + 1;
    if(Number(curr_month) < 10) {
      curr_month = "0" + curr_month;
    }
    let curr_year = date.getFullYear();
    let formatedDate = curr_year + "-" + curr_month + "-" + curr_date;

    return fetch(`${this.baseUrl}/v2/everything?q=${keyword}&from=${formatedDate}&apiKey=11cb7338dad341b59a1be96b1daf9731&pageSize=100`)
      .then(res => {
         if(res.ok) {
           return res.json();
        }
    const json = res.json();
    return json.then(Promise.reject.bind(Promise));
    })
  }
}