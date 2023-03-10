/*----- constants -----*/
const IMAGE_TILES = [
    { img: "hA", matched : false},
    { img: "s05", matched : false},
    { img: "d08", matched : false},
    { img: "cJ", matched : false},
    { img: "joker", matched : false},
    { img: "dK", matched : false}
];

const IMAGE_BACK = "back";

const SOUNDS = {
    match: 'http://starmen.net/mother2/soundfx/itemget2.wav',
    nomatch: 'http://starmen.net/mother2/soundfx/freeze1.wav',
  };

/*----- app's state (variables) -----*/
//It is also known that the board will have 
//IMAGE_TILES * 2 elements that are mappable
//to the id of the divs
let board;//this will consists of all the card variables in an array
let incorrectTries;
let gameStatus; // This dictates the state of the game and whethere the cards need to be flipped back
let ignoreClick;// This is meant for checking if the second card matches or not

/*----- globally created variables -----*/
let firstCard;
let firstCardIdx;
let cardCounter;

/*----- cached element references -----*/
const resetButton = document.getElementById("button");
const headingEl = document.querySelector('h2');
const divEls = document.querySelectorAll("section > div");
const gameAudio = new Audio();

/*----- event listeners -----*/
resetButton.addEventListener('click', init);
document.querySelector('section').addEventListener('click', flipCard);

/*----- functions -----*/
init();

function init() {
    //The board variable is initialized to getShuffledCards 
    //which returns a randomized array of cards
    board = getShuffledCards();
    reinitBoard();
    showinitialCards();
    incorrectTries = 10;
    gameStatus = false;
    firstCard = null;
    firstCardIdx = null;
    cardCounter = 1;
    ignoreClick = false;
    headingEl.innerText = "Setting up the Board! Remember as many cards as you can!";
    resetButton.style.visibility = 'hidden';
    setTimeout(function() {
        render();
    },4000)
}

function getGameStatus() {
    return board.every((card) => card.matched); 
    render();
}

function reinitBoard() {
    divEls.forEach(function(divEl) {
        divEl.classList.value = "card back";
    })
}

function showinitialCards() {
    divEls.forEach(function(divEl, divIdx) {
        divEl.classList.value = "card " + board[divIdx].img;
    })
}

function getShuffledCards() {
    //This is where we will store sorted cards
    let tempTiles = [];
    //In this array, our cards get randomised
    let cards = [];
    //Iterating through the image tiles
    //and copying them twice on the board
    IMAGE_TILES.forEach(function(image) {
        tempTiles.push({...image}, {...image});
    });
    //Next, we want the card to be chosen randomly
    //And we make use of the Math library to generate a random index
    while(tempTiles.length) {
        let rndIdx = Math.floor(Math.random() * tempTiles.length);
        // Remove tile - note that splice always returns an array
        // and that is why the [0] is appended to splice
        let rndCard = tempTiles.splice(rndIdx, 1)[0];
        cards.push(rndCard);
    }
    return cards;
}

function flipCard(evt) {
    //Guard
    if (ignoreClick) return;
    if (evt.target.tagName === "DIV" ){
        //Guard
        if (board[evt.target.id].matched) return;
        evt.target.classList.add(board[evt.target.id].img);
        evt.target.classList.remove(IMAGE_BACK);
        if (cardCounter === 1) {
            firstCard = board[evt.target.id];
            firstCardIdx = evt.target.id;
            divEls[firstCardIdx].classList.add(firstCard.img);
            divEls[firstCardIdx].classList.remove(IMAGE_BACK);
            cardCounter++;
        } else if (cardCounter === 2) {
            checkMatched(evt);
            cardCounter = 1;
            setTimeout(function() {
                render();
            },1000);
        }
    }
}

//This function checks if the first card's img property is equal to one selected
function checkMatched(evt) {
    if (firstCard.img === board[evt.target.id].img && firstCardIdx !== evt.target.id) {
        board[evt.target.id].matched = true;
        firstCard.matched = true;
        playSound('match');
    } else if (firstCardIdx === evt.target.id) {
        divEls[firstCardIdx].classList.add(IMAGE_BACK);
        divEls[firstCardIdx].classList.remove(firstCard.img);
    } else {
        incorrectTries--;
        playSound('nomatch');
        ignoreClick = true;
        setTimeout(function() {
            ignoreClick = false;
        },1100);
    }
    gameStatus = getGameStatus();
}

function playSound(gameSound) {
    gameAudio.src = SOUNDS[gameSound];
    gameAudio.play();
}

//Renders the cards on the board
function render() {
    renderMessage();
    renderButtonVisibility();
    renderCards();
}

//Controls the amount of tries being displayed on the screen
function renderMessage() {
    headingEl.innerHTML = `Number of Attempts Remaining: ${incorrectTries}`;
    if (incorrectTries <= 0) {
        headingEl.innerText = 'Game Over, You Have Exhausted Your Attempts! Your Game Is Being Restarted!';
        setTimeout(function() {
            init();
        },3000);
    }
    if (gameStatus) {
        headingEl.innerText = "Congratulations, You have won! Press the Play Again button to play again!"
    }
}

//Controls the visibility of the play again button
function renderButtonVisibility() {
    resetButton.style.visibility = gameStatus ? 'visible' :'hidden';
}

function renderCards() {
    divEls.forEach(function(divEl) {
        const cardObj = board[divEl.id];
        if (cardObj.matched) {
            divEl.classList.add(cardObj.img);
            divEl.classList.remove(IMAGE_BACK);
        } else {
            divEl.classList.add(IMAGE_BACK);
            divEl.classList.remove(cardObj.img);
        }
    })
}