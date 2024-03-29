const accessKey = '-KD4d81hPzmencEB7rwNrK6wl2YyAL_pFcCQwFHyktY';

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.querySelector("#show-more-button");
const clearInput = document.querySelector(".clear-input");

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener('click', (e) => {
    searchImages();
});

clearInput.addEventListener('click', (e) => {
    inputEl.value = "";
    clearInput.style.display = "none";
    searchResults.innerHTML = "";
    showMore.style.display = "none";
});

let inputData = "";
let page = 1;

async function searchImages() {
    let inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json()
    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++
    if (page > 1) {
        showMore.style.display = "block";
    }

    if (inputData.length > 1) {
        clearInput.style.display = "block";
    }


}