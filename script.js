const deck = [
    "2_of_clubs.png",
    "2_of_diamonds.png",
    "2_of_hearts.png",
    "2_of_spades.png",
    "3_of_clubs.png",
    "3_of_diamonds.png",
    "3_of_hearts.png",
    "3_of_spades.png",
    "4_of_clubs.png",
    "4_of_diamonds.png",
    "4_of_hearts.png",
    "4_of_spades.png",
    "5_of_clubs.png",
    "5_of_diamonds.png",
    "5_of_hearts.png",
    "5_of_spades.png",
    "6_of_clubs.png",
    "6_of_diamonds.png",
    "6_of_hearts.png",
    "6_of_spades.png",
    "7_of_clubs.png",
    "7_of_diamonds.png",
    "7_of_hearts.png",      
    "7_of_spades.png",
    "8_of_clubs.png",
    "8_of_diamonds.png",
    "8_of_hearts.png",
    "8_of_spades.png",
    "9_of_clubs.png",
    "9_of_diamonds.png",
    "9_of_hearts.png",
    "9_of_spades.png",
    "10_of_clubs.png",
    "10_of_diamonds.png",
    "10_of_hearts.png",
    "10_of_spades.png",
    "jack_of_clubs.png",
    "jack_of_diamonds.png",
    "jack_of_hearts.png",
    "jack_of_spades.png",
    "queen_of_clubs.png",
    "queen_of_diamonds.png",
    "queen_of_hearts.png",
    "queen_of_spades.png",
    "king_of_clubs.png",
    "king_of_diamonds.png",
    "king_of_hearts.png",
    "king_of_spades.png",
    "ace_of_clubs.png",
    "ace_of_diamonds.png",
    "ace_of_hearts.png",
    "ace_of_spades.png"
];

let playingDeck = deck.slice();
let dealerHand = [];
let playerHand = [];
let dealerDiv = document.getElementById("dealer");
let playerDiv = document.getElementById("player");
let betInput = document.getElementById("bet");
let dealbutton = document.getElementById("deal");
let hitbutton = document.getElementById("hit");
let standbutton = document.getElementById("stand");

standbutton.style.visibility = "hidden";
hitbutton.style.visibility = "hidden";

function pull() {
    let r = Math.floor(Math.random() * playingDeck.length);
    let pulledCard = playingDeck[r];
    playingDeck.splice(r, 1);
    return pulledCard;
}

function deal() {
    playerHand = [];
    dealerHand = [];

    playerHand.push(pull());
    dealerHand.push(pull());
    playerHand.push(pull());
    dealerHand.push(pull());

    dealerDiv.innerHTML = "";
    playerDiv.innerHTML = "";

    dealerDiv.innerHTML += '<img src="kartyak/' + dealerHand[0] + '">';
    dealerDiv.innerHTML += '<img src="kartyak/' + dealerHand[1] + '">';
    playerDiv.innerHTML += '<img src="kartyak/' + playerHand[0] + '">';
    playerDiv.innerHTML += '<img src="kartyak/' + playerHand[1] + '">';

    dealbutton.style.visibility = "hidden";
    betInput.style.visibility = "hidden";
    hitbutton.style.visibility = "visible";
    standbutton.style.visibility = "visible";
}