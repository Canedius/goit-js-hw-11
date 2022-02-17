import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApi from './components/servise_api';


const loadMoreBtn = document.querySelector('.load-more');
const galleryEL = document.querySelector(".gallery")
const formEl = document.querySelector(".search-form")
const inputEl = document.querySelector(".input")
const newsApi = new NewsApi()

formEl.addEventListener("submit",loadImages)
function loadImages(e) {
 e.preventDefault();
 clearMarkup()
 newsApi.page = 1
 newsApi.pageper_page = 0
 newsApi.query = e.currentTarget.elements.searchQuery.value.trim()
 loadMore()
 newsApi.resetPage()
inputEl.value =""
 
}


function createMarcup(params) {
  if (!params.length) {
  return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  };
  const lightbox = new SimpleLightbox(".gallery a", { close: true }).refresh()
  const markup = renderMarkup(params)
  galleryEL.insertAdjacentHTML('beforeend', markup)
  
  const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
 
  
}

function renderMarkup(params) {
  console.log(params);
  return params.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads })=>{
    return `
    <div class="photo-card">
    <a class ="img-link" href ="${largeImageURL}">
    <img class = "img-card"  src="${webformatURL}" alt="${tags}" height="240" width="360 loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b><br>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b><br>${views}
      </p>
      <p class="info-item">
        <b>Comments</b><br>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b><br>${downloads}
      </p>
    </div>
    </div>`
    
  }).join("")
  
}

function clearMarkup(params) {
  galleryEL.innerHTML = ""
  
}
async function loadMore(params) {
  if (!newsApi.searchQuery) {
    return
  }
  newsApi.fetchArticles().then(createMarcup)
  
}


const observer = new IntersectionObserver(loadMore, {
  root: null,
  rootMargin: '0px',
  threshold: 1,
});
observer.observe(loadMoreBtn);

