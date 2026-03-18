const cards = [
    { name: 'monkey', img: 'monkey.png' },
    { name: 'monkey', img: 'monkey.png' },
    { name: 'cat1', img: 'cat1.png' },
    { name: 'cat1', img: 'cat1.png' },
    { name: 'dog', img: 'dog.png' },
    { name: 'dog', img: 'dog.png' },
    { name: 'cat2', img: 'cat2.png' },
    { name: 'cat2', img: 'cat2.png' }
];

cards.sort(() => 0.5 - Math.random());

const grid = document.querySelector('#grid');
const scoreDisplay = document.querySelector('#score');
let cardsChosen = [];
let cardsChosenId = [];
let score = 0;

function createBoard() {
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/back.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
}

function flipCard() {
    let cardId = this.getAttribute('data-id');
    
    cardsChosen.push(cards[cardId].name);
    cardsChosenId.push(cardId);
    
    this.setAttribute('src', cards[cardId].img);

    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const allImages = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId === optionTwoId) {
        alert('Bạn vừa click vào cùng 1 thẻ');
        allImages[optionOneId].setAttribute('src', 'images/back.png');
    } else if (cardsChosen[0] === cardsChosen[1]) {
        alert('Chính xác +1 điểm');
        allImages[optionOneId].style.visibility = 'hidden';
        allImages[optionTwoId].style.visibility = 'hidden';
        allImages[optionOneId].removeEventListener('click', flipCard);
        allImages[optionTwoId].removeEventListener('click', flipCard);
        score++;
    } else {
        alert('Sai rồi');
        allImages[optionOneId].setAttribute('src', 'images/back.png');
        allImages[optionTwoId].setAttribute('src', 'images/back.png');
    }

    cardsChosen = [];
    cardsChosenId = [];
    scoreDisplay.textContent = score;
}

createBoard();