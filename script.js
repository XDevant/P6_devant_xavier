// Modal
let modal = document.getElementsByClassName("modal")[0];
let images = document.getElementsByTagName("img");
let span = document.getElementsByClassName("close")[0];



// When the user clicks on a movie picture, open the modal
for (let i=0; i<images.length; i++){
    images[i].onclick = (event) => {
        modal.style.display = "block";
        load_data(event);
      }
}

let load_data = async (event) => {
    data = await fetchBests(event.target.name)
    let title = modal.getElementsByTagName("h3")[0];
    title.innerText = data.title
}

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  modal.style.display = "none";

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



// Fetch n-bests movies
let fetchBests = async (url) => {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    } else {
        return response.json()
    }
}

let loadBests = async () => {
    let baseUrl = "http://localhost:8000/api/v1/titles";
    let url = baseUrl + "?imdb_score_min=8&sort_by=-imdb_score";
    response = await fetchBests(url);
    bestMovie = response.results[0]
    document.getElementsByClassName("best title")[0].innerHTML = bestMovie.title;
    data = await fetchBests(bestMovie.url);
    document.getElementsByClassName("best description")[0].innerHTML = data.description;
    for (let i=0; i<5; i++) {
        image = document.getElementsByTagName("img")[i];
        image.src = response.results[i].image_url;
        image.name = response.results[i].url;
    }
}


loadBests()

/* let myBlob = await response.blob();
let objectURL = URL.createObjectURL(myBlob);
let image = document.createElement('img');
document.body.appendChild(image);
    } catch(e) {
*/