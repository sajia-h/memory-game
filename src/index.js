// Create an array of all cards in memory game
const cardArray = [
  {
    name: "fries",
    img: "src/images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "src/images/cheeseburger.png",
  },
  {
    name: "ice-cream",
    img: "src/images/ice-cream.png",
  },
  {
    name: "pizza",
    img: "src/images/pizza.png",
  },
  {
    name: "milkshake",
    img: "src/images/milkshake.png",
  },
  {
    food: "hotdog",
    img: "src/images/hotdog.png",
  },
  {
    name: "fries",
    img: "src/images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "src/images/cheeseburger.png",
  },
  {
    name: "ice-cream",
    img: "src/images/ice-cream.png",
  },
  {
    name: "pizza",
    img: "src/images/pizza.png",
  },
  {
    name: "milkshake",
    img: "src/images/milkshake.png",
  },
  {
    food: "hotdog",
    img: "src/images/hotdog.png",
  },
];

/* The sort() method sorts the elements of an array in place and returns the sorted array. 
    The empty sort order is ascending */
// Math.random() returns a number from 0 up to but not including 1
// 0.5 - Math.random() will give you random numbers that are roughly 50% negative and 50% positive.
cardArray.sort(() => 0.5 - Math.random());
console.log(cardArray);

const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

function createBoard() {
  // As long as i is smaller than the cards array length, increment i by 1
  for (let i = 0; i < cardArray.length; i++) {
    //  12 items in card array, so each time (12x), create card
    const card = document.createElement("img");
    // Give card attribute of the source and image path
    card.setAttribute("src", "src/images/empty.png");
    card.style.border = 'solid rgb(15,7,137)';
    card.style.borderRadius = '5px';
    card.style.margin = '5px 0px 0px 25px';
    card.setAttribute("data-id", i);
    // Look out for click on that specific card, and evoke function flipCard
    card.addEventListener("click", flipCard);
    // Put card into grid
    grid.appendChild(card);
  }
}

function flipCard() {
  // Clicking a card, getting that card-id and storing this in cardId array
  // e.g. click a card with id of 3 (randomly be milkshake), pass to cardId array to store (just the name)
  const cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  // Card flips over by overwriting empty png and going into the array for the img that matches the name
  this.setAttribute("src", cardArray[cardId].img);
  // this.style.transform = 'perspective(400px) rotateY(10deg)';
  //
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];

  if (optionOneId == optionTwoId) {
    alert("You have clicked the same image!");
    cards[optionOneId].setAttribute("src", "src/images/empty.png");
    cards[optionTwoId].setAttribute("src", "src/images/empty.png");
  } else if (cardsChosen[0] === cardsChosen[1]) {
    alert("You have found a match!");
    cards[optionOneId].setAttribute("src", "src/images/white.png");
    cards[optionTwoId].setAttribute("src", "src/images/white.png");
    cards[optionTwoId].removeEventListener("click", flipCard);
    cards[optionOneId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "src/images/empty.png");
    cards[optionTwoId].setAttribute("src", "src/images/empty.png");
    alert("You have not found a match!");
  }

  cardsChosen = [];
  cardsChosenId = [];
  resultDisplay.textContent = cardsWon.length;
  
  if (cardsWon.length === cardArray.length / 2)
  {
    resultDisplay.textContent = 'Congratulations! You found all matches!'
  }
}

createBoard();
