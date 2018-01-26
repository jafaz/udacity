/* Create an Object Card*/

Var Card  = function( symbol ){
    this.symbol = symbol;
    this.open = false;
    this.lock = true;
}
/* Array of symbols availables for creating cards */
var symbols = ["fa-diamond", "fa-paper-plane-o",  "fa-anchor", "fa-bomb"
                "fa-bolt", "fa-cube" , "fa-leaf", "fa-bicycle"];

/* Functions that create an array of new cards */
function createCards(SymboslArray) {
    let cards, numSymbols;
    numSymbols = SymboslArray.length;
    cards = new Array(numSymbols * 2);
    // Create an array of cards
    for (let i = 0 ; i < numSymbols ; i++) {
        // Create a pair of cards
        cards.push( new Card(Symbol[i]) );
        cards.push( new Card(Symbol[i]) );
    }
    return cards
}

/*
 * Create a list that holds all of your cards
 */

 var cards = suffle(createCards(symbols));

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



function createBoard(board, cards) {

    function createIcon(symbol) {
        let icon = document.createElement("i");
        icon.classList.add("fa " + symbol);
    }

    function createHTMLCard(card){
        let htmlCard =  document.createElement("li");
        htmlCard.className = "card";
        htmlCard.appendChild( createIcon(card.symbol) );
        return htmlCard;
    }

    for (const card in cards){
        board.appendChild(createHTMLCard(card));
    }

    return board;
};

var deck = $("#deck");
var openCards = [];

deck.on('click','li', function(event) {

});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
