/* Set the variables for the game
    matches: Count the matches
    stars: Count the stars
    time: Count the seconds of the game
    moves: Count the moves
    playedCards: Arrays of the played cards
    OpenCards: Array of the open cards that were been played (should be two each time)
    first and second: Are the two card that are been played
    htmlCards: Array of html of the cards
    htmlDeck: A reference of the entire deck of cards
*/
var matches, stars, time, timer, moves, playedCads, openCards, first, second, htmlCards, htmlDeck;

first = 0;
second = 1;
playedCads = new Array(8);
openCards = [false, false];
stars = 3;
matches = 0
time = 0;
moves = 0;
htmlDeck = $('.deck');
htmlCards = $('.deck > li');

/* Logic of the game
   Each time that a card is clicked this function is call
*/
htmlDeck.on('click', 'li', function (event) {

    // Start the timer.
    if (time === 0) {
        time++;
        timer = setInterval(printTimer, 1000)
    }


    // Get the card that was clicked
    card = $(this).data('card');

    // If there is left that les matches and the clicked card is not played open the card
    if (matches < 8 && playedCads[card] !== card) {
        //If the fist card is not open yet then open the fist card
        if (!openCards[first]) {
            open(this);
            openCards[first] = this;
        }
        /* If the clicked card is not the fist card and
           the second cards is not open yet, then open the second card,
           increment moves and check if there is a match
        */
        else if (!openCards[second] && this !== openCards[first]) {
            open(this);
            openCards[second] = this;
            moves++;
            updateMoves();
            isMatch($(openCards[first]).data('card'), card);
            setTimeout(closeCards, 400);
        }
    }

});


$(".restart").on('click', function (event) {
    resetGame();
});

// Function that check if two cards match
function isMatch(card1, card2) {
    if (card1 === card2) {
        matches++;
        setMatch();
        playedCads[card] = card;
    }
    if (matches === 8) {
        showScore();
    }
}

// Function that decrees the stars on the interface
function lowStar(index) {
    $($(".stars >li >i")[index]).removeClass("fa-star");
    $($(".stars >li >i")[index]).addClass("fa-star-o");
    let star = $(".stars > li > i")[index];
}


function resetStars() {
    $(".stars >li >i").removeClass("fa-star-o");
    $(".stars >li >i").addClass("fa-star");
}

// Function that update the moves
function updateMoves() {
    $(".moves").text(moves);
    if (moves == 9 || moves == 14) {
        stars--;
        lowStar(stars);
    }
}

// Function that open a card on the interface
function open(card) {
    $(card).addClass("open show");
}

// Function that set a Match
function setMatch() {
    openCards.forEach(function (element) {
        $(element).addClass("match")
    });
}

// Function that close a card
function closeCards() {
    openCards.forEach(function (element) {
        $(element).removeClass("open show");

    });
    openCards = [false, false]
}


//Function that prepare the game for a new one.
function resetGame() {
    $(htmlCards).removeClass("match");
    $(htmlCards).removeClass("open show");
    openCards = [false, false]
    moves = 0;
    updateMoves();
    matches = 0;
    playedCads = new Array(8);
    htmlCards = shuffle(htmlCards);
    htmlDeck.empty().append(htmlCards);
    stopTimer();
    time = 0;
    $(".modal").modal('hide');
    stars = 3;
    resetStars();
}

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


// Function that show the core in case that the player win
function showScore() {
    $(".modal").modal('show');
    $(".star").text(stars);
    clearInterval(timer);
    printTimer();
}

// Function that stop and reset the timer
function stopTimer() {
    clearInterval(timer);
    time = 0;
    printTimer();
}

// Function that show the timer on the interface
function printTimer() {
    $(".time").text(time);
    time++;
}


// Action that restart the reset the game for been player the fist time.
resetGame();