//change color, text of bookmark button
const bookmarkButton = document.querySelector(".bookmark");

bookmarkButton.addEventListener("click", () => {
  console.log("bookmark button clicked");
  const bookmarkImage = document.querySelector(".bookmark-circle");
  const bookmarkImageCutout = document.querySelector(".bookmark-cutout");

  bookmarkImage.classList.toggle("bookmarked");
  bookmarkImageCutout.classList.toggle("bookmarked");

  toggleBookmarkText();
})

function toggleBookmarkText() {
  const bookmarkText = document.querySelector(".bookmark > span")
  if (bookmarkText.innerText === "Bookmark"){
    bookmarkText.innerText = "Bookmarked";
  }
  else if (bookmarkText.innerText === "Bookmarked"){
    bookmarkText.innerText = "Bookmark";
  }
  bookmarkText.classList.toggle("bookmarked");
}

//open selection span when "back this project" button pressed
const selectionModal = document.querySelector(".selection-modal");

const backProjectBtn = document.getElementById("back-project");

backProjectBtn.addEventListener("click", () => {
  selectionModal.style.display = "block";
});

//close selection modal when click outside it or on close "x"
const closeSelectionModal = document.getElementById("close-selection-modal");
closeSelectionModal.addEventListener("click", () => {
  selectionModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == selectionModal) {
    selectionModal.style.display = "none";
  }
});