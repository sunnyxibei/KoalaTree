document.addEventListener('DOMContentLoaded', () => {
    // A simple confetti effect
    const confettiCount = 200;
    const container = document.querySelector('.container');

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = Math.random() * -100 + 'vh';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(confetti);
    }
});

// Add confetti styles to the CSS
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes fall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

const confettiRule = `
.confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    opacity: 0;
    animation: fall 5s linear infinite;
}`;
styleSheet.insertRule(confettiRule, styleSheet.cssRules.length);

// Star effect
document.addEventListener('mousemove', (e) => {
    let star = document.createElement('div');
    star.classList.add('star');
    star.style.left = e.pageX + 'px';
    star.style.top = e.pageY + 'px';
    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 1000);
});

// Create cards
const cardsContainer = document.querySelector('.cards-container');
const wishes = [
    "愿你成为自己的太阳，无需凭借谁的光。",
    "愿你眼里有光，心中有爱，一路春暖花开。",
    "愿你乘风破浪，归来仍是少年。",
    "愿你此生尽兴，赤诚善良。",
    "愿你想要的都得到，得到的都美好。",
    "愿你活得尽兴，而不是过得庆幸。",
    "愿你眼里的星星，永远闪亮。",
    "愿你心里的太阳，永远温暖。"
];

for (let i = 0; i < 8; i++) {
    const card = document.createElement('div');
    card.classList.add('card');

    const content = document.createElement('div');
    content.classList.add('card-content');
    content.innerHTML = `<p>${wishes[i]}</p>`;

    const tassel = document.createElement('div');
    tassel.classList.add('tassel');
    tassel.innerHTML = `
        <div class="tassel-line"></div>
        <div class="tassel-star"></div>
    `;

    card.appendChild(content);
    card.appendChild(tassel);
    cardsContainer.appendChild(card);
}
