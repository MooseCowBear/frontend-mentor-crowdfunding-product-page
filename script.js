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

const radioButtons = document.querySelectorAll("input[type=radio]");

backProjectBtn.addEventListener("click", () => {
  selectionModal.style.display = "block";
});

//close selection modal when click outside it or on close "x"
const closeSelectionModal = document.getElementById("close-selection-modal");
closeSelectionModal.addEventListener("click", () => {
  selectionModal.style.display = "none";
  deselectItems();
});

window.addEventListener("click", (event) => {
  if (event.target == selectionModal) {
    selectionModal.style.display = "none";
    deselectItems();
  }
});

//open mobile menu when hamburger is pressed
const menuHamburger = document.querySelector(".hamburger");
const menuClose = document.getElementById("mobile-menu-close");
const mobileMenu = document.querySelector(".mobile-menu-modal");

menuHamburger.addEventListener("click", () => {
  menuHamburger.style.display = "none";
  menuClose.style.display = "block";

  mobileMenu.style.display = "block";
});

window.addEventListener("click", (event) => {
  if (event.target == mobileMenu) {
    menuHamburger.style.display = "block";
    menuClose.style.display = "none";

    mobileMenu.style.display = "none";
  }
});

//select reward buttons, open modal and have the right item selected
const bamboo = document.getElementById("bamboo-select");
const black = document.getElementById("black-select");

bamboo.addEventListener("click", () => {
  selectItem("bamboo");
  const bambooRadio = document.querySelector("#bamboo input[type=radio]");
  bambooRadio.checked = true;
  //open the selection modal
  selectionModal.style.display = "block";
});

black.addEventListener("click", () => {
  selectItem("black");
  const blackRadio = document.querySelector("#black input[type=radio]");
  blackRadio.checked = true;

  selectionModal.style.display = "block";
});

//event listeners for radio buttons
for (let i = 0; i < radioButtons.length; i++){
  if (!radioButtons[i].disabled){
    radioButtons[i].addEventListener("click", () => {
      deselectItems();
      console.log("selected", radioButtons[i].value);
      selectItem(radioButtons[i].value);
    });
  }
}
//need to add event listener only if disabled = false

//need to remove selection from any previously selected element. add to clicked one

function selectItem(value) {
  const productDiv = document.getElementById(`${value}`);
  productDiv.classList.add("selected");
  if (value !== "no-reward"){
    const productFooter = document.getElementById(`${value}-footer`);
    productFooter.style.display = "flex";
  }
}
function deselectItems() {
  for (let i = 0; i < radioButtons.length; i++){
    if (!radioButtons[i].disabled)  {
      radioButtons[i].checked = false;
      if (radioButtons[i].id !== "no-reward"){
        const productDiv = document.getElementById(`${radioButtons[i].value}`);
        productDiv.classList.remove("selected");
        const productFooter = document.getElementById(`${radioButtons[i].value}-footer`);
        productFooter.style.display = "none";
      }
    }
  }
}