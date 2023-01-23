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
let cardCounter = 1;

/*----- cached element references -----*/
const resetButton = document.getElementById("button");
const headingEl = document.querySelector('h2');
const divEls = document.querySelectorAll("section > div");

/*----- event listeners -----*/
resetButton.addEventListener('click', init);
document.querySelector('section').addEventListener('click', flipCard);

/*----- functions -----*/
init();

function init() {

    //The board variable is initialized to getShuffledCards 
    //which returns a randomized array of cards
    board = getShuffledCards();
    console.log(board);
    incorrectTries = 10;
    gameStatus = true;
    firstCard = null;
    cardCounter = 1;
    
    render();// This works
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
    if (evt.target.tagName === "DIV" ){
        evt.target.classList.add(board[evt.target.id].img);
        evt.target.classList.remove(IMAGE_BACK);
        if (cardCounter === 1) {
            firstCard = board[evt.target.id].img;
            // console.log(firstCard);
            cardCounter++;
        } else if (cardCounter === 2) {
            checkMatched(evt);
            cardCounter = 1;
        }

    }
}

//This function checks if the first 
function checkMatched(evt) {
    if (firstCard === board[evt.target.id].img) {
        board[evt.target.id].matched = true;
        console.log("matched");
    } else {
        console.log("not a match");    }
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
}
//Controls the visibility of the play again button
function renderButtonVisibility() {
    resetButton.style.visibility = gameStatus ? 'visible' :'hidden';
}
function renderCards() {
    divEls.forEach(function(divEl) {
        const cardObj = board[divEl.id];
        // console.log(cardObj);
        if (cardObj.matched) {
            divEl.classList.add(cardObj.img);
            divEl.classList.remove(IMAGE_BACK);
        } else {
            divEl.classList.add(IMAGE_BACK);
            divEl.classList.remove(cardObj.img);
        }
        // divEl.classList.value = IMAGE_BACK;
    })
}