let bodyTable = document.getElementById("bodyTable");

let loopAnArray = (someArray) => {
    for (const property of someArray) {
        bodyTable.innerHTML +=  `<tr><td>${property._id}</td><td>${property.movieName}</td><td>${property.date}</td><td>${property.rating}</td><td>${property.linkToMovie}</td><td>${property.image}</td><td>${property.synopsis}</td></tr>`;
    }
}


let baseUrl = 'https://moviesmern.herokuapp.com/movies/all';

let getDataFromApi = (url) => {
    return new Promise ((resolve,reject) => {
        fetch(url)
        .then(res => res.json())
         .then(res => res.data.length > 0 ? resolve(res.data) : reject({message: "There are No Data"}));
    }) 
}

let getData = async () => {
    try{
        gifLoader()
        return await getDataFromApi(baseUrl)
    }
    catch(err){
        return err;
    }
}

getData()
 .then(data => loopAnArray(data))
  .catch(err => console.log(err))
   .finally(() => {hideGifLoader()});


function gifLoader(){
    bodyTable.innerHTML += `<img id="loader" src="/Pictures/4q43.gif">`
}  

function hideGifLoader(){
    loader.style.display = "none"
}  




