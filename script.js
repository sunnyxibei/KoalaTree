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
