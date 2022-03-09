// Modal
let modal = document.querySelector(".modal");
let images = document.querySelectorAll("img");
let span = document.querySelector(".close");


// When the user clicks on a movie picture, open the modal
for (let i=0; i<images.length; i++){
    images[i].onclick = (event) => {
        modal.style.display = "block";
        load_data(event);
      }
}

// Fills modal list
let load_data = async (event) => {
    data = await fetchData(event.target.name)
    modal.querySelector("h3").innerText = data.title;
    modal.querySelector("img").src = data.image_url;
    let rows = modal.querySelectorAll("li");
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

loadCategory("best")
loadCategory("animation")
loadCategory("fantasy")
loadCategory("sci-fi")

// navigate galeries
let leftButtons = document.querySelectorAll(".left button");
let rightButtons = document.querySelectorAll(".right button");
let counters = {
    "best": 0,
    "animation": 0,
    "fantasy": 0,
    "sci-fi": 0
}

let foldImage = category => {
    let counter = counters[category];
    if (counter < 3) {
        document.querySelectorAll(`.galery.${category} img`)[counter].style.width = 0;
        document.querySelectorAll(`.galery.${category} img`)[counter].style.minWidth = 0;
        document.querySelectorAll(`.galery.${category} img`)[counter].style.padding = 0;
        counters[category] += 1;
    }
}

let unfoldImage = category => {
    let counter = counters[category];
    if (counter > 0) {
        document.querySelectorAll(`.galery.${category} img`)[counter - 1].style.width = "auto";
        document.querySelectorAll(`.galery.${category} img`)[counter - 1].style.minWidth = "25%";
        document.querySelectorAll(`.galery.${category} img`)[counter - 1].style.padding = "1vw 2vw";
        counters[category] -= 1
    }
}

for (let i=0; i<leftButtons.length; i++) {
    leftButtons[i].onclick = (event) => {
        let category = event.target.name;
        unfoldImage(category);
      }
    rightButtons[i].onclick = (event) => {
        let category = event.target.name;
        foldImage(category);
      }
}





/* let myBlob = await response.blob();
let objectURL = URL.createObjectURL(myBlob);
let image = document.createElement('img');
document.body.appendChild(image);
    } catch(e) {
*/