const cards = document.querySelectorAll(".card");

let matchedCards = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e) {
    let clickedCard = e.currentTarget;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            cardOne = clickedCard;
            return;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src;
        let cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCards++;
        if (matchedCards === 8) { 
            setTimeout(shuffleCards, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        resetSelection();
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);
        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            resetSelection();
        }, 1200);
    }
}

function resetSelection() {
    cardOne = cardTwo = null;
    disableDeck = false;
}

function shuffleCards() {
    matchedCards = 0;
    cardOne = cardTwo = null;
    disableDeck = false;

    let images = [];
    for (let i = 1; i <= 8; i++) {
        images.push(`Images/img-${i}.png`);
        images.push(`Images/img-${i}.png`);
    }

    images.sort(() => Math.random() - 0.5);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgElement = card.querySelector("img");
        imgElement.src = images[index];
        card.addEventListener("click", flipCard);
    });
}

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
shuffleCards();
