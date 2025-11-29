const gameBoard = document.getElementById("gameBoard");
const restartButtons = document.querySelectorAll(".restartBtnGame");
// console.log(restartBtn,"restartBtnGamerestartBtnGamerestartBtnGamerestartBtnGame")
const win = document.getElementById("win");
let cardValues = ["fa-leaf", "fa-heart", "fa-diamond", "fa-clover", "fa-crown", "fa-chess-queen", "fa-chess-pawn", "fa-chess-bishop"];
cardValues = [...cardValues, ...cardValues]; 
let matchedCards = 0;
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function initGame() {
    gameBoard.innerHTML = "";
    matchedCards = 0;
    flippedCards = [];

    const shuffled = shuffle([...cardValues]);

    shuffled.forEach(value => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"><i class="fa-solid ${value}"></i></div>
                <div class="card-back"></div>
            </div>
        `;
        card.dataset.value = value;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}
function flipCard() {
    if (this.classList.contains("flip") || flippedCards.length === 2) return;

    this.classList.add("flip");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedCards += 2;
        flippedCards = [];
        if (matchedCards === cardValues.length) {
            win.style.display='block';
            setTimeout(() => win.style.display='none', 5000);
           setTimeout(() => initGame() , 5000);
        }else{
            win.style.display='none';
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flip");
            card2.classList.remove("flip");
            flippedCards = [];
        }, 800);
    }
}

// restartBtn.addEventListener("click", initGame);
restartButtons.forEach(btn => {
    //  win.style.display='none';
    btn.addEventListener("click", initGame);
   
});
initGame();
