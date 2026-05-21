const gameBoard = document.getElementById("gameBoard");

const images = [
  "assets/1.jpg",
  "assets/3.jpg",
  "assets/5.jpg",
  "assets/7.jpg",
  "assets/8.jpg",
  "assets/2.png",
  "assets/4.png",
  "assets/9.png",
  "assets/6.webp",

];

function createBoard(cards){
  gameBoard.innerHTML = "";

  cards.forEach(img => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.dataset.image = img;

    card.innerHTML = `
      <img src="${img}" width="100%">
    `;

    gameBoard.appendChild(card);
  });
}

function startGame(){
  const difficulty = 12;

  let selected = images.slice(0, difficulty/2);

  let cards = [...selected, ...selected];

  cards.sort(() => Math.random() - 0.5);

  createBoard(cards);
}

let firstCard = null;
let secondCard = null;

function createBoard(cards){
  gameBoard.innerHTML = "";

  cards.forEach(img => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.dataset.image = img;

    card.innerHTML = `
      <div class="front">?</div>
      <div class="back">
        <img src="${img}">
      </div>
    `;

    card.addEventListener("click", flipCard);

    gameBoard.appendChild(card);
  });
}

function flipCard(){
  this.classList.add("flip");

  if(!firstCard){
    firstCard = this;
    return;
  }

  secondCard = this;
}

let lock = false;

function checkMatch(){

  if(firstCard.dataset.image === secondCard.dataset.image){
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  } else {
    lock = true;

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      lock = false;
    }, 800);
  }

  firstCard = null;
  secondCard = null;
}

function flipCard(){

  if(lock) return;
  if(this === firstCard) return;

  this.classList.add("flip");

  if(!firstCard){
    firstCard = this;
    return;
  }

  secondCard = this;

  checkMatch();
}
