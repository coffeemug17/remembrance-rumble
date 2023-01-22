/*----- constants -----*/
const IMAGE_TILES = [
    { img: "/home/mitul/Desktop/bootcampDir/remembrance-rumble/css/card-library/images/hearts/hearts-A.svg", matched : false},
    { img: "/home/mitul/Desktop/bootcampDir/remembrance-rumble/css/card-library/images/spades/spades-r05.svg", matched : false},
    { img: "/home/mitul/Desktop/bootcampDir/remembrance-rumble/css/card-library/images/diamonds/diamonds-r08.svg", matched : false},
    { img: "/home/mitul/Desktop/bootcampDir/remembrance-rumble/css/card-library/images/clubs/clubs-J.svg", matched : false},
    { img: "/home/mitul/Desktop/bootcampDir/remembrance-rumble/css/card-library/images/jokers/joker.svg", matched : false},
    { img: "/home/mitul/Desktop/bootcampDir/remembrance-rumble/css/card-library/images/diamonds/diamonds-K.svg", matched : false}
];

const IMAGE_BACK = "/home/mitul/Desktop/bootcampDir/remembrance-rumble/css/card-library/images/backs/blue.svg"

/*----- app's state (variables) -----*/

//It is also known that the board will have 
//IMAGE_TILES * 2 elements that are mappable
//to the id of the divs

let board;//this will consists of all the card variables in an array
let incorrectTries = 10;

/*----- cached element references -----*/
// const imgEl = document.querySelector('section > div'); 
const resetButton = document.getElementById("button");
const headingEl = document.querySelector('h2');

/*----- event listeners -----*/
// resetButton.addEventListener('click', resetGame);
document.querySelector('section').addEventListener('click', flipCard);

/*----- functions -----*/
init();

function init() {

    //The board variable is initialized to getShuffledCards 
    //which returns a randomized array of cards
    board = getShuffledCards();

    // console.log(board);
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
        console.log(evt.target);
    }
}

// function resetGame(evt) {
//     evt.target.visibility = 'hidden';
// }

function render() {
    renderMessage();
}

function renderMessage() {
    headingEl.innerHTML = `Number of Attempts Remaining: ${incorrectTries}`;
}