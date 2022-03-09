// Modal
// When the user clicks on a movie picture, open the modal
// Wait until the DOM is loaded
window.addEventListener("DOMContentLoaded", function(){
    let images = document.querySelectorAll("img");
    let modal = document.querySelector(".modal");
    let button = document.querySelector(".close");

    let modalKey = (event) => {
     // Check for Tab key
        if (event.keyCode !== 9 & modal.style.display !== "block") {
            modal.style.display = "block";
            load_data(event);
        } else {
            modal.style.display = "none";
        }
    }
  
    let modalClick = (event) => {
        if (modal.style.display !== "block") {
            modal.style.display = "block";
            load_data(event);
        } else {
            modal.style.display = "none";
        }
    }

    let load_data = async (event) => {
        data = await fetchData(event.target.name)
        modal.querySelector("h3").innerText = data.title;
        modal.querySelector("img").src = data.image_url;
        let rows = modal.querySelectorAll("li");
        rows[0].innerText = `Genre : ${data.genres.join(', ')}`;
        rows[1].innerText = `Date de sortie : ${data.date_published}`;
        rows[2].innerText = `Evaluation : ${data.rated}`;
        rows[3].innerText = `Score IMDB : ${data.imdb_score}`;
        rows[4].innerText = `Réalisateur : ${data.directors.join(', ')}`;
        rows[5].innerText = `Acteurs : ${data.actors.join(', ')}`;
        rows[6].innerText = `Durée : ${data.duration}mn`;
        rows[7].innerText = `Pays d'origine : ${data.countries.join(', ')}`;
        rows[8].innerText = `Résultats Box-office : ${data.worldwide_gross_income ? data.worldwide_gross_income + '$' : "Inconnu"}`;
        rows[9].innerText = `Résumé : ${data.long_description}`;
    }

    for (let i=0; i<images.length; i++){
        images[i].addEventListener("click", modalClick);
        images[i].addEventListener("keydown", modalKey);
    }
    button.addEventListener("click", () => modal.style.display = "none");
    modal.addEventListener("click", () => modal.style.display = "none");
});



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

let foldImage = event => {
    let category = event.target.className;
    let width = document.querySelector(`.galery.${category} img`).clientWidth;
    let scrolled = document.querySelector(`.galery.${category}`).scrollLeft;
    let trailing = scrolled % width;
    document.querySelector(`.galery.${category}`).scrollBy({
        top: 0,
        left: width - trailing,
        behavior: 'smooth'
      });
}

let unfoldImage = event => {
    let category = event.target.className;
    let width = document.querySelector(`.galery.${category} img`).clientWidth;
    let scrolled = document.querySelector(`.galery.${category}`).scrollLeft;
    let trailing = scrolled % width;
    if (trailing != 0) {
        width = trailing;
    }
    document.querySelector(`.galery.${category}`).scrollBy({
        top: 0,
        left: -width,
        behavior: 'smooth'
      });
}

let switchButtons = (catégory) => {

}

for (let i=0; i<leftButtons.length; i++) {
    let category = leftButtons[i].className;
    leftButtons[i].addEventListener("click", unfoldImage);
    leftButtons[i].addEventListener("keyup", unfoldImage);
    rightButtons[i].addEventListener("click", foldImage);
    rightButtons[i].addEventListener("keyup", foldImage);
}
