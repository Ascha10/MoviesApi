let container = document.getElementById("container");

let loopAnObject = (someArray) => {
    for (const property of someArray) {
        container.innerHTML += `
        <article>
          <img src="${property.image}">
          <section id="infoCard">
            <h1>${property.movieName.toUpperCase()}</h1>
            <h2>${property.rating}</h2> 
            <div><button onclick=showDetails('${property._id}')> Learn More</button> <button onclick="currentIdForEdit('${property._id}','${property.movieName}','${property.image}','${property.linkToMovie}','${property.synopsis}','${property.rating}')"><a href="/Movie Operation/movieOperation.html">Edit</a></button> <button onclick="currentIdForDelete('${property._id}')">Delete</button></div>
          </section>
         </article>`
    }
}

let getDataForCards = async () => {
    try{
        gifLoaderToCards()
        return await getDataFromApi(baseUrl)
    }
    catch(err){
        return err;
    }
}

getDataForCards()
 .then(data => loopAnObject(data))
  .catch(err => console.log(err))
   .finally(() => {hideGifLoaderFromCards()});

function gifLoaderToCards(){
    container.innerHTML += `<img id="loader" src="/Pictures/4q43.gif">`
}  

function hideGifLoaderFromCards(){
    loader.style.display = "none"
}     


let sortByRating = (someData) => {
    someData.sort((a,b) => {return b.rating - a.rating});
    return loopAnObject(someData)
}   
let sortByDate = (someData) => {
    someData.sort((a, b) => {
        let dateA = new Date(a.date); 
        let dateB = new Date(b.date); 
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
    });
    return loopAnObject(someData)
}

let sortByAlphabet = (someData) =>{
    someData.sort((a, b) => {
        let nameA = a.movieName.toUpperCase(); 
        let nameB = b.movieName.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
    });
    return loopAnObject(someData);
}


let selected = document.getElementById("selected");
let SearchTheName = document.getElementById("SearchTheName");
let SearchBtn = document.getElementById("SearchBtn");

let basicUrl = 'https://moviesmern.herokuapp.com/movies/all';


SearchBtn.addEventListener("click",() => {

    switch (selected.value) {

        case "movieName":
            container.innerHTML = " ";
            let baseUrlForName = 'https://moviesmern.herokuapp.com/movies/movie/searchByName/';

            let getDataByName = async () => {
                try{
                    return await fetch(`${baseUrlForName}${SearchTheName.value}`)
                    .then(res => res.json())
                }
                catch(err){
                    return err;
                }
            }

            getDataByName()
             .then(res => loopAnObject(res.data))
              .catch(err => console.log(err));
            break;

        case "rating":
            container.innerHTML = " ";

            let sortDataByRating = async () => {
                try{
                    return await fetch(basicUrl)
                    .then(res => res.json())
                }
                catch(err){
                    return err;
                }
            }

            sortDataByRating()
             .then(res => sortByRating(res.data))
              .catch(err => console.log(err));         
            break;

        case "date":
            container.innerHTML = " ";

            let sortDataByDate = async () => {
                try{
                    return await fetch(basicUrl)
                    .then(res => res.json())
                }
                catch(err){
                    return err;
                }
            }

            sortDataByDate()
             .then(res => sortByDate(res.data))
              .catch(err => console.log(err));
            break;

        case "A-Z":
            container.innerHTML = " ";

            let sortAlphabetically = async () => {
                try{
                    return await fetch(basicUrl)
                    .then(res => res.json())
                }
                catch(err){
                    return err;
                }
            }

            sortAlphabetically()
             .then(res => sortByAlphabet(res.data))
              .catch(err => console.log(err));
            break;
    
        default:
            break;
    }

})



function currentIdForDelete(someId) {
        let options = {
            method: 'DELETE'
        }

        let postUrl = 'https://moviesmern.herokuapp.com/movies/movie'

        let answerForDelete = confirm("Are You Sure??");

        deleteDataFromApi = async () => {
            try{
                return await fetch(`${postUrl}/${someId}`,options)
                .then(res => res.json())
            }
            catch(err){
                return err;
            }
        }
        
        if(answerForDelete){
         deleteDataFromApi()
          .then(data => console.log(data))
        //   location.reload()
        }
} 


let url  = 'https://moviesmern.herokuapp.com/movies/movie/'
let containerForDetail = document.getElementById("containerForDetail");

showAllDetails = async (id) => {
    try{
        return await fetch(`${url}${id}`)
         .then(res => res.json())
    }
    catch(err){
        return err;
    }
}



function showDetails(id) {
 containerForDetail.style.display = "flex"
 container.style.filter = "blur(0.1rem)";
 

showAllDetails(id)
 .then(res => containerForDetail.innerHTML =
   `<section id="imagePopUp">
       <img src="${res.data.image}">
    </section>
    <section id="infoPopUp">
       <section onclick="hidePopUp()" id="exitBtn">&times;</section>
       <h1>${res.data.movieName.toUpperCase()}</h1>
       <span> Movie Rating: ${res.data.rating}</span>
       <p> Movie Date: ${res.data.date}</p> 
       <p> Movie Link: ${res.data.linkToMovie}</p> 
       <p> Movie Synopsis: ${res.data.synopsis}</p> 
    </section>`
    ); 
}


function currentIdForEdit(IdForEdit,movieName,movieImage,movieLink,movieDescription,rating) {
    localStorage.setItem('IdToEdit', `${IdForEdit}`)
    localStorage.setItem('MovieName', `${movieName}`)
    localStorage.setItem('MovieImage', `${movieImage}`)
    localStorage.setItem('MovieLink', `${movieLink}`)
    localStorage.setItem('MovieDescription', `${movieDescription}`)
    localStorage.setItem('Rating', `${rating}`)
}

function hidePopUp() {
    containerForDetail.style.display = "none";
    container.style.filter = "blur(0rem)";   
}
