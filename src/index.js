
import Notiflix from 'notiflix';

//import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
//import "simplelightbox/dist/simple-lightbox.min.css";

import SearchImages from './Api';
import LoadMoreBtn from './loadMoreBtn' ; 

 const form = document.querySelector (".search-form");
 const galleryImg = document.querySelector ( ".gallery");

 //const submitBtn = document.querySelector (".submit-button");


 const loadMoreBtn = new LoadMoreBtn({
    selector: "#loadMoreBtn",
    isHidden : true,

 });

 const searchImages = new SearchImages ();

 form.addEventListener ( "submit" , onSubmit);
 loadMoreBtn.button.addEventListener("click", onLoadBtnClick)


 function onSubmit (e){
    e.preventDefault();
    const form = e.currentTarget ;
    searchImages.searchQuery=form.elements.searchQuery.value.trim(); 
    clearImgList();
    searchImages.resetPage();
    loadMoreBtn.show ();
    onLoadBtnClick()
 }

 async function onLoadBtnClick() {
    loadMoreBtn.disable();
    try {
        const newSearch = await searchImages.fetchImages()

        if (newSearch.data.hits.length === 0 ) {
            Notiflix.Notify.failure ("Sorry, there are no images matching your search query. Please try again.")
            loadMoreBtn.hide();
        }
        else if  (newSearch.data.hits.length < 40 ) {
            createMarkup(newSearch.data);
            Notiflix.Notify.failure ("We're sorry, but you've reached the end of search results.")
            loadMoreBtn.hide();
        }
else {
    createMarkup (newSearch.data)
    loadMoreBtn.enable();
Notiflix.Notify( "Hooray! We found totalHits images ")
}
}

    catch (err) {
        onError(err)
    }
    finally{
        form.reset()
    }
 }

 

function createMarkup({hits}){

    const markup = hits.map(({webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
       comments,
        downloads}) =>
 `<div class="photo-card">

 <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div> `) 
.join("");
galleryImg.insertAdjacentHTML("beforeend", markup)
gallery.refresh()
} 

function onError (err) {
    clearImgList()
Notiflix.Notify.failure ("Sorry, there are no images matching your search query. Please try again.")
 }

function clearImgList(){
    galleryImg.innerHTML = "";
}
