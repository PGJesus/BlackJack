const deck = [
    "2_of_clubs.png","2_of_diamonds.png","2_of_hearts.png","2_of_spades.png",
    "3_of_clubs.png","3_of_diamonds.png","3_of_hearts.png","3_of_spades.png",
    "4_of_clubs.png","4_of_diamonds.png","4_of_hearts.png","4_of_spades.png",
    "5_of_clubs.png","5_of_diamonds.png","5_of_hearts.png","5_of_spades.png",
    "6_of_clubs.png","6_of_diamonds.png","6_of_hearts.png","6_of_spades.png",
    "7_of_clubs.png","7_of_diamonds.png","7_of_hearts.png","7_of_spades.png",
    "8_of_clubs.png","8_of_diamonds.png","8_of_hearts.png","8_of_spades.png",
    "9_of_clubs.png","9_of_diamonds.png","9_of_hearts.png","9_of_spades.png",
    "10_of_clubs.png","10_of_diamonds.png","10_of_hearts.png","10_of_spades.png",
    "jack_of_clubs.png","jack_of_diamonds.png","jack_of_hearts.png","jack_of_spades.png",
    "queen_of_clubs.png","queen_of_diamonds.png","queen_of_hearts.png","queen_of_spades.png",
    "king_of_clubs.png","king_of_diamonds.png","king_of_hearts.png","king_of_spades.png",
    "ace_of_clubs.png","ace_of_diamonds.png","ace_of_hearts.png","ace_of_spades.png"
];

let playingDeck = [];
let dealerHand = [];
let playerHand = [];

let dealerDiv = document.getElementById("dealer");
let playerDiv = document.getElementById("player");
let betInput = document.getElementById("bet");
let dealbutton = document.getElementById("deal");
let hitbutton = document.getElementById("hit");
let standbutton = document.getElementById("stand");
let chipsh1 = document.getElementById("chips");

let chips = 500;
chipsh1.innerText = "Chips: " + chips;

standbutton.style.visibility = "hidden";
hitbutton.style.visibility = "hidden";

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function pull() {
    return playingDeck.pop();
}

function deal() {
    let bet = parseInt(betInput.value);

    if (!bet || bet <= 0) {
        alert("Enter a valid bet!");
        return;
    }

    if (bet > chips) {
        alert("Not enough chips!");
        return;
    }

    playingDeck = deck.slice();
    shuffle(playingDeck);

    playerHand = [];
    dealerHand = [];

    playerHand.push(pull(), pull());
    dealerHand.push(pull(), pull());

    dealerDiv.innerHTML = "";
    playerDiv.innerHTML = "";

    dealerDiv.innerHTML += '<img src="kartyak/' + dealerHand[1] + '">';
    dealerDiv.innerHTML += '<img src="card back black.png">';

    playerHand.forEach(card => {
        playerDiv.innerHTML += '<img src="kartyak/' + card + '">';
    });

    dealbutton.style.visibility = "hidden";
    betInput.style.visibility = "hidden";
    hitbutton.style.visibility = "visible";
    standbutton.style.visibility = "visible";

    pointrefresh(true);

    if (pointValue(playerHand) === 21) {
        setTimeout(() => checkWinner(), 500);
    }
}

function pointValue(array) {
    let point = 0;
    let aces = 0;

    for (const a of array) {
        let value = a.split("_")[0];

        if (["jack", "queen", "king"].includes(value)) {
            point += 10;
        } else if (value === "ace") {
            aces++;
            point += 11;
        } else {
            point += parseInt(value);
        }
    }

    while (point > 21 && aces > 0) {
        point -= 10;
        aces--;
    }

    return point;
}

function pointrefresh(hidden = true) {
    let dealerPoints = hidden
        ? pointValue([dealerHand[1]])
        : pointValue(dealerHand);

    document.getElementById("dealer-point").innerText = "Dealer: " + dealerPoints;
    document.getElementById("player-point").innerText = "Player: " + pointValue(playerHand);
}

function hit() {
    playerHand.push(pull());
    playerDiv.innerHTML += '<img src="kartyak/' + playerHand[playerHand.length - 1] + '">';

    pointrefresh(true);

    if (pointValue(playerHand) > 21) {
        checkWinner();
    }
}

function stand() {
    dealerDiv.innerHTML = "";

    dealerHand.forEach(card => {
        dealerDiv.innerHTML += '<img src="kartyak/' + card + '">';
    });

    while (pointValue(dealerHand) < 17) {
        dealerHand.push(pull());
        dealerDiv.innerHTML += '<img src="kartyak/' + dealerHand[dealerHand.length - 1] + '">';
    }

    pointrefresh(false);
    checkWinner();
}

function checkWinner() {
    let playerPoints = pointValue(playerHand);
    let dealerPoints = pointValue(dealerHand);
    let bet = parseInt(betInput.value) || 0;

    if (playerPoints > 21) {
        alert("Bust! You lose.");
        chips -= bet;
    } else if (dealerPoints > 21) {
        alert("Dealer busts! You win.");
        chips += bet;
    } else if (playerPoints > dealerPoints) {
        alert("You win!");
        chips += bet;
    } else if (playerPoints < dealerPoints) {
        alert("Dealer wins!");
        chips -= bet;
    } else {
        alert("Push (tie).");
    }

    chipsh1.innerText = "Chips: " + chips;

    setTimeout(resetRound, 2000);
}

function resetRound() {
    dealerHand = [];
    playerHand = [];
    dealerDiv.innerHTML = "";
    playerDiv.innerHTML = "";
    betInput.value = "";

    dealbutton.style.visibility = "visible";
    betInput.style.visibility = "visible";
    hitbutton.style.visibility = "hidden";
    standbutton.style.visibility = "hidden";

    document.getElementById("dealer-point").innerText = "";
    document.getElementById("player-point").innerText = "";
}

function reset() {
    chips = 500;
    chipsh1.innerText = "Chips: " + chips;
    resetRound();
}