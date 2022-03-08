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

// Fills modal list
let load_data = async (event) => {
    data = await fetchBests(event.target.name)
    let title = modal.getElementsByTagName("h3")[0];
    title.innerText = data.title
    let image = modal.getElementsByTagName("img")[0];
    image.src = data.image_url;
    let rows = modal.getElementsByTagName("li");
    rows[0].innerText = `Genre : ${data.genres[0]}`;
    rows[1].innerText = `Date de sortie : ${data.date_published}`;
    rows[2].innerText = `Evaluation : ${data.rated}`;
    rows[3].innerText = `Score IMDB : ${data.imdb_score}`;
    rows[4].innerText = `Réalisateur : ${data.directors[0]}`;
    rows[5].innerText = `Acteurs : ${data.actors[0]}`;
    rows[6].innerText = `Durée : ${data.duration}mn`;
    rows[7].innerText = `Pays d'origine : ${data.countries[0]}`;
    rows[8].innerText = `Box-office : ${data.directors}`;
    rows[9].innerText = `Résumé : ${data.long_description}`;
}

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
modal.onclick = (event) => {
    modal.style.display = "none";
}

// Fetch n-bests movies
let baseUrl = "http://localhost:8000/api/v1/titles";

let fetchData = async (url) => {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    } else {
        return response.json()
    }
}

let getCategory = async (name) => {
    let url = baseUrl;
    url += "/?";
    let suffix = "";
    if (name != "best"){
        suffix += `genre=${name}&`;
    }
    suffix += "imdb_score_min=7&sort_by=-imdb_score";
    let response1 = await fetchData(url + suffix);
    let results1 = response1.results;
    url += "page=2&";
    let response2 = await fetchData(url + suffix);
    let results = results1.concat(response2.results);
    return results
}

let loadCategory = async (name) => {
    let offset = 0;
    let results = await getCategory(name);
    if (name == "best") {
        offset += 1;
        loadJumbotronData(results[0])
    }
    let images = document.querySelectorAll(`.${name} img`);
    for (let i = 0; i < 7 + offset; i++) {
        images[i].src = results[i].image_url;
        images[i].name = results[i].url;
    }
}

let loadJumbotronData = async (result) => {
    data = await fetchData(result.url);
    document.querySelector(".best.title").innerHTML = result.title;
    document.querySelector(".best.description").innerHTML = data.description;
}

let loadBests = async () => {
    let baseUrl = "http://localhost:8000/api/v1/titles";
    let url = baseUrl + "?imdb_score_min=8&sort_by=-imdb_score";
    response = await fetchBests(url);
    bestMovie = response.results[0]
    document.getElementsByClassName("best title")[0].innerHTML = bestMovie.title;
    data = await fetchBests(bestMovie.url);
    document.getElementsByClassName("best description")[0].innerHTML = data.description;
    for (let i=0; i<8; i++) {
        image = document.getElementsByTagName("img")[i];
        image.src = response.results[i].image_url;
        image.name = response.results[i].url;
    }
}
// querySelector

loadCategory("best")
loadCategory("animation")
loadCategory("fantasy")
loadCategory("sci-fi")
/* let myBlob = await response.blob();
let objectURL = URL.createObjectURL(myBlob);
let image = document.createElement('img');
document.body.appendChild(image);
    } catch(e) {
*/