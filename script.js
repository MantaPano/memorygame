const cardsArray = [
  { img: "img1.png" },
  { img: "img1.png" },
  { img: "img2.png" },
  { img: "img2.png" },
  { img: "img3.png" },
  { img: "img3.png" },
  { img: "img4.png" },
  { img: "img4.png" },
  { img: "img5.png" },
  { img: "img5.png" },
  { img: "img6.png" },
  { img: "img6.png" },
  { img: "img7.png" },
  { img: "img7.png" },
  { img: "img8.png" },
  { img: "img8.png" },
];

const gameBoard = document.getElementById("gameBoard");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const shuffledCards = shuffle(cardsArray);

  shuffledCards.forEach((cardData) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.img = cardData.img;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains("flipped"))
    return;

  this.classList.add("flipped");

  const imgElement = document.createElement("img");
  imgElement.src = this.dataset.img;
  this.innerHTML = "";
  this.appendChild(imgElement);

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.img === secondCard.dataset.img) {
    disableCards();
    matches++;
    if (matches === cardsArray.length / 2) {
      setTimeout(() => alert(`Parabéns, você venceu!`), 500);
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.innerHTML = "";
    secondCard.innerHTML = "";
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

createBoard();
