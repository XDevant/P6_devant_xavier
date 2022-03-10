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
        modal.querySelector("img").src = event.target.src;
    }

    for (let i=0; i<images.length; i++){
        images[i].addEventListener("click", modalClick);
        images[i].addEventListener("keydown", modalKey);
    }
    button.addEventListener("click", () => modal.style.display = "none");
    modal.addEventListener("click", () => modal.style.display = "none");
});



// Fetch n-bests movies

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
