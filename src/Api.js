import axios from "axios"

//const API = " https://pixabay.com/api/";
//const KEY = "33488620-f3c6f5bf900815c11263bf1e8"; 

export default class SearchImages {
    constructor() {
        this.queryPage=1
        this.searchQuery = "";
    }


async  fetchImages () {
    const API_URL = " https://pixabay.com/api/";
    const KEY_URL = "33488620-f3c6f5bf900815c11263bf1e8"; 
    const response = await axios.get(`${API_URL}?key=${KEY_URL}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.queryPage}`
);
this.incrementPage()
return response.data.hits;

}

resetPage()
{
   this.queryPage = 1;
}


    incrementPage()
   {
    this.queryPage += 1 ; 
   }

get query()
{
    return this.searchQuery ;
}
set query(newQuery)
{
    return this.searchQuery=newQuery
}
}