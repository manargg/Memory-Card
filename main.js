var errors = 0;
var matchedPairs = 0;


var cardList = [
    "cat",
    "egyptian-bird",
    "gold-scarab",
    "horus",
    "lotus",
    "mummy-head",
    "nefertiti",
    "painted-pottery",
    "palm-tree",
    "sarcophagus"
]

var cardSet;
var board = [];
var rows =4;
var columns = 5;


document.body.addEventListener("click", function() {
    if (!window.audioPlayed) {
        window.audioPlayed = true; 
        let startAudio = new Audio("./audio/ancient-181070.mp3");
        startAudio.play();
    }
});

window.onload = function(){
    shuffleCards();
    startGame();

}

function shuffleCards(){
    cardSet = cardList.concat(cardList); // double the cards (two cards of each)
    console.log(cardSet);
    //shuffle the cards
    for(let i = 0; i < cardSet.length; i++){
        let j = Math.floor(Math.random() * cardSet.length)
        let temp = cardSet[i];
        cardSet[i] = cardSet[j]
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame(){
    

    //to arrange the board as 4x5
    for(let r =0; r < rows; r++){
        let row = [];
        for(let c =0; c < columns; c++){
            let cardImg = cardSet.pop();
            row.push(cardImg);

            let card  = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "images/" + cardImg + ".svg";
            card.classList.add("card");
            document.getElementById("board").append(card);
            card.addEventListener("click", selectCard);
        }
        board.push(row);
    }
setTimeout(hideCards, 1000)
}
// A function to hide the cards
function hideCards(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c< columns; c++){
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "images/pharoah.svg";
        }
    }
}
var cardOneSelected;
var cardTwoSelected;

// A function to select a card
function selectCard(){
    if(this.src.includes("pharoah")){
        if(!cardOneSelected){
            cardOneSelected = this;

            let cards = cardOneSelected.id.split("-");
            let r = parseInt(cards[0]);
            let c = parseInt(cards[1]);

            cardOneSelected.src = "images/"+ board[r][c] + ".svg";
        }
        else if(!cardTwoSelected && this != cardOneSelected) {
            cardTwoSelected = this;

            let cards = cardTwoSelected.id.split("-");
            let r = parseInt(cards[0]);
            let c = parseInt(cards[1]);

            cardTwoSelected.src ="images/"+ board[r][c] + ".svg";

            setTimeout(update, 1000)
        }
    }
}

function update(){
    if(cardOneSelected.src != cardTwoSelected.src){
        cardOneSelected.src = "images/pharoah.svg";
        cardTwoSelected.src = "images/pharoah.svg";
        errors += 1;
        document.getElementById("errors").innerText = errors

        // Check if player lost
        if (errors >= 4 && errors <= 7) {
            document.getElementById("top-image").src = "./gif/sorry.gif";
        }else if(errors > 7 && errors <= 9){
            document.getElementById("top-image").src = "./gif/ayo.gif";
        }else if(errors > 10 && errors < 15){
            document.getElementById("top-image").src = "./gif/scream-loud-scream.gif";
        }
        else if( errors >= 15){
            document.getElementById("top-image").src = "./gif/burn.gif";
        }
        } else {
        // Correct match
        matchedPairs++;

        // Check if player won
        if (matchedPairs === cardList.length) {
            document.getElementById("top-image").src = "./gif/alsiysi.gif";
        }

    }
    cardOneSelected = null;
    cardTwoSelected = null;

    
}

