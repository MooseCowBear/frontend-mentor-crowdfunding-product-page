const GOAL = 100_000;

//change color, text of bookmark button
const bookmarkButton = document.querySelector(".bookmark");

bookmarkButton.addEventListener("click", () => {
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

menuClose.addEventListener("click", () => {
  menuHamburger.style.display = "block";
  menuClose.style.display = "none";

  mobileMenu.style.display = "none";
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
      deselectItems(false);
      selectItem(radioButtons[i].value);
    });
  }
}

const submitBamboo = document.getElementById("continue-bamboo");
const submitBlack = document.getElementById("continue-black");
const submitNoReward = document.getElementById("continue-no-reward");

const successModal = document.querySelector(".success-modal");

submitBamboo.addEventListener("click", () => {
  const pledge = document.getElementById("bamboo-pledge");
  const pledgeAmt = parseFloat(pledge.value);
  if (!isNaN(pledgeAmt) && pledgeAmt >= 25){
    //wipe and close selection modal
    pledge.value = "25";
    deselectItems();
    selectionModal.style.display = "none";
    //then open success
    successModal.style.display = "block";
    updateProgress(pledgeAmt);

    //decrement count of bamboo
    const numbers = document.querySelectorAll(".number.bamboo");
    for (let i = 0; i < numbers.length; i++){
      let val = numbers[i].innerText;
      val = parseFloat(val);
      val -= 1;
      numbers[i].innerText = `${val}`;
    }
  }
});

submitBlack.addEventListener("click", () => {
  const pledge = document.getElementById("black-pledge");
  const pledgeAmt = parseFloat(pledge.value);
  if (!isNaN(pledgeAmt) && pledgeAmt >= 75){
    pledge.value = "75";
    deselectItems();
    selectionModal.style.display = "none";
    successModal.style.display = "block";
    updateProgress(pledgeAmt);

    //decrement count of black
    const numbers = document.querySelectorAll(".number.black")
    for (let i = 0; i < numbers.length; i++){
      let val = numbers[i].innerText;
      val = parseFloat(val);
      val -= 1;
      numbers[i].innerText = `${val}`;
    }
  }
});

submitNoReward.addEventListener("click", () => {
  const pledge = document.getElementById("no-reward-pledge");
  const pledgeAmt = parseFloat(pledge.value);
  if (!isNaN(pledgeAmt) && pledgeAmt > 0){
    pledge.value = "0";
    deselectItems();
    selectionModal.style.display = "none";
    successModal.style.display = "block";
    updateProgress(pledgeAmt);
  }
});

const closeSuccessModal = document.getElementById("close-success-modal");
closeSuccessModal.addEventListener("click", () => {
  successModal.style.display = "none";
});

function selectItem(value) {
  const productDiv = document.getElementById(`${value}`);
  productDiv.classList.add("selected");
  
  const productFooter = document.getElementById(`${value}-footer`);
  productFooter.style.display = "flex";
  
}
function deselectItems(reset=true) {
  for (let i = 0; i < radioButtons.length; i++){
    if (!radioButtons[i].disabled)  {
      
      const productDiv = document.getElementById(`${radioButtons[i].value}`);
      productDiv.classList.remove("selected");
      const productFooter = document.getElementById(`${radioButtons[i].value}-footer`);
      productFooter.style.display = "none";
      if (reset) {
        radioButtons[i].checked = false;
      }
    }
  }
}

function updateProgress(newPledge) {
  //update amount raised, total backers, width of progress span
  const totalRaised = document.getElementById("amount-raised");
  const backers = document.getElementById("num-backers");
  const progressBar = document.getElementById("progress-bar")

  let raised = totalRaised.innerText;
  raised = raised.replaceAll(",", ""); //remove commas
  raised = raised.replaceAll("$", ""); //remove $

  let numBackers = backers.innerText;
  numBackers = numBackers.replaceAll(",", ""); 

  raised = parseFloat(raised);
  raised += newPledge;

  numBackers = parseFloat(numBackers);
  numBackers += 1

  progressBar.style.width = `${totalRaised/GOAL}%`;

  numBackers = numBackers.toLocaleString("en-US");
  raised = raised.toLocaleString("en-US");
  raised = "$" + raised;

  totalRaised.innerText = raised;
  backers.innerText = numBackers;
}