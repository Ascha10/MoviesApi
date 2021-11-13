let formInfo = document.getElementById("formInfo");
let movieName = document.getElementById("movieName");
let movieImage = document.getElementById("movieImage");
let movieLink = document.getElementById("movieLink");
let movieSynopsis = document.getElementById("movieSynopsis");
let movieRating = document.getElementById("movieRating");

class Movie{
    constructor(movieName,movieImage,movieLink,movieSynopsis,movieRating){
        this.movieName = movieName;
        this.image = movieImage;
        this.linkToMovie = movieLink;
        this.synopsis = movieSynopsis;
        this.rating = movieRating;
    }
}
let dynamicId = localStorage.getItem('IdToEdit')

function editMovie(someId) {

    movieName.value = localStorage.getItem('MovieName') 
    movieImage.value = localStorage.getItem('MovieImage')
    movieLink.value = localStorage.getItem('MovieLink')
    movieSynopsis.value = localStorage.getItem('MovieDescription')
    movieRating.value = localStorage.getItem('Rating')

    formInfo.addEventListener("submit", (e) => {
        e.preventDefault();

        let movie =  new Movie (movieName.value,movieImage.value,movieLink.value,movieSynopsis.value,movieRating.value)

        let options = {
            method: 'PUT',
            body: JSON.stringify({movie}),
            headers:{
             'Content-Type':'application/json'
            }
        }

        let putUrl = 'https://moviesmern.herokuapp.com/movies/movie'
        let answerForEdit = confirm("Are You Sure About The Changes??");

        
        editDataFromApi = async () => {
            try{
                    return await fetch(`${putUrl}/${someId}`,options)
                    .then(res => res.json())
            }
            catch(err){
                return err;
            }
        }
        
        if (answerForEdit) {                
                editDataFromApi()
                .then(data => console.log(data))
                 .then(localStorage.clear());
        }
    })
} 



if (dynamicId) {
    editMovie(dynamicId);
}else{
    formInfo.addEventListener("submit", (e) => {
        e.preventDefault();
    
        let movie =  new Movie (movieName.value,movieImage.value,movieLink.value,movieSynopsis.value,movieRating.value)
    
        let options = {
            method: 'POST',
            body: JSON.stringify({movie}),
            headers:{
             'Content-Type':'application/json'
            }
        }
        
        let postUrl = 'https://moviesmern.herokuapp.com/movies/saveMovie';                                                 
        
        let sendDataToApi = async () => {
            try{
                return await fetch(postUrl,options)
                 .then(res => res.json())
            }
            catch(err){
                return err;
            }
        }
    
        sendDataToApi()
         .then(data => console.log(data),alert("Yours Movie Added Successfully"));
    })
}    



