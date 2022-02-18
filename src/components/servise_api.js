import Notiflix from 'notiflix';
export default class ApiService {
  constructor() {
      this.searchQuery = ""   
      this.page = 1
      
  }
  async fetchArticles() {
    const URL = 'https://pixabay.com/api/';

    const options = {
      params: {
        key: '25718125-06c0b5156c0d80be6290ce911',
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page : this.page
      },
    };
    try {
      const axios = require('axios').default
      return axios.get(URL,options).then(res => {
        this.page += 1
        return res.data.hits}).catch(erorr => Notiflix.Notify.info("We're sorry, but you've reached the end of search results."));
    } catch (error) {
      console.error(error);
    }
  }

  resetPage(){
    this.page = 1
  }
  set query (newQuery){
      this.searchQuery = newQuery
      
  }
}

