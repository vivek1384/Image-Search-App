const accessKey = "0gDpxRCsU9hdn1YsJTzv-pXVT59ZNuqCfQjKb8PbsIw";
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const imagesContainer = document.querySelector(".image-container");
const loadMore = document.querySelector(".loadMore");

let page = 1;

const fetchImage = async (query, pageNo) => {
  try {
    if (pageNo == 1) {
      imagesContainer.innerHTML = "";
    }

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    // console.log(data)

    if (data.results.length > 0) {
      data.results.forEach((photo) => {
        const imageElement = document.createElement("div");
        imageElement.classList.add("imageDiv");
        imageElement.innerHTML = `<img src="${photo.urls.regular}" />`;

        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");

        const overlayText = document.createElement("h3");
        overlayText.innerText = `${photo.alt_description}`;

        overlayElement.appendChild(overlayText);
        imageElement.appendChild(overlayElement);
        imagesContainer.appendChild(imageElement);
      });

      if (data.total_pages === pageNo) {
        loadMore.style.display = "none";
      } else {
        loadMore.style.display = "block";
      }
    } else {
      imagesContainer.innerHTML = `<h2>No image found.</h2>`;
    }
  } catch (error) {
    imagesContainer.innerHTML = `<h2>Failed to fetch images. Please try again later.</h2>`;

  }
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();

  if (inputText !== "") {
    page = 1;
    fetchImage(inputText, page);
  } else {
    imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
  }
});

loadMore.addEventListener("click", () => {
  fetchImage(searchInput.value.trim(), ++page);
});
