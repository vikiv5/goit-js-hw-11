
import Notiflix from 'notiflix';
//import simpleLightbox from 'simplelightbox';

import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

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

if (newSearch.length === 0) {
  Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  loadMoreBtn.hide();
}

else if (newSearch.length  < 40) {
  createMarkup(newSearch.data);
  loadMoreBtn.hide();
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
}
 else {
  createMarkup(newSearch)
  loadMoreBtn.enable();
 }

}


    catch (err) {
        onError(err)
        console.log(err)
    }
    finally{
        form.reset()
    }
 }

 

function createMarkup(hits){

    const markup = hits.map(hit =>
      //({webformatURL,
        //largeImageURL,
        //tags,
        //likes,
        //views,
       //comments,
       // downloads}) =>
 `<div class="photo-card">
 <a class = "gallery-item" href = "${hit.largeImageURL}">
 <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes <br>${hit.likes}</b>
    </p>
    <p class="info-item">
      <b> Views <br>${hit.views}</b>
    </p>
    <p class="info-item">
      <b>Comments <br>${hit.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads<br>${hit.downloads}</b>
    </p>
  </div>
</div> `) 
.join("");
galleryImg.insertAdjacentHTML("beforeend", markup)
//gallery.refresh()
} 

function onError (err) {
  console.log(err);
    clearImgList()
Notiflix.Notify.failure ("Sorry, there are no images matching your search query. Please try again.")
 }

function clearImgList(){
    galleryImg.innerHTML = "";
}

const gallery = new SimpleLightbox (".gallery a ",
{captions:true,
captionsData: "alt",
captionDelay:250 ,})
